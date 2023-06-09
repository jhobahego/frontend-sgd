import { defineStore } from "pinia";
import { obtenerComprasDeUsuario } from "@/services/Purchase";
import { RegisterUser } from "@/interfaces/User";
import { Registro } from "@/interfaces/Registro";

export const useRecord = defineStore("record", {
  state: () => {
    return {
      registros: [] as Registro[],
      error: "",
    }
  },
  actions: {
    async obtenerRegistros(usuario: RegisterUser) {
      const compras = await obtenerComprasDeUsuario(usuario);
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