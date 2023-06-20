import { Solicitud } from "@/interfaces/Solicitud";
import { Documento } from "@/interfaces/Documento";
import { UserResponse } from "@/interfaces/User";
import { Registro } from "@/interfaces/Registro";
import { Galeria } from "@/interfaces/Galeria";
import { useRecord } from "@/store/recordsStore";
import { PurchaseValidationResult } from "@/types";

export const puedesAdquirir = async ({ cliente, correo, opcion, cantidad }: Solicitud, documento: Documento): Promise<PurchaseValidationResult> => {
  const validator = {} as PurchaseValidationResult;
  
  if (documento.stock < 1 || cantidad < 1) {
    validator.message = "No puedes adquirir cantidades negativas";
    
    return validator;
  }

  if (opcion === 'prestamo' && cantidad > 1) {
    validator.message = "Solo puedes prestar un documento por persona";

    return validator;
  }

  const correoValido = await verificarCorreo(cliente, correo);
  if (!correoValido) {
    validator.message = "Debes usar tu correo electronico";

    return validator;
  }

  const yaPresto = await haPrestado(opcion, documento);
  if (yaPresto) {
    validator.message = "Ya has prestado este documento";
    
    return validator;
  }

  const compraValida = puedeComprar(cantidad, documento.stock);
  if (opcion === 'compra' && !compraValida) {
    validator.message = "No puedes comprar mas documentos de los que hay disponibles";
    
    return validator;
  }

  validator.canBuy = true;
  validator.message = `${cantidad} articulos de ${documento.titulo} agregados a tu galeria`;
  
  return validator;
}

const verificarCorreo = async (cliente: UserResponse, correo: string): Promise<boolean> => {
  if (correo === cliente.correo) return true;

  return false;
}

const haPrestado = async (opcion: string, documento: Documento): Promise<boolean> => {
  const recordStore = useRecord();
  if (opcion !== "prestamo") return false;

  const compras = recordStore.registros;

  return compras.some(registro =>
    registro.tipo_de_adquisicion === "prestamo" && registro.activo && registro.id_documento === documento._id);
}

const puedeComprar = (cantidad: number, stock: number): boolean => {
  if (cantidad > stock) return false;

  return true;
}

export const normalizarRegistros = (registros: Registro[]): Registro[] => {
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

  return registrosUnicos.compras.concat(registrosUnicos.prestamos);
}