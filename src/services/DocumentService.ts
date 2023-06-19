import { Documento } from "@/interfaces/Documento";
import axiosInstance from './Axios'
import { useAuth } from "@/store/authStore";
import { AxiosError } from "axios";
import { ApiErrorMessage, ApiResponse } from "@/types";

export const obtenerDocumentos = async (): Promise<Documento[]> => {
  const authStore = useAuth();
  const token = authStore.token;

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
  const authStore = useAuth();
  const token = authStore.token;

  try {
    const respuesta = await axiosInstance.get(`/documentos/${documento_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const documento = respuesta.data;
    return { success: true, body: documento, message: "Documento creado correctamente" } as ApiResponse;
  } catch (error) {
    const status = (error as AxiosError).response?.status;
    if (status === 404) {
      const apiError = (error as AxiosError).response?.data as ApiErrorMessage;
      return { success: false, body: {}, message: apiError.detail } as ApiResponse;
    }
    return { success: false, body: {}, message: "Error en la red intentalo nuevamente mas tarde" } as ApiResponse;
  }
}

export const guardarDocumentoEnBD = async (form: FormData): Promise<ApiResponse> => {
  const authStore = useAuth();
  const token = authStore.token;

  try {
    const res = await axiosInstance.post("/documentos/guardar", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });

    const documento = res.data;
    return { success: true, body: documento, message: `El documento ${documento.titulo} se ha guardado correctamente` } as ApiResponse;
  } catch (error) {
    const status = (error as AxiosError).response?.status;
    if (status === 401 || status === 400) {
      const apiError = (error as AxiosError).response?.data as ApiErrorMessage;
      return { success: false, message: apiError.detail } as ApiResponse;
    }
    return { success: false, body: {}, message: "Error en la red, intentalo nuevamente mas tarde" } as ApiResponse;
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

    return { success: true, body: respuesta.data, message: `Documento ${respuesta.data.titulo} actualizado correctamente` } as ApiResponse;
  } catch (error) {
    const status = (error as AxiosError).response?.status;
    if (status === 401 || status === 404) {
      const apiError = (error as AxiosError).response?.data as ApiErrorMessage;
      return { success: false, body: {}, message: apiError.detail } as ApiResponse;
    }

    return { success: false, body: {}, message: "Error en la red, intentelo mas tarde" } as ApiResponse;
  }
}
