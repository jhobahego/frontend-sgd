<template>
  <form class="form__create" @submit.prevent="guardarDocumento()" enctype="multipart/form-data">

    <div class="form__div">
      <label class="label__tipo">tipo de documento

        <select v-model="documento.tipo_documento">
          <option value="fisico">fisico</option>
          <option value="digital">digital</option>
        </select>
      </label>

      <label class="label__categoria">categoria

        <select name="categoria" v-model="documento.categoria">
          <option value="desarrollo de software">desarrollo de software</option>
          <option value="romantico">romantico</option>
          <option value="contaduria">contaduria</option>
          <option value="deportes">deportes</option>
          <option value="comics">comics</option>
          <option value="anime">anime</option>
        </select>
      </label>
    </div>

    <label class="label__autor">autor</label>
    <input class="input__autor" type="text" placeholder="Robert C. Martin, Ana Lopez..." v-model="documento.autor">

    <label class="label__titulo">titulo</label>
    <input class="input__titulo" type="text" placeholder="Clean code, the pragmatic programmer..."
      v-model="documento.titulo">

    <label class="label__descripcion">descripcion</label>
    <input class="input__descripcion" type="text" placeholder="A Handbook of Agile Software..."
      v-model="documento.descripcion">

    <div class="form__div">
      <label class="label__stock">stock

        <input class="input__stock" type="number" v-model="documento.stock">
      </label>

      <label class="label__precio">precio

        <input class="input__precio" type="number" v-model="documento.precio">
      </label>
    </div>

    <label class="label__editorial">editorial</label>
    <input class="input__editorial" type="text" placeholder="Betulia SAS, Bogota-editoriales..."
      v-model="documento.editorial">

    <div class="form__div">
      <label class="label__idiomas">idiomas

        <input class="input__idiomas" type="text" placeholder="Ingles, Español, Portugues..." v-model="documento.idioma">
      </label>

      <label class="label__paginas">paginas

        <input class="input__paginas" type="number" v-model="documento.paginas">
      </label>
    </div>

    <label class="label__imagen">imagen</label>
    <input class="input__imagen" type="file" @change="handleFile">

    <button type="submit">agregar documento</button>
  </form>
  <notifications position="bottom right" animation-type="css" width="500px" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Document } from '@/interfaces/Document';
import { guardarDocumentoEnBD } from '@/services/DocumentService';
import { notify } from '@kyvg/vue3-notification';

export default defineComponent({
  name: "DocumentForm",
  data() {
    return {
      documento: {} as Document,
      imagen: {} as File,
    }
  },
  methods: {
    async guardarDocumento() {
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

      const documento = await guardarDocumentoEnBD(form);
      const id = documento._id;
      if (id) {
        notify({
          title: "Documento guardado",
          text: `El documento ${documento.titulo} se ha guardado correctamente`,
          type: "success",
          duration: 2000,
        })
        setTimeout(() => {
          this.$router.push(`documento/${id}`)
        }, 2000)
      }
    },

    handleFile(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files?.[0];
      if (file) {
        this.imagen = file;
      }
    },
  }
})
</script>

<style scoped>
@import url(documentForm.css);
</style>