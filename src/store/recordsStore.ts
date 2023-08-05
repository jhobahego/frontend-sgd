import { defineStore } from "pinia";
import { obtenerComprasDeUsuario } from "@/services/PurchaseService";
import { Registro } from "@/interfaces/Registro";

export const useRecord = defineStore("record", {
  state: () => {
    return {
      registros: [] as Registro[],
      error: "",
    }
  },
  actions: {
    async obtenerRegistros() {
      try {
        const { data } = await obtenerComprasDeUsuario();

        this.registros = data;
      } catch (error) {
        this.error = "Este usuario no tiene compras";
      }
    }
  },
  persist: {
    storage: localStorage,
    paths: ["registros"]
  }
})