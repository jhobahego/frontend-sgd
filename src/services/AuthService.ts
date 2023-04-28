import axios from './Axios'
import { LoginUser, RegisterUser } from '@/interfaces/User'
import { Token } from '@/interfaces/Token';
import { obtenerTokenDeLocalStorage } from './Utils';

export const registrarUsuario = async (datos: RegisterUser): Promise<RegisterUser | undefined> => {
  try {
    const respuesta = await axios.post("/usuarios/guardar", datos);
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
    const respuesta = await axios.post("http://localhost:8000/token", Form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}

export const obtenerUsuarioAutenticado = async (): Promise<RegisterUser | undefined> => {
  const token = obtenerTokenDeLocalStorage();
  if (token == null) return;

  try {
    const respuesta = await axios.get("/usuarios/perfil", {
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