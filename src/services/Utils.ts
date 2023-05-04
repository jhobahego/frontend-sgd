import { Solicitud } from "@/interfaces/Solicitud";
import { Document } from "@/interfaces/Document";
import { obtenerComprasDeUsuario } from "./Purchase";
import { RegisterUser } from "@/interfaces/User";
import { Registro } from "@/interfaces/Registro";
import { Galeria } from "@/interfaces/Galeria";

export const puedesAdquirir = async ({ cliente, correo, opcion, cantidad }: Solicitud, documento: Document): Promise<boolean> => {
  if (documento.stock < 1 || cantidad < 1) return false;
  if (opcion === 'prestamo' && cantidad > 1) return false;

  const correoValido = await verificarCorreo(cliente, correo);
  if (!correoValido) return false;

  const yaPresto = await haPrestado(opcion, cliente);
  if (yaPresto) return false;

  const compraValida = puedeComprar(cantidad, documento.stock);
  if (opcion === 'compra' && !compraValida) return false;

  return true;
}

const verificarCorreo = async (cliente: RegisterUser, correo: string): Promise<boolean> => {
  if (correo === cliente.correo) return true;

  return false;
}

export const obtenerTokenDeLocalStorage = (): string | null => {
  const token = localStorage.getItem("token");
  if (token == null) return null;

  return token;
}

const haPrestado = async (opcion: string, cliente: RegisterUser): Promise<boolean> => {
  if (opcion !== "prestamo") return false;

  const compras = await obtenerComprasDeUsuario(cliente);
  if (!compras) return false;

  return compras.some(registro =>
    registro.tipo_de_adquisicion === "prestamo" && registro.activo);
}

const puedeComprar = (cantidad: number, stock: number): boolean => {
  if (cantidad > stock) return false;

  return true;
}

export const normalizarRegistros = (registros: Registro[]): Galeria => {
  const registrosUnicos: Galeria = {compras: [], prestamos: []};

  const registrosCompraUnicos = registros.filter(
    (registro) => registro.tipo_de_adquisicion === "compra" && !registro.activo
  );
  for (const registro of registrosCompraUnicos) {
    const index = registrosUnicos.compras.findIndex(
      (reg) => reg.id_documento === registro.id_documento
    );
    if (index === -1) {
      // No existe un registro con el mismo id_documento, agregar el registro completo
      registrosUnicos.compras.push(registro);
    } else {
      // Actualizar la cantidad del registro existente
      registrosUnicos.compras[index].cantidad += 1;
    }
  }

  // Filtrar los registros de préstamo y agregarlos al arreglo de préstamos único
  const registrosPrestamoUnicos = registros.filter(
    (registro) => registro.tipo_de_adquisicion === "prestamo" && registro.activo
  );

  for (const registro of registrosPrestamoUnicos) {
    registrosUnicos.prestamos.push(registro);
  }

  return registrosUnicos;
}