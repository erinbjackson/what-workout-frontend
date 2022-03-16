<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Here's Your Workout",
      exercises: {},
      userParams: {},
      params: { target: "" },
      target: "",
      exercise_count: null,
      newWorkoutParams: { exercise_ids: [] },
      show: false,
      // exercise_ids: [],
      errors: [],
      isLoggedIn: !!localStorage.jwt,
      flashMessage: null,
      targets: [
        "abductors",
        "abs",
        "adductors",
        "biceps",
        "calves",
        "cardiovascular system",
        "delts",
        "forearms",
        "glutes",
        "hamstrings",
        "lats",
        "levator scapulae",
        "pectorals",
        "quads",
        "serratus anterior",
        "spine",
        "traps",
        "triceps",
        "upper back",
      ],

      watch: {
        $route: function () {
          this.isLoggedIn = !!localStorage.jwt;
          this.flashMessage = localStorage.flashMessage;
        },
      },
    };
  },
  created: function () {},

  methods: {
    getWorkout: function () {
      axios
        .get(`/exercises`, { params: { target: this.target, exercise_count: this.exercise_count } })
        .then((response) => {
          console.log("here are some exercises", response.data, this.exercises);
          this.exercises = response.data;
          this.exercise_ids = response.data;

          for (let i = 0; i < this.exercises.length; i++) {
            this.newWorkoutParams.exercise_ids.push(this.exercises[i].id);
          }
          console.log("workout params", this.newWorkoutParams);
          console.log("here's your exercise IDs", this.exercise_ids);
          //
        });
    },
  },
};
</script>

<template>
  <div class="exercises">
    <h1>What Workout?</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
    </p>
    <div class="get-workout">
      <h2>Quick Workout</h2>
      <p>
        Just want a quick workout you aren't gonna save? Just enter the muscle group and number of exercises and you can
        start your workout! Be sure to sign in if you want to have the option to save your workout.
      </p>
      <form ref="formSave" @submit="submitForm" v-on:submit.prevent="getWorkout">
        <label for="target">Choose a Muscle Group</label><br>
        <select v-model="target">
          <option v-for="target in targets" v-bind:key="target">
            {{ target }}
          </option>
        </select>
        <br />
        <!-- <input type="text" v-model="target" placeholder="Muscle Group" />
        <br /> -->

        <input type="integer" v-model="exercise_count" placeholder="Number of Exercises" />

        <br />
        <input v-on:click="show = true" type="submit" value="Get A Workout" />
        <p v-if="show">If you don't like these exercises, just try again.</p>
      </form>
    </div>
    <br />
    <div v-if="show">
      <h3>{{ message }}</h3>
      Muscle Group: {{ target }}
      <br />
      <br />
      <div v-for="exercise in exercises" v-bind:key="exercise">
        <br />
        <img v-bind:src="exercise.gifUrl" />
        <br />
        # {{ exercise.id }}
        <br />
        Exercise Name: {{ exercise.name }}
        <br />
        Equipment: {{ exercise.equipment }}
        <br />
        Bodypart: {{ exercise.bodyPart }}
        <br />
        Target Muscle: {{ exercise.target }}
      </div>
      <div v-if="!isLoggedIn" class="signup-link">
        <h4>Want to save a workout? Sign up for an account and save your workouts</h4>
        <router-link to="/signup"><button>Create Account</button></router-link>
      </div>
    </div>
  </div>
</template>

<style></style>
