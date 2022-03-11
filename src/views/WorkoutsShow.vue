<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Here is your workout! ",
      workout_exercises: {},
    };
  },
  created: function () {
    axios.get(`/workouts/${this.$route.params.id}`).then((response) => {
      console.log("Here is your workout", response.data);
      this.workout_exercises = response.data;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="workout-show">
    <h1>{{ message }}</h1>
    <p>This is my test data</p>
    <!-- <h4>{{ workout.name }}</h4>
    <p>{{ workout.muscle_group }}</p> -->
    <!-- <p>{{ workout.workout_exercises }}</p> 
     <div>
    <p>{{ workout.workout_exercises[0]["exercise"]["name"] }}</p> 
      <p v-for="exercise in workout_exercises.exercises" v-bind:key="exercise.id">{{ exercise["bodypart"] }}</p>
    </div> -->
    <!-- <p v-for="workout_exercise in workout_exercises" v-bind:key="workout_exercises">
      {{ workout_exercises }}
    </p> -->
    <div v-for="workout_exercise in workout_exercises" v-bind:key="workout_exercise.id">
      {{ workout.workout_exercises[0]["exercise"]["name"] }}
      <!-- {{ exercise.name }} -->
    </div>
  </div>
</template>

<style></style>
