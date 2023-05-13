import { AxiosResponse } from "axios";
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

export const obtenerDocumento = async (documento_id: string | string[], token: string): Promise<AxiosResponse<Document> | undefined> => {
  try {
    const documento = await axios.get(`/documentos/${documento_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return documento;
  } catch (error) {
    console.log(error);
  }
}