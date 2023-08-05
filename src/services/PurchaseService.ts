import { Documento } from "@/interfaces/Documento"
import { Registro } from "@/interfaces/Registro";
import { Solicitud } from "@/interfaces/Solicitud";
import { puedesAdquirir } from "./Utils";
import axiosInstance from "./Axios";
import { useAuth } from "@/store/authStore";
import { PurchaseValidationResult } from "@/types";
import { AxiosResponse } from "axios";

export const adquirirDocumento = async (documento: Documento, solicitud: Solicitud): Promise<PurchaseValidationResult> => {
  const validador = await puedesAdquirir(solicitud, documento);

  if (!validador.canBuy) {
    return validador;
  }

  const nuevoDocumento = { ...documento };
  nuevoDocumento.stock -= solicitud.cantidad;

  try {
    const { data: documentoActualizado } = await actualizarDocumento(nuevoDocumento);
    await registrarAdquisicion(solicitud, documentoActualizado);
    validador.canBuy = true;
  } catch (error) {
    validador.canBuy = false;
    validador.message = "No se pudo registrar la adquisición";
  }

  return validador;
}

export const obtenerComprasDeUsuario = async (): Promise<AxiosResponse<Registro[]>> => {
  const { usuario } = useAuth();
  return await axiosInstance.get(`/ventas/usuario/${usuario._id}`);
}

const actualizarDocumento = async (documento: Documento): Promise<AxiosResponse<Documento>> => {
  return await axiosInstance.put(`/documentos/actualizar/${documento._id}`, documento);
}

const registrarVenta = async (adquisicion: Registro): Promise<AxiosResponse<Registro>> => {
  return await axiosInstance.post("/ventas/guardar", adquisicion);
}

const registrarAdquisicion = async (
  solicitud: Solicitud,
  documentoActualizado: Documento
): Promise<AxiosResponse<Registro>> => {
  const { cantidad, opcion: tipo_de_adquisicion, cliente } = solicitud;
  const activo = tipo_de_adquisicion === "prestamo";

  const adquisicion = {
    id_cliente: cliente._id,
    nombre_cliente: cliente.nombres,
    id_documento: documentoActualizado._id || "",
    titulo_documento: documentoActualizado.titulo,
    imagen: documentoActualizado.imagen,
    tipo_de_adquisicion,
    cantidad,
    activo,
  }

  return await registrarVenta(adquisicion);
}