export interface Registro {
  registro_id?: string,
  id_cliente: string,
  nombre_cliente: string,
  id_documento: string,
  titulo_documento: string,
  imagen: string,
  tipo_de_adquisicion: string,
  cantidad: number,
  activo: boolean,
}