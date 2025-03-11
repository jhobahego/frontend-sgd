import { defineStore } from 'pinia';

interface Mensaje {
  tipo: 'usuario' | 'asistente';
  texto: string;
  cargando?: boolean;
  documentosConsultados?: string[];
  tiempoEjecucion?: number;
}

export const useAssistantStore = defineStore('assistant', {
  state: () => ({
    conversacion: [] as Mensaje[],
    initialized: false
  }),

  persist: {
    storage: localStorage,
    paths: ['conversacion']
  },

  actions: {
    initializeConversation() {
      if (this.initialized) return;

      const savedConversation = localStorage.getItem('assistant_conversation');
      if (savedConversation) {
        this.conversacion = JSON.parse(savedConversation);
      } else {
        this.conversacion = [{
          tipo: 'asistente',
          texto: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?'
        }];
      }
      this.initialized = true;
    },

    addMessage(mensaje: Mensaje) {
      this.conversacion.push(mensaje);
    },

    updateLastMessage(mensaje: Mensaje) {
      if (this.conversacion.length > 0) {
        this.conversacion[this.conversacion.length - 1] = mensaje;
      }
    },

    clearConversation() {
      this.conversacion = [{
        tipo: 'asistente',
        texto: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?'
      }];
    },
  }
});