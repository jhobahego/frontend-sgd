import { RegisterUser } from "./User";

export interface Solicitud {
  cliente: RegisterUser,
  correo: string,
  opcion: string,
  cantidad: number,
}