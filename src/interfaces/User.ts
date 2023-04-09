export interface LoginUser {
  correo: string,
  contra: string,
}

export interface RegisterUser extends LoginUser {
  nombres: string,
  apellidos: string,
  ciudad: string,
  pais: string,
}