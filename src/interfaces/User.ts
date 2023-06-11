export type Rol = "USER" | "ADMIN";

export interface LoginUser {
  correo: string,
  contra: string,
}

export interface RegisterUser extends LoginUser {
  _id: string,
  nombres: string,
  apellidos: string,
  ciudad: string,
  pais: string,
  rol: Rol,
}

export interface UserResponse {
  _id: string,
  correo: string,
  nombres: string,
  rol: Rol,
}