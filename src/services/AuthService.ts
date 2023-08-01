import { LoginUser, RegisterUser, UserResponse } from '@/interfaces/User'
import { Token } from '@/interfaces/Token'
import axiosInstance from './Axios';
import { AxiosResponse } from 'axios';

export const registrarUsuario = async (datos: RegisterUser): Promise<AxiosResponse<UserResponse>> => {
  return await axiosInstance.post("/usuarios/guardar", datos);
}

export const autenticarUsuario = async (data: LoginUser): Promise<AxiosResponse<Token>> => {
  const Form = new FormData();

  Form.append("username", data.correo);
  Form.append("password", data.contra);


  const response = await axiosInstance.post("/token", Form, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return response
}

export const obtenerUsuarioAutenticado = async (): Promise<AxiosResponse<UserResponse>> => {
  return await axiosInstance.get("/usuarios/perfil")
}