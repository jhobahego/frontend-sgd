import { LoginUser, RegisterUser, UserResponse } from '@/interfaces/User'
import { autenticarUsuario, obtenerUsuarioAutenticado, registrarUsuario } from '@/services/AuthService'
import { defineStore } from 'pinia'
import { useRecord } from './recordsStore'

export const useAuth = defineStore("auth", {
  state: () => {
    return {
      token: "",
      usuario: {} as UserResponse,
      hasError: false,
      // loading: false,
      rol: ""
    }
  },
  actions: {
    async register(usuario: RegisterUser) {
      try {
        const { data } = await registrarUsuario(usuario);

        this.usuario = data;
      } catch (error) {
        this.hasError = true;
      }
    },

    async login(usuario: LoginUser) {
      try {
        const { data } = await autenticarUsuario(usuario);

        this.token = data.access_token;
      } catch (error) {
        this.hasError = true;
      }
    },
    
    async profile() {
      if (this.token.length === 0) return;

      try {
        const { data } = await obtenerUsuarioAutenticado();

        this.rol = data.rol;
        this.usuario = data;
      } catch (error) {
        this.hasError = true;
      }
    },
    logout() {
      const recordStore = useRecord();
      recordStore.registros = [];

      this.rol = "";
      this.token = "";
      this.hasError = false;
      this.usuario = {} as UserResponse;
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ["token", "usuario", "rol"]
  }
})
