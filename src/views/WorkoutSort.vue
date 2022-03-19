<script>
import axios from "axios";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      exercises: [],
      selected: null,
      options: ["kettle bell", "barbell", "band", "bodyweight", "b", "c"],
    };
  },
  created: function () {
    axios.get("/db-exercises").then((response) => {
      console.log("here's the big array", response.data);
      this.exercises = response.data;
    });
  },
  methods: {},
};
</script>

<!-- Vue component -->
<template>
  <div>
    <div>
      <p>Please Choose Some Options:</p>
      <div>
        <multiselect v-model="selected" :options="options" :multiple="true"></multiselect>
      </div>
      These are my: {{ selected }}
    </div>

    <div v-for="exercise in exercises" v-bind:key="exercise.id">
      <b>Exercise Name: {{ exercise.name }}</b>
      <br />
      Target: {{ exercise.target }}
      <br />
      Equipment Needed: {{ exercise.equipment }}
      <br />
      <img v-bind:src="exercise.gifUrl" width="200" />

      <br />
      <br />
    </div>
  </div>
</template>
<!-- <style src="/vue-multiselect/dist/vue-multiselect.min.css"></style> -->
