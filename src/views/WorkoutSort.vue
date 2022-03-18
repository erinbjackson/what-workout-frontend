<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      exercises: [],
    };
  },
  created: function () {
    axios.get("/db-exercises").then((response) => {
      console.log("here's the big array", response.data);
      this.exercises = response.data;
    });
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },
  },
};
</script>

<!-- Vue component -->
<template>
  <div>
    <div>
      <div>
        <p></p>
        <div v-for="exercise in exercises" v-bind:key="exercise.id">
          <b>Exercise Name: {{ exercise.name }}</b>
          <br />
          Target: {{ exercise.bodyPart }}
          <br />
          Equipment Needed: {{ exercise.equipment }}
          <br />
          <img v-bind:src="exercise.gifUrl" width="200" />

          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
