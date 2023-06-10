import { Documento } from "@/interfaces/Documento"
import { Registro } from "@/interfaces/Registro";
import { Solicitud } from "@/interfaces/Solicitud";
import { puedesAdquirir } from "./Utils";
import axiosInstance from "./Axios";
import { useAuth } from "@/store/authStore";

export const adquirirDocumento = async (documento: Documento, solicitud: Solicitud): Promise<boolean> => {
  const puedes = await puedesAdquirir(solicitud, documento);
  if (!puedes) return false;

  const nuevoDocumento = { ...documento };
  nuevoDocumento.stock -= solicitud.cantidad;

  const documentoActualizado = await actualizarDocumento(nuevoDocumento);
  if (!documentoActualizado) return false;

  const registro = await registrarAdquisicion(solicitud, documentoActualizado);
  if (!registro) return false;

  return true;
}

export const obtenerComprasDeUsuario = async (): Promise<Registro[]> => {
  const store = useAuth();
  const token = store.token;
  const usuario = store.usuario;
  if (token.length === 0) return [];

  try {
    const res = await axiosInstance.get(`/ventas/usuario/${usuario._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data;
  } catch (error) {
    console.log({ compras: "No tienes compras" });
    return [];
  }
}

const actualizarDocumento = async (documento: Documento): Promise<Documento | undefined> => {
  const store = useAuth();
  const token = store.token;
  if (token.length === 0) return;

  try {
    const res = await axiosInstance.put(`/documentos/actualizar/${documento._id}`, documento, {
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
  const store = useAuth();
  const token = store.token;
  if (token.length === 0) return;

  try {
    const respuesta = await axiosInstance.post("/ventas/guardar", adquisicion, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return respuesta.data;
  } catch (error) {
    return;
  }
}

const registrarAdquisicion = async (solicitud: Solicitud, documentoActualizado: Documento) => {
  const { cantidad, opcion: tipo_de_adquisicion } = solicitud;
  const activo = tipo_de_adquisicion === "prestamo" ? true : false;

  const { _id: id_cliente, nombres: nombre_cliente } = solicitud.cliente;
  const { titulo: titulo_documento, imagen } = documentoActualizado;

  let id_documento = ""
  if (documentoActualizado._id !== undefined) id_documento = documentoActualizado._id;

  const adquisicion = {
    id_cliente,
    nombre_cliente,
    id_documento,
    titulo_documento,
    imagen,
    tipo_de_adquisicion,
    cantidad,
    activo,
  }

  const registro = await registrarVenta(adquisicion);
  if (registro) return registro;
}