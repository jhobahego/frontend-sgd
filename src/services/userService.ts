import { useAuth } from "@/store/authStore";
import axiosInstance from "./Axios";
import { RegisterUser } from "@/interfaces/User";
import { AxiosError } from "axios";

export async function obtenerUsuarios(): Promise<RegisterUser[]> {
  const authStore = useAuth();
  const token = authStore.token;
  if (token.length === 0) return [];

  try {
    const respuesta = await axiosInstance.get("/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return respuesta.data as RegisterUser[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function obtenerUsuario(nombres: string | string[]): Promise<RegisterUser> {
  const authStore = useAuth();
  const token = authStore.token;
  if (token.length === 0) return {} as RegisterUser;

  try {
    const respuesta = await axiosInstance.get(`/usuarios/nombre/${nombres}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return respuesta.data as RegisterUser;
  } catch (error) {
    console.log(error);
    return {} as RegisterUser;
  }
}

export async function actualizarUsuario(usuario: RegisterUser): Promise<UpdateResponse> {
  const authStore = useAuth();
  const token = authStore.token;

  const apiResponse = {} as UpdateResponse;
  try {
    const respuesta = await axiosInstance.put(`/usuarios/actualizar/${usuario._id}`, usuario, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    apiResponse.message = "";
    apiResponse.user = respuesta.data;
    return apiResponse;
  } catch (error) {
    const status = (error as AxiosError).response?.status;
    // console.log(status);
    if (status === 404 || status === 401) {
      const apiError = (error as AxiosError).response?.data as ApiErrorMessage;

      apiResponse.message = apiError.detail === "Not authenticated" ? "Sesión expirada, inicia sesión nuevamente": apiError.detail;
      return apiResponse;
    }

    apiResponse.message = "Error en la red intentelo nuevamente mas tarde";
    return apiResponse;
  }
}

interface UpdateResponse {
  user: RegisterUser,
  message: string
}

type ApiErrorMessage = { detail: string }