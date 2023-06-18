export type ApiErrorMessage = { detail: string }

type Body = RegisterUser | Documento

export interface ApiResponse {
  body: Body,
  message: string
}

export interface DeleteResponse {
  status: boolean,
  message: string
}
