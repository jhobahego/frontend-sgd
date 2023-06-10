import { LoginUser, RegisterUser, Rol } from '@/interfaces/User'
import { autenticarUsuario, obtenerUsuarioAutenticado, registrarUsuario } from '@/services/AuthService'
import { defineStore } from 'pinia'
import { useRecord } from './recordsStore'

export const useAuth = defineStore("auth", {
  state: () => {
    return {
      token: "",
      usuario: {} as RegisterUser,
      error: "",
      // loading: false,
      rol: ""
    }
  },
  actions: {
    async register(usuario: RegisterUser) {
      const datos = await registrarUsuario(usuario);
      if(!datos) {
        this.error = "problema al registrar usuario";
        return;
      }

      this.usuario = datos;
    },

    async login(usuario: LoginUser) {
      const datos = await autenticarUsuario(usuario);
      if(!datos) {
        this.error= "problema al iniciar sesion";
        return;
      }

      this.token = datos.access_token;
    },

    async profile() {
      const datos = await obtenerUsuarioAutenticado(this.token);
      if(!datos) {
        this.error = "problema al obtener el perfil del usuario";
        return;
      }

      this.rol = datos.rol as Rol;
      this.usuario = datos as RegisterUser;
    },
    logout() {
      const recordStore = useRecord();
      recordStore.registros = [];

      this.rol = "";
      this.token = "";
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ["token", "usuario", "rol"]
  }
})
