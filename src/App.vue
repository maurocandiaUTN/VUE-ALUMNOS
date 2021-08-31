
<template>
  <div>
    <barra-navegacion></barra-navegacion>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
//en el template pongo la etiqueta del componente que se vera en todas las vistas
import MenuSuperiorDeOpciones from "@/components/MenuSuperiorDeOpciones.vue"
//aca pongo el componente que se vera en todas las vistas
export default {
  name: "App",
  components: {
    "barra-navegacion":MenuSuperiorDeOpciones,
  },
};
</script>

