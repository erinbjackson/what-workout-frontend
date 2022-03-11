<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "View All Your Workouts",
      workouts: [],
    };
  },
  created: function () {
    axios.get("workouts").then((response) => {
      console.log("Here's your workouts", response.data);
      this.workouts = response.data;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="workout in workouts" v-bind:key="workout.id">
      <router-link v-bind:to="`/workouts/me/${workout.id}`">
        <h4>Workout: {{ workout.name }}</h4>
      </router-link>
      <p>Muscle Group: {{ workout.muscle_group }}</p>
    </div>
  </div>
</template>

<style></style>
