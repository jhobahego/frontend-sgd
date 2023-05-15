import axios from './Axios'
import { Document } from "@/interfaces/Document";
import { obtenerTokenDeLocalStorage } from "./Utils";

export const obtenerDocumentos = async (): Promise<Document[]> => {
  const token = obtenerTokenDeLocalStorage();
  try {
    const respuesta = await axios.get("/", {
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
    const respuesta = await axios.get(`/documentos/${documento_id}`, {
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