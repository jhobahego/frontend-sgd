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