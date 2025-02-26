import { Documento } from "@/interfaces/Documento";
import axiosInstance from './Axios'

export const obtenerDocumentos = async (): Promise<Documento[]> => {
  try {
    const respuesta = await axiosInstance.get("/");
    return respuesta.data;
  } catch (error) {
    return [];
  }
}

export const obtenerDocumento = async (documento_id: string | string[]) => {
  return await axiosInstance.get(`/documentos/${documento_id}`);
}

export const guardarDocumentoEnBD = async (form: FormData) => {
  return await axiosInstance.post("/documentos/guardar", form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export async function actualizarDocumento(documento: Documento) {
  return await axiosInstance.put(`/documentos/actualizar/${documento._id}`, documento);
}
