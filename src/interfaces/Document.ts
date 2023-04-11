export interface Document {
  _id?: string,
  tipo_documento: string,
  autor: string,
  descripcion: string,
  stock: number,
  precio: number,
  categoria: string,
  editorial: string,
  idioma: string,
  paginas: number,
}