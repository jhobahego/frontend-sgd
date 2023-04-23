import { AxiosResponse } from 'axios';
import axios from './Axios'
import { LoginUser, RegisterUser } from '@/interfaces/User'
import { Token } from '@/interfaces/Token';
import { obtenerTokenDeLocalStorage } from './Utils';

export const registrarUsuario = async (datos: RegisterUser): Promise<AxiosResponse<RegisterUser> | undefined> => {
  try {
    const usuarioRegistrado = await axios.post("/usuarios/guardar", datos);
    return usuarioRegistrado
  } catch (error) {
    console.log(error);
  }
}

export const autenticarUsuario = async (data: LoginUser): Promise<AxiosResponse<Token> | undefined> => {
  const Form = new FormData();
  
  Form.append("username", data.correo);
  Form.append("password", data.contra);

  try {
    const respuesta = await axios.post("http://localhost:8000/token", Form, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }});

    return respuesta;
  } catch (error) {
    console.log(error);
  }
}

export const obtenerUsuarioAutenticado = async (): Promise<AxiosResponse<RegisterUser> | undefined> => {
  const token = obtenerTokenDeLocalStorage();
  
  try {
    const respuesta = await axios.get("/usuarios/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return respuesta;
  } catch (error) {
    console.log(`error al obtener usuario autenticado: ${error}`);
  }
}