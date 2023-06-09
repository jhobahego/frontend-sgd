import { LoginUser, RegisterUser } from '@/interfaces/User'
import { Token } from '@/interfaces/Token'
import axiosInstance from './Axios';

export const registrarUsuario = async (datos: RegisterUser): Promise<RegisterUser | undefined> => {
  try {
    const respuesta = await axiosInstance.post("/usuarios/guardar", datos);
    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}

export const autenticarUsuario = async (data: LoginUser): Promise<Token | undefined> => {
  const Form = new FormData();

  Form.append("username", data.correo);
  Form.append("password", data.contra);

  try {
    const respuesta = await axiosInstance.post("/token", Form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}

export const obtenerUsuarioAutenticado = async (token: string | null): Promise<RegisterUser | undefined> => {
  if (token?.length === 0) return;

  try {
    const respuesta = await axiosInstance.get("/usuarios/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const usuario = respuesta.data;

    return usuario;
  } catch (error) {
    console.log(`error al obtener usuario autenticado: ${error}`);
    return;
  }
}