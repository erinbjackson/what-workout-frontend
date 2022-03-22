<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Here is your workout! ",
      workout_exercises: {},
      exercise: {},
      workout: {},
      show: false,
      visible: true,
      loadMessage: true,
    };
  },
  created: function () {
    console.log(this.$route.params.id);
    axios.get(`/workouts/me/${this.$route.params.id}`).then((response) => {
      console.log("Here is your workout", response.data);
      this.exercises = response.data.exercises;
      this.workout = response.data;
      setTimeout(() => {
        this.loadMessage = false;
      }, 1000);
    });
  },
  methods: {
    workoutsDestroy: function () {
      axios.delete(`workouts/me/${this.$route.params.id}`).then((response) => {
        console.log("Your workout has been deleted", response.data);
        this.show = true;
        this.visible = false;
        setTimeout(() => {
          this.$router.push("/workouts/me");
        }, 2000);
      });
    },
  },
};
//workout_exercises
</script>

<template>
  <div>
    <div>
      <div class="inner-hero workout-show-hero">
        <b-jumbotron header="WhatWorkout?" lead="Bootstrap v4 Components for Vue.js 2">
          <div class="row align-items-center">
            <div class="col-5">
              <div class="hero-card">
                <b-card title="Card Title" tag="article" class="mb-2">
                  <h1>Your Workouts</h1>

                  <!-- <button class="card-content"><a href="#get-started" variant="primary">Get Started</a></button> -->
                </b-card>
              </div>
            </div>
          </div>
        </b-jumbotron>
      </div>
    </div>
    <div class="workout-show container padding-t">
      <h1>{{ message }}</h1>
      <div>
        <div class="center-text padding-b">
          <h3>Workout Name: {{ workout.name }}</h3>
          <h4>Muscle Group: {{ workout.muscle_group }}</h4>
          <p v-if="loadMessage" class="text-fade">Wait for it...</p>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col" v-for="exercise in exercises" v-bind:key="exercise.id">
            <div class="card h-100">
              <img class="exercise-gif" v-bind:src="exercise.gifUrl" width="200" />
              <div class="card-body">
                <h5 class="card-title">Exercise Name: {{ exercise.name }}</h5>
                <p class="card-text">
                  Target Muscle: {{ exercise.target }}
                  <br />
                  Equipment Needed: {{ exercise.equipment }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="delete-workout padding-t-b">
        <div v-if="visible">
          <p>Want to delete this workout?</p>
          <button v-on:click="workoutsDestroy()">Delete Workout</button>
        </div>
        <p v-if="show">Your workout has been deleted.</p>
      </div>
    </div>
  </div>
</template>

<style>
.workout-show {
  text-transform: capitalize;
}
</style>
