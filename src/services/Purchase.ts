import { Document } from "@/interfaces/Document"
import { Registro } from "@/interfaces/Registro";
import { Solicitud } from "@/interfaces/Solicitud";
import { obtenerUsuarioAutenticado } from "./AuthService";
import { AxiosResponse } from "axios";
import { obtenerTokenDeLocalStorage, puedesAdquirir } from "./Utils";
import axios from "./Axios";

export const adquirirDocumento = async (documento: Document, solicitud: Solicitud): Promise<boolean> => {
  const puedes = await puedesAdquirir(solicitud, documento);
  if(!puedes) return false;

  const nuevoDocumento = {...documento};
  nuevoDocumento.stock -= solicitud.cantidad;

  const documentoActualizado = await actualizarDocumento(nuevoDocumento);
  if(!documentoActualizado) return false;

  return true;
}

export const obtenerComprasDeUsuario = async (): Promise<Registro | undefined> => {
  const usuario = await obtenerUsuarioAutenticado();
  if(!usuario) return;

  const token = obtenerTokenDeLocalStorage();
  if(token == null) return;
  try{
    const res = await axios.get(`/ventas/usuario/${usuario._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data;
  }catch(error) {
    return;
    // console.log(error);
  }
}

const actualizarDocumento = async (documento: Document): Promise<AxiosResponse<Document> | undefined> => {
  const token = obtenerTokenDeLocalStorage();
  if(token == null) return;

  try {
    const res = await axios.put(`/documentos/actualizar/${documento._id}`, documento, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    return res.data;
  } catch (error) {
    console.log(`error al actualizar documento: ${error}`);
  }
}
