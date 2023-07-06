import { Documento } from "./interfaces/Documento"
export type ApiErrorMessage = { detail: string }

type Body = RegisterUser | Documento

export interface ApiResponse {
  success: boolean,
  body: Body,
  message: string
}

export interface DeleteResponse {
  status: boolean,
  message: string
}

export interface PurchaseValidationResult {
  canBuy: boolean = false,
  message: string
}