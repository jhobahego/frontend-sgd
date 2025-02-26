<template>
  <form class="form__create" enctype="multipart/form-data">

    <div class="form__div">
      <label>
        tipo de documento
        <select class="select__tipo" v-model="documento.tipo_documento">
          <option value="fisico">fisico</option>
          <option value="digital">digital</option>
        </select>
      </label>

      <label class="label__categoria form__label">
        categoria
        <select class="select__categoria" v-model="documento.categoria">
          <option value="desarrollo de software">desarrollo de software</option>
          <option value="romantico">romantico</option>
          <option value="contaduria">contaduria</option>
          <option value="deportes">deportes</option>
          <option value="comics">comics</option>
          <option value="anime">anime</option>
        </select>
      </label>
    </div>

    <label class="form__label">autor</label>
    <input class="form__input" type="text" placeholder="Robert C. Martin, Ana Lopez..." v-model="documento.autor">

    <label class="form__label">titulo</label>
    <input class="form__input" type="text" placeholder="Clean code, the pragmatic programmer..."
      v-model="documento.titulo">

    <label class="form__label">descripcion</label>
    <input class="form__input" type="text" placeholder="A Handbook of Agile Software..." v-model="documento.descripcion">

    <div class="form__div">
      <label>
        stock
        <input class="form__input" type="number" v-model="documento.stock">
      </label>

      <label>
        precio
        <input class="form__input" type="number" v-model="documento.precio">
      </label>
    </div>

    <label class="form__label">editorial</label>
    <input class="form__input" type="text" placeholder="Betulia SAS, Bogota-editoriales..." v-model="documento.editorial">

    <div class="form__div">
      <label>
        idiomas
        <input class="form__input" type="text" placeholder="Ingles, Español, Portugues..." v-model="documento.idioma">
      </label>

      <label>
        paginas
        <input class="form__input" type="number" v-model="documento.paginas">
      </label>
    </div>

    <img class="preview" :src="imagePreview" :alt="imagen?.name || 'Imagen seleccionada'" v-if="imagePreview.length > 0">
    <div class="imagen__div">
      <label class="label__imagen" for="imagen">subir imagen</label>
      <input class="input__imagen" type="file" @change="handleFile" id="imagen">
    </div>

    <div class="buttons__div">
      <SubmitBtn title="Agregar documento" :action="guardarDocumento" />
      <CancelBtn text="Volver" :redirect="{ name: 'AllDocumentsAdmin' }" />
    </div>
  </form>
  <notifications position="bottom right" animation-type="css" width="500px" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Documento } from '@/interfaces/Documento';
import { guardarDocumentoEnBD } from '@/services/DocumentService';
import { notify } from '@kyvg/vue3-notification';
import SubmitBtn from '@/components/botones/SubmitBtn.vue'
import CancelBtn from '@/components/botones/CancelBtn.vue'

export default defineComponent({
  name: "DocumentForm",
  data() {
    return {
      documento: {
        tipo_documento: "digital",
        autor: "",
        titulo: "",
        descripcion: "",
        imagen: "",
        categoria: "desarrollo de software",
        stock: 1,
        precio: 0,
        editorial: "",
        idioma: "",
        paginas: 0
      } as Documento,
      imagen: null as File | null,
      imagePreview: ""
    }
  },
  components: {
    SubmitBtn,
    CancelBtn
  },
  methods: {
    async guardarDocumento() {
      // Validar que todos los campos requeridos estén completos
      if (!this.documento.titulo || !this.documento.autor || !this.documento.descripcion || 
          !this.documento.editorial || !this.documento.idioma || !this.imagen) {
        notify({
          title: "Error",
          text: "Por favor completa todos los campos requeridos, incluyendo la imagen",
          type: "error"
        });
        return;
      }

      try {
        const form = new FormData();
        form.append("tipo_documento", this.documento.tipo_documento);
        form.append("autor", this.documento.autor);
        form.append("titulo", this.documento.titulo);
        form.append("descripcion", this.documento.descripcion);
        form.append("categoria", this.documento.categoria);
        form.append("stock", this.documento.stock.toString());
        form.append("precio", this.documento.precio.toString());
        form.append("editorial", this.documento.editorial);
        form.append("idioma", this.documento.idioma);
        form.append("paginas", this.documento.paginas.toString());
        form.append("imagen", this.imagen);

        const { data } = await guardarDocumentoEnBD(form);
        const id = data._id;

        notify({
          title: "Éxito",
          text: "Documento guardado correctamente",
          type: "success"
        });

        setTimeout(() => {
          this.$router.push(`/documento/${id}`);
        }, 2000);
      } catch (error) {
        console.error("Error al guardar documento:", error);
        notify({
          title: "Error",
          text: "No se pudo guardar el documento. Verifica tu conexión y los datos ingresados.",
          type: "error"
        });
      }
    },

    handleFile(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files?.[0];
      if (file) {
        this.imagen = file;
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.imagePreview = e.target?.result as string;
        }
        reader.readAsDataURL(file);
      } else {
        this.imagen = null;
        this.imagePreview = "";
      }
    },
  }
})
</script>

<style scoped>
@import url(documentForm.css);
</style>