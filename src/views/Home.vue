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
    <div class="home-hero">
      <b-jumbotron header="WhatWorkout?" lead="Bootstrap v4 Components for Vue.js 2">
        <div class="row align-items-center">
          <div class="col-5">
            <div class="hero-card">
              <b-card title="Card Title" tag="article" class="mb-2">
                <h1>What Workout?</h1>
                <b-card-text class="card-content">
                  Take the guess work out of your workout. If it's leg day, we got some leg moves. Need some ab work?
                  We've got a few hundred exercises. No more thinking about what to do!
                </b-card-text>
                <br />
                <button class="card-content"><a href="#get-started" variant="primary">Get Started</a></button>
              </b-card>
            </div>
          </div>
        </div>
      </b-jumbotron>
    </div>
    <div class="container">
      <section class="padding-t">
        <div class="row align-items-center">
          <div class="col-8 align-items-center">
            <h2>How It Works</h2>
            <p>
              We take the guess work out of what to do for your workout today. Just decide what muscle group you want to
              target, the number of exercises you want, and hit "Get A Workout". Our database will give you a list of
              workouts along with a helpful gif to get you started. If you want to be able to save your workouts for
              future use, be sure to make an account.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div class="cta-bar">
          <button><router-link to="/login">Login</router-link></button>
          <button class="rm-on-mobile"><a href="#get-started">Quick Workout</a></button>
          <button><router-link to="/signup">Sign Up</router-link></button>
        </div>
      </section>
      <section>
        <div class="row center">
          <div class="col-4">
            <div class="get-workout center-mobile" id="get-started">
              <h3>Quick Workout</h3>
              <p>
                Just want a quick workout you aren't gonna save? Just enter the muscle group and number of exercises and
                you can start your workout! Be sure to sign in if you want to have the option to save your workout.
              </p>
            </div>
          </div>
          <div class="col-3 float-right center-mobile">
            <form class="workout-form" ref="formSave" @submit="submitForm" v-on:submit.prevent="getWorkout">
              <label for="target"><h4>Choose a Muscle Group</h4></label>
              <br />
              <select v-model="target">
                <option v-for="target in targets" v-bind:key="target">
                  {{ target }}
                </option>
              </select>
              <br />
              <input type="integer" v-model="exercise_count" placeholder="Number of Exercises" />
              <br />
              <input v-on:click="show = true" type="submit" value="Get A Workout" class="input-button" />
              <p v-if="show" class="small-text center-text">
                If you don't like these exercises,
                <br />
                just try again.
              </p>
            </form>
          </div>
        </div>
      </section>

      <br />
      <div v-if="show">
        <div class="center-text padding-b">
          <h3>{{ message }}</h3>
          <h4>Muscle Group: {{ target }}</h4>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col" v-for="exercise in exercises" v-bind:key="exercise">
            <div class="card h-100">
              <img class="card-img-top exercise-gif" v-bind:src="exercise.gifUrl" />
              <div class="card-body">
                <h5 class="card-title">Exercise Name: {{ exercise.name }}</h5>
                <p class="card-text">
                  Equipment: {{ exercise.equipment }}
                  <br />
                  Bodypart: {{ exercise.bodyPart }}
                  <br />
                  Target Muscle:
                  {{ exercise.target }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isLoggedIn" class="signup-link align-items-center padding-t-b">
          <h4>Want to save a workout?</h4>
          <p>Sign up for an account and save your workouts.</p>
          <button><router-link to="/signup">Create Account</router-link></button>
        </div>
        <div class="padding-t-b center-text other-ops" v-if="!!isLoggedIn">
          <p>
            Want a different workout?
            <br />
            Try some other options:
          </p>
          <button><router-link to="/workoutsort">Multi Sort</router-link></button>
          <button><router-link to="/workoutcreate">Equipment Sort</router-link></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
