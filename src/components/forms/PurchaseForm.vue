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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Document } from '@/interfaces/Document';
import { Solicitud } from '@/interfaces/Solicitud';
import { adquirirDocumento } from '@/services/Purchase';
import { obtenerUsuarioAutenticado } from '@/services/AuthService';

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
        return alert("fallo al comprar");
      }
      alert("compra exitosa")
      return this.$router.push(`/documentos`)
    },

    cancelar() {
      this.$router.push(`/documento/${this.documento._id}`)
    },

    async obtenerUsuario() {
      const usuario = await obtenerUsuarioAutenticado();
      if (usuario) this.solicitud.cliente = usuario
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