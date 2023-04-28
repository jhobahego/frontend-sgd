import { AxiosResponse } from "axios";
import axios from './Axios'
import { Document } from "@/interfaces/Document";

export const obtenerDocumentos = async (token: string): Promise<AxiosResponse<Document[]> | undefined> => {
  try {
    const documentos = await axios.get("/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return documentos;
  } catch (error) {
    console.log(error);
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