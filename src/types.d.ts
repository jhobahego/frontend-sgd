export type ApiErrorMessage = { detail: string }

export interface UpdateResponse {
  user: RegisterUser,
  message: string
}

export interface DeleteResponse {
  status: boolean,
  message: string
}
