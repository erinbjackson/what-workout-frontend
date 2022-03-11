<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "What Workout? ",
      exercises: [],
      userParams: {},
    };
  },
  created: function () {
    axios.get(`/exercises`).then((response) => {
      console.log("here are some exercises", response.data);
      this.exercises = response.data;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<style></style>
