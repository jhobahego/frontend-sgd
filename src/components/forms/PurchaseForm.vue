<template>
  <article class="form__card">
    <figure class="img__container">
      <img class="document__img" :src="documento.imagen" :alt="documento.titulo" />
    </figure>

    <div class="form__container">
      <header class="document__info">
        <h3 class="document__title">{{ documento.titulo }}</h3>
        <p class="document__description">Quedan {{ documento.stock }} unidades</p>
        <p class="document__description">precio: {{ documento.precio }}$</p>
      </header>
      <form class="form__body">

        <input class="form__email" type="text" placeholder="Correo electronico..." v-model="solicitud.correo">
        <input class="form__quantity" type="number" placeholder="Cantidad..." v-model="solicitud.cantidad">
        <select class="form__select" v-model="solicitud.opcion">
          <option value="compra">compra</option>
          <option value="prestamo">prestamo</option>
        </select>

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
import { adquirirDocumento } from '@/services/Purchase';
import { notify } from '@kyvg/vue3-notification';
import { useAuth } from '@/store/authStore';
import SubmitBtn from '@/components/botones/SubmitBtn.vue'
import CancelBtn from '@/components/botones/CancelBtn.vue'

export default defineComponent({
  name: "purchaseForm",

  data() {
    return {
      solicitud: {} as Solicitud,
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

<style>
@import url(purchase.css);
</style>