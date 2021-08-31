<template>
  <div class="productos">
    <b-container fluid>
      <table class="table mt-5">
        <thead>
          <tr>
            <th>
              Alumno
              <p></p>
              <p></p>
            </th>
            <th>
              Legajo
              <p></p>
              <p></p>
            </th>
            <th>
              Fecha Nacimiento
              <p></p>
              <p></p>
            </th>
            <th>
              Promedio Notas
            </th>
            <th>
              Detalle
              <p></p>
              <p></p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(alumno,i) in this.alumnosData" :key="i">
            <td>{{alumno.alumno}}</td>
            <td>{{alumno.legajo}}</td>
            <td>{{alumno.fechaNacimiento}}</td>
            <td>{{sacarPromedio(alumno.notas)}}</td>

            <td>
              <a :href="'/detalle/'+alumno.legajo"> Ver Detalle </a>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
  </div>
</template>


<script>
import MenuSuperiorDeOpciones from "@/components/MenuSuperiorDeOpciones";

export default {
  name: "Home",
  components: {
    MenuSuperiorDeOpciones,
  },
  //mounted es como un constructor, cuando se intancie va a llamar a getInstrumentos
  mounted() {
    this.getPaises();
    //console.log(this.zodiacoData)
  },
  computed: {},
  data() {
    return {
      alumnosData: [],
    };
  },

  methods: {
    async getPaises() {
      const parametroCode = this.$route.params.code;
      const parametroAlum = this.$route.params.alum;
      if (!parametroCode && !parametroAlum) {
        await fetch(`http:/test/td/alumnos.json`)
          .then((res) => res.json())
          .then((data) => {
            this.alumnosData = data;
          });
      }

      if (parametroCode) {
        await fetch(`http:/test/td/alumnos.json`)
          .then((res) => res.json())
          .then((data) => {
            data.map((alumno) => {
              if (alumno.legajo == parametroCode) {
                this.alumnosData.push(alumno);
              }
            });

            //alerta
            if(this.alumnosData.length == 0){
              alert('no hay alumnos con ese legajo');
              this.$router.push(`/home`);
              window.location.reload();
            }

          });
      }

      if (parametroAlum) {
        await fetch(`http:/test/td/alumnos.json`)
          .then((res) => res.json())
          .then((data) => {
            data.map((alumno) => {
              var encontrado = alumno.alumno
                .toLowerCase()
                .indexOf(parametroAlum.toLowerCase());

              if (encontrado != -1) {
                this.alumnosData.push(alumno);
              }
            });

            //alerta
            if(this.alumnosData.length == 0){
              alert('no hay alumnos con ese nombre');
              this.$router.push(`/home`);
              window.location.reload();
            }


          });
      }
    },
    sacarPromedio(arrNotas) {
      var acumulador = 0;
      arrNotas.map((nota) => {
        acumulador += nota;
      });

      return acumulador / arrNotas.length;
    },
  },

  //
};
</script>