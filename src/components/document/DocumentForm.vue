<template>
  <form class="form__create" @submit.prevent="guardarDocumento()" enctype="multipart/form-data">

    <label>tipo de documento
    </label>
    <select v-model="documento.tipo_documento">
      <option value="fisico">fisico</option>
      <option value="digital">digital</option>
    </select>

    <label>autor</label>
    <input type="text" placeholder="Robert C. Martin, Ana Lopez..." v-model="documento.autor">

    <label>titulo</label>
    <input type="text" placeholder="Clean code, the pragmatic programmer..." v-model="documento.titulo">

    <label>descripcion</label>
    <input type="text" placeholder="A Handbook of Agile Software..." v-model="documento.descripcion">

    <label>categoria</label>
    <select name="categoria" v-model="documento.categoria">
      <option value="desarrollo de software">desarrollo de software</option>
      <option value="romantico">romantico</option>
      <option value="contaduria">contaduria</option>
      <option value="deportes">deportes</option>
      <option value="comics">comics</option>
      <option value="anime">anime</option>
    </select>

    <label>stock</label>
    <input type="number" v-model="documento.stock">

    <label>precio</label>
    <input type="number" v-model="documento.precio">

    <label>editorial</label>
    <input type="text" placeholder="Betulia SAS, Bogota-editoriales..." v-model="documento.editorial">

    <label>idiomas</label>
    <input type="text" placeholder="Ingles, Español, Portugues..." v-model="documento.idioma">

    <label>paginas</label>
    <input type="number" v-model="documento.paginas">

    <label>imagen</label>
    <input type="file" @change="handleFile">

    <button type="submit">agregar documento</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Document } from '@/interfaces/Document';

export default defineComponent({
  name: "DocumentForm",
  data() {
    return {
      documento: {} as Document,
      imagen: {} as File,
    }
  },
  methods: {
    guardarDocumento() {
      const form = new FormData();
      form.append("tipo_documento", this.documento.tipo_documento)
      form.append("autor", this.documento.autor)
      form.append("titulo", this.documento.titulo)
      form.append("descripcion", this.documento.descripcion)
      form.append("categoria", this.documento.categoria)
      form.append("stock", this.documento.stock.toString())
      form.append("precio", this.documento.precio.toString())
      form.append("editorial", this.documento.editorial)
      form.append("idioma", this.documento.idioma)
      form.append("paginas", this.documento.paginas.toString())
      form.append("imagen", this.imagen)
    },

    handleFile(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files?.[0];
      if (file) {
        console.log(file)
        this.imagen = file;
      }
    },
  }
})
</script>

<style scoped>
.form__create {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font: inherit;
  padding: 1.2em;
  margin: 0 auto;
}

label {
  width: 90%;
}

input,
select {
  width: 90%;
  margin-bottom: .6em;
}
</style>