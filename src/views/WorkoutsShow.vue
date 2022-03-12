<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Here is your workout! ",
      workout_exercises: {},
      workout: {},
    };
  },
  created: function () {
    console.log(this.$route.params.id);
    axios.get(`/workouts/me/${this.$route.params.id}`).then((response) => {
      console.log("Here is your workout", response.data.workout_exercises);
      this.workout_exercises = response.data.workout_exercises;
      this.workout = response.data;
    });
  },
  methods: {
    workoutsDestroy: function () {
      axios.delete(`workouts/me/${this.$route.params.id}`).then((response) => {
        console.log("Your workout has been deleted", response.data);
        this.$router.push("/workouts/me");
      });
    },
  },
};
//workout_exercises
</script>

<template>
  <div class="workout-show">
    <div>
      <h1>{{ message }}</h1>

      <p>
        Workout Name: {{ workout.name }}
        <br />
        Muscle Group: {{ workout.muscle_group }}
      </p>
      <div v-for="exercise in workout_exercises" v-bind:key="exercise.id">
        <b>Exercise Name: {{ exercise.exercise.name }}</b>
        <br />
        Target: {{ exercise.exercise.bodyPart }}
        <br />
        Equipment Needed: {{ exercise.exercise.equipment }}
        <br />
        <img v-bind:src="exercise.exercise.gifUrl" width="200" />

        <br />
        <br />

        <!-- <p v-for="workout_exercise in workout_exercises" v-bind:key="workout_exercise.id">
        {{ workout_exercise.name }}
      </p> -->
      </div>
      <div>
        <p>Want to delete this workout?</p>
        <button v-on:click="workoutsDestroy()">Delete Workout</button>
      </div>
    </div>
  </div>
</template>

<style>
.workout-show {
  text-transform: capitalize;
}
</style>
