<template>
  <div class="ia-assistant-container">

    <div class="chat-container">
      <div class="messages" ref="messagesContainer">
        <div v-for="(mensaje, index) in conversacion" :key="index" class="mensaje" :class="mensaje.tipo">
          <div class="avatar" :class="mensaje.tipo">
            <i v-if="mensaje.tipo === 'usuario'" class="fas fa-user"></i>
            <i v-else class="fas fa-robot"></i>
          </div>
          <div class="contenido">
            <div v-if="mensaje.tipo === 'asistente' && mensaje.cargando" class="typing-indicator">
              <span></span><span></span><span></span>
            </div>
            <div v-else class="mensaje-texto" v-html="formatearMensaje(mensaje.texto)"></div>

            <div v-if="mensaje.documentosConsultados && mensaje.documentosConsultados.length > 0" class="referencias">
              <p class="referencias-titulo">Documentos consultados:</p>
              <ul>
                <li v-for="(docId, i) in mensaje.documentosConsultados" :key="i">
                  <a @click.prevent="irADocumento(docId)" class="referencia-link">
                    Documento {{ i + 1 }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="input-area">
        <textarea v-model="consulta" placeholder="Escribe tu pregunta aquí..." @keydown.enter.prevent="enviarConsulta"
          :disabled="cargandoRespuesta" rows="2"></textarea>
        <button @click="enviarConsulta" :disabled="cargandoRespuesta || !consulta.trim()" class="send-button">
          <i v-if="cargandoRespuesta" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>

    <div class="contexto-container" v-if="mostrarContexto">
      <h3>Documentos relacionados</h3>
      <p class="descripcion-contexto">Seleccione documentos para proporcionar contexto a sus consultas:</p>

      <div class="documentos-seleccionados">
        <div v-for="doc in documentosSeleccionados" :key="doc.id" class="documento-tag">
          {{ doc.titulo }}
          <button @click="removerDocumentoContexto(doc.id)" class="remover-doc">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <button v-if="documentosSeleccionados.length > 0" @click="limpiarContexto" class="limpiar-contexto">
          Limpiar todos
        </button>
      </div>

      <div class="buscar-documentos">
        <input v-model="busquedaDocumento" type="text" placeholder="Buscar documento para añadir al contexto..."
          @input="buscarDocumentos" />
      </div>

      <div v-if="resultadosBusquedaDocumentos.length > 0" class="resultados-busqueda">
        <div v-for="doc in resultadosBusquedaDocumentos" :key="doc.id" class="resultado-documento"
          @click="agregarDocumentoContexto(doc)">
          <div class="doc-icon"><i class="fas fa-file-alt"></i></div>
          <div class="doc-info">
            <h4>{{ doc.titulo }}</h4>
            <p>{{ doc.descripcion }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="opciones-container">
      <button @click="mostrarContexto = !mostrarContexto" class="toggle-contexto">
        <i class="fas fa-paperclip"></i>
        {{ mostrarContexto ? 'Ocultar contexto' : 'Añadir contexto' }}
      </button>
      <button @click="limpiarConversacion" class="limpiar-chat">
        <i class="fas fa-trash"></i>
        Limpiar conversación
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { consultarAsistente } from '@/services/IAService';
import { notify } from '@/services/toastNotificationService';
import { useAssistantStore } from '@/store/assistantStore';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

interface Mensaje {
  tipo: 'usuario' | 'asistente';
  texto: string;
  cargando?: boolean;
  documentosConsultados?: string[];
  tiempoEjecucion?: number;
}

interface Documento {
  id: string;
  titulo: string;
  descripcion: string;
}

export default defineComponent({
  name: 'AsistenteIA',

  setup() {
    const router = useRouter();
    const assistantStore = useAssistantStore();
    const consulta = ref('');
    const conversacion = ref<Mensaje[]>([]);
    const cargandoRespuesta = ref(false);
    const messagesContainer = ref<HTMLElement | null>(null);
    const mostrarContexto = ref(false);
    const documentosSeleccionados = ref<Documento[]>([]);
    const busquedaDocumento = ref('');
    const resultadosBusquedaDocumentos = ref<Documento[]>([]);

    // Función para enviar la consulta al servicio de IA
    const enviarConsulta = async () => {
      if (!consulta.value.trim() || cargandoRespuesta.value) return;

      const mensajeUsuario = {
        tipo: 'usuario' as const,
        texto: consulta.value
      };

      // Agregar mensaje del usuario solo al store
      assistantStore.addMessage(mensajeUsuario);

      // Actualizar la variable local desde el store para mantener sincronización
      conversacion.value = [...assistantStore.conversacion];

      // Agregar mensaje del asistente (cargando) solo al store
      const mensajeCargando = {
        tipo: 'asistente' as const,
        texto: '',
        cargando: true
      };
      assistantStore.addMessage(mensajeCargando);

      // Actualizar variable local desde el store
      conversacion.value = [...assistantStore.conversacion];

      // Hacer scroll al final de la conversación
      await scrollAlFinal();

      const pregunta = consulta.value;
      consulta.value = '';

      try {
        cargandoRespuesta.value = true;

        // Utilizar el nuevo endpoint de asistente
        const respuesta = await consultarAsistente({
          consulta: pregunta,
          max_documentos_contexto: 3,
          umbral_relevancia: 0.6
        });

        // Actualizar el último mensaje solo en el store
        const mensajeRespuesta = {
          tipo: 'asistente' as const,
          texto: respuesta.respuesta,
          documentosConsultados: respuesta.documentos_consultados,
          tiempoEjecucion: respuesta.tiempo_ejecucion
        };

        assistantStore.updateLastMessage(mensajeRespuesta);

        // Actualizar variable local desde el store
        conversacion.value = [...assistantStore.conversacion];

      } catch (error) {
        console.error('Error al consultar al asistente:', error);

        // Actualizar el mensaje de error solo en el store
        const mensajeError = {
          tipo: 'asistente' as const,
          texto: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, inténtalo de nuevo más tarde.'
        };

        assistantStore.updateLastMessage(mensajeError);

        // Actualizar variable local desde el store
        conversacion.value = [...assistantStore.conversacion];

        notify({
          title: 'Error',
          text: 'No se pudo obtener la respuesta del asistente',
          type: 'error'
        });
      } finally {
        cargandoRespuesta.value = false;
        await scrollAlFinal();
      }
    };

    // Hacer scroll al final de la conversación de forma segura
    const scrollAlFinal = async () => {
      await nextTick();
      setTimeout(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTo({
            top: messagesContainer.value.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    };

    // Formatear mensaje con Markdown y sanitizar HTML
    const formatearMensaje = (texto: string) => {
      const htmlSinSanitizar = marked(texto);
      return DOMPurify.sanitize(htmlSinSanitizar);
    };

    // Navegar a un documento
    const irADocumento = (documentoId: string) => {
      router.push(`/documento/${documentoId}`);
    };

    // Buscar documentos
    const buscarDocumentos = async () => {
      // Simulación de búsqueda (reemplazar con llamada a API real)
      if (busquedaDocumento.value.length < 2) {
        resultadosBusquedaDocumentos.value = [];
        return;
      }

      try {
        // Aquí deberías implementar una llamada real a tu API de búsqueda
        // Por ejemplo: const response = await axios.get(`/api/documentos/buscar?q=${busquedaDocumento.value}`);

        // Simulamos resultados por ahora
        setTimeout(() => {
          resultadosBusquedaDocumentos.value = [
            { id: 'doc1', titulo: 'Manual de procedimientos', descripcion: 'Versión 2.0 - Actualizado en 2023' },
            { id: 'doc2', titulo: 'Política de seguridad', descripcion: 'Documento oficial de la organización' },
            { id: 'doc3', titulo: 'Guía de usuario', descripcion: 'Manual para usuarios finales del sistema' }
          ].filter(d => d.titulo.toLowerCase().includes(busquedaDocumento.value.toLowerCase()));
        }, 300);
      } catch (error) {
        console.error('Error al buscar documentos:', error);
        notify({
          title: 'Error',
          text: 'No se pudieron cargar los documentos',
          type: 'error'
        });
      }
    };

    // Agregar documento al contexto
    const agregarDocumentoContexto = (documento: Documento) => {
      // Verificar si ya existe en el contexto
      if (!documentosSeleccionados.value.some(d => d.id === documento.id)) {
        documentosSeleccionados.value.push(documento);
        busquedaDocumento.value = '';
        resultadosBusquedaDocumentos.value = [];
      }
    };

    // Remover documento del contexto
    const removerDocumentoContexto = (id: string) => {
      documentosSeleccionados.value = documentosSeleccionados.value.filter(d => d.id !== id);
    };

    // Limpiar todos los documentos de contexto
    const limpiarContexto = () => {
      documentosSeleccionados.value = [];
    };

    // Limpiar la conversación
    const limpiarConversacion = () => {
      conversacion.value = [
        {
          tipo: 'asistente',
          texto: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?'
        }
      ];

      // Sincronizar con store
      assistantStore.clearConversation();
    };

    // Hacer scroll cuando se agrega un nuevo mensaje y observar cambios en conversación
    watch(() => conversacion.value.length, scrollAlFinal);
    watch(() => conversacion.value, scrollAlFinal, { deep: true });

    onMounted(() => {
      // Cargar conversación desde el store si existe
      const storedMessages = assistantStore.conversacion;

      if (storedMessages && storedMessages.length > 0) {
        conversacion.value = [...storedMessages];
      } else {
        // Inicializar store con mensaje inicial
        assistantStore.initializeConversation();
        conversacion.value = [...assistantStore.conversacion];
      }

      // Scroll inicial
      nextTick(() => scrollAlFinal());
    });

    return {
      consulta,
      conversacion,
      cargandoRespuesta,
      messagesContainer,
      mostrarContexto,
      documentosSeleccionados,
      busquedaDocumento,
      resultadosBusquedaDocumentos,
      enviarConsulta,
      formatearMensaje,
      irADocumento,
      buscarDocumentos,
      agregarDocumentoContexto,
      removerDocumentoContexto,
      limpiarContexto,
      limpiarConversacion
    };
  }
});
</script>

<style scoped>
.ia-assistant-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
  min-height: 65vh;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #ffffff;
}

.messages {
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: calc(70vh - 180px);
}

.mensaje {
  display: flex;
  gap: 0.75rem;
  max-width: 85%;
}

.mensaje.usuario {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.mensaje.asistente {
  align-self: flex-start;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.mensaje.usuario .avatar {
  background: #4361ee;
  color: #ffffff;
}

.mensaje.asistente .avatar {
  background: #3f37c9;
  color: #ffffff;
}

.contenido {
  padding: 0.875rem 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: calc(100% - 50px);
  word-break: break-word;
}

.mensaje.usuario .contenido {
  background: #4361ee10;
  border: 1px solid #4361ee30;
  border-radius: 12px 12px 0 12px;
}

.mensaje.asistente .contenido {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px 12px 12px 0;
}

.mensaje-texto {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #212529;
}

.mensaje-texto p {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.mensaje-texto p:last-child {
  margin-bottom: 0;
}

.mensaje-texto a {
  color: #4361ee;
  text-decoration: none;
}

.mensaje-texto a:hover {
  text-decoration: underline;
}

.mensaje-texto pre {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0.75rem 0;
  font-size: 0.85rem;
}

.mensaje-texto code {
  background-color: #f8f9fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.85em;
  font-family: monospace;
}

.input-area {
  padding: 1rem;
  background: #ffffff;
  border-top: 1px solid #e9ecef;
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
}

.input-area textarea {
  flex: 1;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  background: #ffffff;
  color: #212529;
  transition: all 0.2s;
  resize: none;
  min-height: 50px;
  max-height: 120px;
  line-height: 1.5;
  font-family: inherit;
}

.input-area textarea:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
}

.input-area textarea:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.send-button {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: #4361ee;
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  margin-bottom: 2px;
}

.send-button:hover:not(:disabled) {
  background: #3a56d4;
  transform: translateY(-2px);
}

.send-button:disabled {
  background: #ced4da;
  cursor: not-allowed;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 6px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: #4361ee;
  border-radius: 50%;
  display: inline-block;
  animation: typing 1.4s infinite both;
  opacity: 0.6;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

.referencias {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  border-top: 1px solid #e9ecef;
  padding-top: 0.75rem;
}

.referencias-titulo {
  font-weight: 600;
  margin: 0 0 5px;
  color: #6c757d;
  font-size: 0.8rem;
}

.referencias ul {
  margin: 0;
  padding-left: 18px;
  list-style-type: square;
}

.referencia-link {
  color: #4361ee;
  text-decoration: none;
  cursor: pointer;
  font-size: 0.8rem;
}

.referencia-link:hover {
  text-decoration: underline;
}

.contexto-container {
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  max-height: 35vh;
  overflow-y: auto;
}

.contexto-container h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #343a40;
  font-weight: 600;
}

.descripcion-contexto {
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.documentos-seleccionados {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.documento-tag {
  background-color: #e9f2ff;
  color: #4361ee;
  border-radius: 16px;
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  border: 1px solid #4361ee30;
}

.remover-doc {
  background: none;
  border: none;
  color: #6c757d;
  margin-left: 6px;
  cursor: pointer;
  padding: 0;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.limpiar-contexto {
  background: none;
  border: none;
  color: #6c757d;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0.25rem 0.5rem;
}

.buscar-documentos input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.9rem;
}

.buscar-documentos input:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
}

.resultados-busqueda {
  margin-top: 0.75rem;
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #ffffff;
}

.resultado-documento {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #e9ecef;
}

.resultado-documento:hover {
  background-color: #f8f9fa;
}

.resultado-documento:last-child {
  border-bottom: none;
}

.doc-icon {
  margin-right: 0.75rem;
  color: #6c757d;
  font-size: 1rem;
}

.doc-info h4 {
  margin: 0;
  font-size: 0.9rem;
  color: #343a40;
}

.doc-info p {
  margin: 2px 0 0;
  font-size: 0.8rem;
  color: #6c757d;
}

.opciones-container {
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  border-top: 1px solid #e9ecef;
  position: sticky;
  bottom: 0;
  z-index: 5;
}

.toggle-contexto,
.limpiar-chat {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.toggle-contexto:hover,
.limpiar-chat:hover {
  color: #4361ee;
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .input-area textarea {
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
  }

  .send-button {
    width: 40px;
    height: 40px;
  }

  .mensaje {
    max-width: 95%;
  }

  .messages {
    max-height: calc(70vh - 160px);
  }
}

@media (max-width: 480px) {
  .messages {
    padding: 0.75rem;
    max-height: calc(70vh - 140px);
  }

  .input-area {
    padding: 0.75rem;
  }

  .opciones-container {
    flex-direction: column;
    gap: 0.5rem;
  }

  .toggle-contexto,
  .limpiar-chat {
    width: 100%;
    justify-content: center;
  }
}
</style>
