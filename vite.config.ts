import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo (development/production)
  const env = loadEnv(mode, process.cwd())
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions:
        ['.mjs', '.js', '.ts', '.jsx', 'tsx', '.json', '.vue']
    },
    // Puedes exponer las variables de entorno aquí si necesitas más control
    define: {
      'process.env': env
    }
  }
})