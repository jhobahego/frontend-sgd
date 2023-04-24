import { Document } from "@/interfaces/Document"
import { Registro } from "@/interfaces/Registro";
import { Solicitud } from "@/interfaces/Solicitud";
import { obtenerUsuarioAutenticado } from "./AuthService";
import { obtenerTokenDeLocalStorage, puedesAdquirir } from "./Utils";
import axios from "./Axios";

export const adquirirDocumento = async (documento: Document, solicitud: Solicitud): Promise<boolean> => {
  const puedes = await puedesAdquirir(solicitud, documento);
  if(!puedes) return false;

  const nuevoDocumento = {...documento};
  nuevoDocumento.stock -= solicitud.cantidad;

  const documentoActualizado = await actualizarDocumento(nuevoDocumento);
  if(!documentoActualizado) return false;

  const registro = await registrarAdquisicion(solicitud, documentoActualizado);
  if(!registro) return false;
  
  return true;
}

export const obtenerComprasDeUsuario = async (): Promise<Registro[] | undefined> => {
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
  }
}

const actualizarDocumento = async (documento: Document): Promise<Document | undefined> => {
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

const registrarVenta = async (adquisicion: Registro): Promise<Registro | undefined> => {
  const token = obtenerTokenDeLocalStorage();
  if(token == null) return;

  try {
    const respuesta = await axios.post("/ventas/guardar", adquisicion, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return respuesta.data;
  } catch (error) {
    return;
  }
}

const registrarAdquisicion = async (solicitud: Solicitud, documentoActualizado: Document) => {
  const usuario = await obtenerUsuarioAutenticado();
  if(!usuario) return;
  
  const { cantidad, opcion: tipo_de_adquisicion } = solicitud;
  const activo = tipo_de_adquisicion === "prestamo" ? true: false;
  
  const { _id: id_cliente, nombres: nombre_cliente } = usuario;
  const titulo_documento = documentoActualizado.titulo;
  
  let id_documento = ""
  if(documentoActualizado._id !== undefined) id_documento = documentoActualizado._id;

  const adquisicion = {
    id_cliente,
    nombre_cliente,
    id_documento,
    titulo_documento,
    tipo_de_adquisicion,
    cantidad,
    activo,
  }

  const registro = await registrarVenta(adquisicion);
  if(registro) return registro;
}