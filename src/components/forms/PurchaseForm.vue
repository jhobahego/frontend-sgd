<template>
  <article class="form__card">
    <figure class="img__container">
      <img class="document__img" :src="documento.imagen" :alt="documento.titulo" />
    </figure>

    <div class="purchaseform__container">
      <header class="purchaseform__info">
        <h3 class="purchaseform__title">{{ documento.titulo }}</h3>
        <p class="purchaseform__description">Quedan {{ documento.stock }} unidades</p>
        <p class="purchaseform__description">precio: {{ documento.precio }}$</p>
      </header>
      <form class="form__body">
        <label>
          Digita tu correo:
          <input class="form__email" type="text" placeholder="correo@correo.com" v-model="solicitud.correo">
        </label>
        <label>
          cantidad:
          <input class="form__quantity" type="number" placeholder="12" v-model="solicitud.cantidad">
        </label>
        <label>
          tipo de adquisición:
          <select class="form__select" v-model="solicitud.opcion">
            <option value="compra">compra</option>
            <option value="prestamo">prestamo</option>
          </select>
        </label>

        <div class="buttons">
          <SubmitBtn title="Adquirir" :action="comprar" />
          <CancelBtn text="Cancelar" :redirect="{ name: 'documentDetail', params: { id: documento._id } }" />
        </div>
      </form>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Documento } from '@/interfaces/Documento';
import { Solicitud } from '@/interfaces/Solicitud';
import { adquirirDocumento } from '@/services/PurchaseService';
import { notify } from '@kyvg/vue3-notification';
import { useAuth } from '@/store/authStore';
import SubmitBtn from '@/components/botones/SubmitBtn.vue'
import CancelBtn from '@/components/botones/CancelBtn.vue'

export default defineComponent({
  name: "purchaseForm",

  data() {
    return {
      solicitud: {
        opcion: "compra",
      } as Solicitud,
    }
  },

  props: {
    documento: {
      type: Object as () => Documento,
      required: true
    },
  },

  components: {
    SubmitBtn,
    CancelBtn
  },

  methods: {
    async comprar() {
      const respuesta = await adquirirDocumento(this.documento, this.solicitud);
      const { canBuy: exito, message } = respuesta;

      console.log(respuesta);
      if (!exito) {
        notify({
          title: "Fallo al adquirir",
          text: message,
          type: "error",
          duration: 3000,
        })
        return;
      }
      notify({
        title: "Transacción existosa",
        text: message,
        type: "success",
        duration: 3000,
      })
      setTimeout(() => {
        this.$router.push(`/documentos`)
      }, 3000)
    },

    async obtenerUsuario() {
      const store = useAuth();

      this.solicitud.cliente = store.usuario;
    },
  },

  created() {
    this.obtenerUsuario();
  },
})
</script>

<style scoped>
@import url(purchase.css);
</style>@/services/PurchaseService