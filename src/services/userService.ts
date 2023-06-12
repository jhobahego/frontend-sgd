import { useAuth } from "@/store/authStore";
import axiosInstance from "./Axios";
import { RegisterUser } from "@/interfaces/User";

export async function obtenerUsuarios(): Promise<RegisterUser[]> {
  const authStore = useAuth();
  const token = authStore.token;
  if(token.length === 0) return [];

  try{
    const respuesta = await axiosInstance.get("/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return respuesta.data as RegisterUser[];
  } catch(error) {
    console.log(error);
    return [];
  }
}