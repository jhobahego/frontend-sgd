import { UserResponse } from "./User";

export interface Solicitud {
  cliente: UserResponse,
  correo: string,
  opcion: string,
  cantidad: number,
}