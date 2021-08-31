<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item active href="/home">Home</b-nav-item>

        <b-nav-form style="marginLeft: 50px">
          <label style="color: white; marginRight: 15px"> Legajo</label>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
            v-model="buscador1"
          ></b-form-input>
          <b-button variant="primary" v-on:click="buscarPorCodigo()">buscar</b-button>
        </b-nav-form>

        <b-nav-form style="marginLeft: 50px">
          <label style="color: white; marginRight: 15px"> Nombre</label>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
            v-model="buscador2"
          ></b-form-input>
          <b-button variant="primary" v-on:click="buscarPorAlumno()">buscar</b-button>
        </b-nav-form>

        <b-nav-form style="marginLeft: 100px">
          <b-button variant="primary" v-on:click="sacarMejorAlumno()">Mejor Alumno</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "MenuSuperiorDeOpciones",
  components: {},
  mounted() {
    //this.sacarMejorAlumno();
  },
  data() {
    return {
      mejorAlumno: "",
      buscador1: "",
      buscador2: "",
      arrAlumnosComPromedio: [],

      //
    };
  },
  methods: {
    async buscarPorCodigo() {
      this.$router.push(`/home/legajo/${this.buscador1}`);
      window.location.reload();
    },

    async buscarPorAlumno() {
      this.$router.push(`/home/alumno/${this.buscador2}`);
      window.location.reload();
    },


    async sacarMejorAlumno() {

      await fetch(`http:/test/td/alumnos.json`)
        .then((res) => res.json())
        .then((data) => {

          //recorro todos los alumnos
          data.map(alumno =>{

            //acumulo las notas
            var acumulador = 0;
             alumno.notas.map((nota) => {
              acumulador = acumulador + nota;
             });

            //hago un push de un objeto alumno que creo con el promedio sacado a un arr auxiliar de la clase
            this.arrAlumnosComPromedio.push({alumno: alumno, promedio: (acumulador / alumno.notas.length), legajo: alumno.legajo })
            
          });
         
            //ordenar por promedios
             this.arrAlumnosComPromedio.sort((a,b) => b.promedio - a.promedio);
            
            //este if es por un pequeño bug/ si la ruta ya esta en un detalle y le doy
            //al mejor alumno,no redirije y si estoy en el mismo detalle del mejor tampoco anda
            //entonces si el navbar esta en un detalle, que el reload sea solo desde el detalle a un detalle.
            //si se hace reload de forma general, al entrar en un detalle desde el home, queda en un bucle de reload
            if(this.$route.params.id){
              //redirijo con la pos 0 que es el objeto con mejor promedio( ya estan ordenado en desc)
             this.$router.push(`/detalle/${this.arrAlumnosComPromedio[0].legajo}`);
             window.location.reload();
              
            }else{
              //redirijo con la pos 0 que es el objeto con mejor promedio( ya estan ordenado en desc)
             this.$router.push(`/detalle/${this.arrAlumnosComPromedio[0].legajo}`);
            }
        });
    },

  },
};
</script>
