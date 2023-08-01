import axiosInstance from "./Axios";
import { RegisterUser } from "@/interfaces/User";
import { AxiosResponse } from "axios";

export async function obtenerUsuarios(): Promise<AxiosResponse<RegisterUser[]>> {
  return await axiosInstance.get("/usuarios");
}

export async function obtenerUsuario(correo: string | string[]): Promise<AxiosResponse<RegisterUser>> {
  return await axiosInstance.get(`/usuarios/correo/${correo}`);
}

export async function actualizarUsuario(usuario: RegisterUser): Promise<AxiosResponse<RegisterUser>> {
  return await axiosInstance.put(`/usuarios/actualizar/${usuario._id}`, usuario);
}

export async function eliminarUsuario(usuario_id: string): Promise<AxiosResponse> {
  return await axiosInstance.delete(`/usuarios/eliminar/${usuario_id}`);
}

