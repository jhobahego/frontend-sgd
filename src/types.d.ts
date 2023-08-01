import { Documento } from "./interfaces/Documento"

export interface PurchaseValidationResult {
  canBuy: boolean = false,
  message: string
}

export type TypeWithKey<T> = {[key: number]: T}