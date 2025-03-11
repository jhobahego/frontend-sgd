import axios from './Axios';

// Interfaces for AI services
interface BusquedaSemanticaResultado {
  documento_id: string;
  titulo: string;
  relevancia: number;
  fragmento?: string;
  fecha?: string;
  autor?: string;
}

interface BusquedaSemanticaResponse {
  resultados: BusquedaSemanticaResultado[];
  tiempo_ejecucion: number;
  consulta_procesada: string;
}

interface ClasificacionDocumento {
  documento_id: string;
  clasificacion: string;
  confianza: number;
}

interface ResultadoOCR {
  documento_id: string;
  texto_extraido: string;
  metadatos_extraidos: Record<string, any>;
  confianza: number;
}

interface TraduccionDocumento {
  documento_id: string;
  contenido_traducido: string;
  idioma_origen: string;
  idioma_destino: string;
}

interface SolicitudAsistente {
  consulta: string;
  max_documentos_contexto?: number;
  umbral_relevancia?: number;
}

interface RespuestaAsistente {
  respuesta: string;
  documentos_consultados: string[];
  tiempo_ejecucion: number;
}

// Búsqueda semántica de documentos
export const realizarBusquedaSemantica = async (
  query: string,
  num_resultados: number = 10
): Promise<BusquedaSemanticaResponse> => {
  try {
    const response = await axios.post('/ia/busqueda-semantica', {
      query,
      num_resultados
    });
    return response.data;
  } catch (error) {
    console.error('Error en búsqueda semántica:', error);
    throw error;
  }
};

// Clasificar documento
export const clasificarDocumento = async (
  documentoId: string
): Promise<ClasificacionDocumento> => {
  try {
    const response = await axios.post('/ia/clasificar', {
      documento_id: documentoId
    });
    return response.data;
  } catch (error) {
    console.error('Error al clasificar documento:', error);
    throw error;
  }
};

// Procesar OCR
export const procesarOCR = async (
  archivo: File
): Promise<ResultadoOCR> => {
  try {
    const formData = new FormData();
    formData.append('archivo', archivo);
    const response = await axios.post('/ia/ocr', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al procesar OCR:', error);
    throw error;
  }
};

// Traducir documento
export const traducirDocumento = async (
  documentoId: string,
  idiomaDestino: string
): Promise<TraduccionDocumento> => {
  try {
    const response = await axios.post('/ia/traducir', {
      documento_id: documentoId,
      idioma_destino: idiomaDestino
    });
    return response.data;
  } catch (error) {
    console.error('Error al traducir documento:', error);
    throw error;
  }
};

/**
 * Consulta al asistente virtual basado en IA
 * @param solicitud Parámetros de la consulta
 * @returns Respuesta del asistente
 */
export const consultarAsistente = async (solicitud: SolicitudAsistente): Promise<RespuestaAsistente> => {
  try {
    const response = await axios.post('/ia/asistente', solicitud, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error en la consulta al asistente:', error);
    throw error;
  }
};
