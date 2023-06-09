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
      <form class="form__body" @submit.prevent="comprar()">

        <input class="form__email" type="text" placeholder="Correo electronico..." v-model="solicitud.correo">
        <input class="form__quantity" type="number" placeholder="Cantidad..." v-model="solicitud.cantidad">
        <select class="form__select" v-model="solicitud.opcion">
          <option value="compra">compra</option>
          <option value="prestamo">prestamo</option>
        </select>

        <div class="buttons">
          <button type="submit" class="purchase__btn">adquirir</button>
          <button @click.prevent="cancelar()" class="cancel__btn">Cancelar</button>
        </div>
      </form>
    </div>
  </article>
  <notifications position="bottom right" animation-type="css" width="500px"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Document } from '@/interfaces/Document';
import { Solicitud } from '@/interfaces/Solicitud';
import { adquirirDocumento } from '@/services/Purchase';
import { notify } from '@kyvg/vue3-notification';
import { useAuth } from '@/store/authStore';

export default defineComponent({
  name: "purchaseForm",

  data() {
    return {
      solicitud: {} as Solicitud,
    }
  },

  props: {
    documento: {
      type: Object as () => Document,
      required: true
    },
  },

  methods: {
    async comprar() {
      const documento = await adquirirDocumento(this.documento, this.solicitud);
      if (documento === false) {
        notify({
          title: "Fallo al comprar",
          text: "No se pudo adquirir el documento",
          type: "error",
          duration: 2000,
        })
        return;
      }
      notify({
        title: "Compra exitosa",
        text: "Documento agregado a tu galeria",
        type: "success",
        duration: 2000,
      })
      setTimeout(() => {
        this.$router.push(`/documentos`)
      }, 2000) 
    },

    cancelar() {
      this.$router.push(`/documento/${this.documento._id}`)
    },

    async obtenerUsuario() {
      const store = useAuth();
      await store.profile();

      if (store.$state.usuario) this.solicitud.cliente = store.$state.usuario;
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