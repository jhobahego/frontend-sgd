import { Document } from "@/interfaces/Document";
import { obtenerTokenDeLocalStorage } from "./Utils";
import { notify } from '@kyvg/vue3-notification';
import axiosInstance from './Axios'

export const obtenerDocumentos = async (): Promise<Document[]> => {
  const token = obtenerTokenDeLocalStorage();
  try {
    const respuesta = await axiosInstance.get("/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return respuesta.data;
  } catch (error) {
    return [];
  }
}

export const obtenerDocumento = async (documento_id: string | string[]): Promise<Document> => {
  const token = obtenerTokenDeLocalStorage();
  try {
    const respuesta = await axiosInstance.get(`/documentos/${documento_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return respuesta.data;
  } catch (error) {
    console.log(error);
    return {} as Document;
  }
}

export const guardarDocumentoEnBD = async (form: FormData): Promise<Document> => {
  try {
    const token = obtenerTokenDeLocalStorage();
    
    const res = await axiosInstance.post("/documentos/guardar", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    if(res){
      return res.data;
    }
  } catch(e) {
    notify({
      title: "Error al guardar",
      text: "No se pudo guardar el documento",
      type: "error",
      duration: 2000,
    })
  }
  return {} as Document;
}
