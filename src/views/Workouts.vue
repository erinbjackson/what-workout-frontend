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
    axios.get("workouts/me").then((response) => {
      console.log("Here's your workouts", response.data);
      this.workouts = response.data;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="container workouts-index">
    <div class="index-list padding-t">
      <h1>{{ message }}</h1>
      <section>
        <router-link to="/workoutcreate"><button>Create A Workout</button></router-link>
      </section>
      <div v-for="workout in workouts" v-bind:key="workout.id">
        <div>
          <h4>
            <router-link v-bind:to="`/workouts/me/${workout.id}`">Workout: {{ workout.name }}</router-link>
          </h4>
        </div>
        <p>Muscle Group: {{ workout.muscle_group }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
