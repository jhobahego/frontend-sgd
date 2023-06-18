import { Documento } from "@/interfaces/Documento";
import { obtenerTokenDeLocalStorage } from "./Utils";
import axiosInstance from './Axios'
import { useAuth } from "@/store/authStore";
import { AxiosError } from "axios";
import { ApiErrorMessage, ApiResponse } from "@/types";

export const obtenerDocumentos = async (): Promise<Documento[]> => {
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

export const obtenerDocumento = async (documento_id: string | string[]): Promise<ApiResponse> => {
  const token = obtenerTokenDeLocalStorage();
  try {
    const respuesta = await axiosInstance.get(`/documentos/${documento_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const documento = respuesta.data;
    return { body: documento, message: "" } as ApiResponse;
  } catch (error) {
    const status = (error as AxiosError).response?.status;
    if (status === 404) {
      const apiError = (error as AxiosError).response?.data as ApiErrorMessage;
      return { message: apiError.detail } as ApiResponse;
    }
    return { body: {}, message: "Error en la red intentalo nuevamente mas tarde" } as ApiResponse;
  }
}

export const guardarDocumentoEnBD = async (form: FormData): Promise<ApiResponse> => {
  try {
    const token = obtenerTokenDeLocalStorage();

    const res = await axiosInstance.post("/documentos/guardar", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });

    const documento = res.data;
    return { body: documento, message: "" } as ApiResponse;
  } catch (error) {
    const status = (error as AxiosError).response?.status;
    if (status === 401 || status === 400) {
      const apiError = (error as AxiosError).response?.data as ApiErrorMessage;
      return { message: apiError.detail } as ApiResponse;
    }
    return { message: "Error en la red, intentalo nuevamente mas tarde" } as ApiResponse;
  }
}

export async function actualizarDocumento(documento: Documento): Promise<ApiResponse> {
  const authStore = useAuth();
  const token = authStore.token;

  try {
    const respuesta = await axiosInstance.put(`/documentos/actualizar/${documento._id}`, documento, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return { body: respuesta.data, message: "" } as ApiResponse;
  } catch (error) {
    const status = (error as AxiosError).response?.status;
    if (status === 401 || status === 404) {
      const apiError = (error as AxiosError).response?.data as ApiErrorMessage;
      return { message: apiError.detail } as ApiResponse;
    }

    return { message: "Error en la red, intentelo mas tarde" } as ApiResponse;
  }
}
