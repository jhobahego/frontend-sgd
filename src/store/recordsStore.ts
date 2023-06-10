import { defineStore } from "pinia";
import { obtenerComprasDeUsuario } from "@/services/Purchase";
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
      const compras = await obtenerComprasDeUsuario();
      if(compras?.length === 0) {
        this.error = "Este usuario no tiene compras";
        return;
      }
      this.registros = compras;
    }
  },
  persist: {
    storage: localStorage,
    paths: ["registros"]
  }
})