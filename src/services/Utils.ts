import { obtenerUsuarioAutenticado } from "./AuthService";
import { Solicitud } from "@/interfaces/Solicitud";
import { Document } from "@/interfaces/Document";
import { obtenerComprasDeUsuario } from "./Purchase";

export const puedesAdquirir = async ({ correo, opcion, cantidad }: Solicitud, documento: Document): Promise<boolean> => {
  if(documento.stock < 1 || cantidad < 1) return false;
  if(opcion === 'prestamo' && cantidad > 1) return false;
  
  const correoValido = await verificarCorreo(correo);
  if(!correoValido) return false;
  
  const yaPresto = await haPrestado();
  if(yaPresto) return false;

  const compraValida = puedeComprar(cantidad, documento.stock);
  if(opcion === 'compra' && !compraValida) return false;
  
  return true;
}

const verificarCorreo = async (correo: string): Promise<boolean> => {
  const usuario = await obtenerUsuarioAutenticado();
  if(!usuario) return false;

  if(correo === usuario.correo) return true;
  
  return false;
}

export const obtenerTokenDeLocalStorage = (): string | null => {
  const token = localStorage.getItem("token");
  if(token == null) return null;

  return token;
}

const haPrestado = async (): Promise<boolean> => {
  const compras = await obtenerComprasDeUsuario();
  if(!compras) return false;
  
  compras.forEach(registro => {
    const { tipo_de_adquisicion, activo } = registro;
    if(tipo_de_adquisicion === "prestamo" && activo) return true;
  });

  return false;
}

const puedeComprar = (cantidad: number, stock: number): boolean => {
  if(cantidad > stock) return false;

  return true;
}