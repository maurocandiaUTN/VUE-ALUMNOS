<template>
  <div style="margin-top: 80px">
    <b-container>

      <b-row>

        <b-col>
          <b-img :src="alumnoEncontrado.foto"></b-img>
        </b-col>

        <b-col style="marginLeft: -500px; marginTop: 50px;">
          <h2 v-if="alumnoEncontrado.estaActivo == true" class="minAltoImg" style="marginTop 50px; font-size: 40px; color: green;">
            {{ alumnoEncontrado.alumno }}
          </h2>

          <h2  v-if="alumnoEncontrado.estaActivo != true" class="minAltoImg" style="marginTop 50px; font-size: 40px; color: red;">
            {{ alumnoEncontrado.alumno }}
          </h2>
        </b-col>

      </b-row>

      <b-row>

        <b-col>

          <h2 class="minAltoImg">Legajo:</h2>

          <h2 class="minAltoImg">Carrera:</h2>

          <h2 class="minAltoImg">Esta Activo:</h2>

          <h2 class="minAltoImg">Fecha nacimiento:</h2>

          <hr />
          <h2 class="minAltoImg">Notas:</h2>

        </b-col>

        <b-col style="marginLeft: -500px">

          <h2 class="minAltoImg">{{ alumnoEncontrado.legajo }}</h2>

          <h2 class="minAltoImg">{{ alumnoEncontrado.carrera }}</h2>

          <h2 v-if="alumnoEncontrado.estaActivo == true" class="minAltoImg" style="marginTop 50px; color: green;" >
            Si
          </h2>
          <h2  v-if="alumnoEncontrado.estaActivo != true" class="minAltoImg" style="marginTop 50px; color: red;" >
            No
          </h2>

          <h2 class="minAltoImg">{{ alumnoEncontrado.fechaNacimiento }}</h2>

          <hr />
          <h2  v-for="(nota,i) in alumnoEncontrado.notas" :key="i"  class="minAltoImg" >
            • {{ nota }}
          </h2>

        </b-col>

      </b-row>

      <b-row> 

        <b-col>
          <hr />
          <h2 class="minAltoImg">Promedio:</h2>
        </b-col>

        <b-col style="marginLeft: -500px;">
          <hr />
          <h2 class="minAltoImg">{{ promedio }}</h2>
        </b-col>

      </b-row>

      <b-row>

        <b-col>
          <hr />

          <b-button href="/home" variant="primary">VOLVER</b-button>
        </b-col>

      </b-row>

    </b-container>
  </div>
</template>



<script>
export default {
  name: "Detalle",
  components: {},
  mounted() {
    this.getPaisXName();
    
  },
  data() {
    return {
      alumnoEncontrado: [],
      promedio: 0,
    };
  },
  methods: {
    async getPaisXName() {
      const parametroId = this.$route.params.id;
      await fetch(`http:/test/td/alumnos.json`)
        .then((res) => res.json())
        .then((data) => {
          data.map((alumno) => {
            if (alumno.legajo == parametroId) {
              this.alumnoEncontrado = alumno;
              //reutilizo el array en la pos 0 para guardar el promedio
              this.promedio = this.sacarPromedio(this.alumnoEncontrado.notas);
            }
          });
        });
    },
    sacarPromedio(arrNotas) {
      var acumulador = 0;
      arrNotas.map((nota) => {
        acumulador += nota;
      });

      return acumulador / arrNotas.length;
    },
  },
};
</script>


<style scoped>
.minAltoImg {
  font-family: Helvetica;
  font-size: 25px;
}
.h1 {
  font-size: 15px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>