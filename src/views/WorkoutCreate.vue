<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Here's Your Workout",
      exercises: {},
      userParams: {},
      // params: { target: "" }, I think I can remove this
      target: "",
      equipment: "",
      exercise_count: null,
      newWorkoutParams: { exercise_ids: [] },
      show: false,
      showequip: false,
      saved: false,
      visible: true,
      showMuscle: false,
      showEquipment: false,
      errors: [],
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
      equipments: [
        "assisted",
        "band",
        "barbell",
        "dumbbell",
        "cable",
        "bosu ball",
        "body weight",
        "barbell",
        "elliptical machine",
        "ez barbell",
        "hammer",
        "kettlebell",
        "leverage machine",
        "medicine ball",
        "olympic barbell",
        "resistance band",
        "roller",
        "rope",
        "skierg machine",
        "sled machine",
        "smith machine",
        "stability ball",
        "stationary bike",
        "stepmill machine",
        "tire",
        "trap bar",
        "upper body ergometer",
        "weighted",
        "wheel roller",
      ],
      radioGroup: 1,
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
        });
    },

    getEquipmentWorkout: function () {
      axios
        .get(`/exercises-equipment`, { params: { equipment: this.equipment, exercise_count: this.exercise_count } })
        .then((response) => {
          console.log("here are some exercises", response.data, this.exercises);
          this.exercises = response.data;
          this.exercise_ids = response.data;

          for (let i = 0; i < this.exercises.length; i++) {
            this.newWorkoutParams.exercise_ids.push(this.exercises[i].id);
          }
          console.log("workout params", this.newWorkoutParams);
          console.log("here's your exercise IDs", this.exercise_ids);
        });
    },
    workoutCreate: function () {
      axios
        .post("/workouts/me", this.newWorkoutParams, this.exericse_ids)
        .then((response) => {
          console.log("your workout has been saved", response.data);
          this.visible = false;
        })

        .catch((error) => {
          this.sadStatus = error.response.status;
          this.errors = error.response.data.errors;
        });
    },
    submitForm() {
      // Your form submission
      this.$refs.formSave.reset(); // This will clear that form
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="inner-hero workout-create-hero">
      <b-jumbotron header="WhatWorkout?" lead="Bootstrap v4 Components for Vue.js 2">
        <div class="row align-items-center">
          <div class="col-5">
            <div class="hero-card">
              <b-card title="Card Title" tag="article" class="mb-2">
                <h1>Create A Workout</h1>

                <!-- <button class="card-content"><a href="#get-started" variant="primary">Get Started</a></button> -->
              </b-card>
            </div>
          </div>
        </div>
      </b-jumbotron>
    </div>
  </div>
  <div class="container">
    <div class="workoutcreate-page padding-t" id="findWorkout">
      <div class="row center-text">
        <h2>What do you want to do today?</h2>
        <p class="center-text">You get to choose what you want to base your workout off of:</p>
        <br />
        <div class="row col-12 align-items-center padding-b">
          <div class="col-2"></div>
          <div class="col-4 mob-padding-b-s">
            <button v-on:click="(showMuscle = true), (showEquipment = false)">Muscle Group</button>
          </div>
          <div class="col-4">
            <button v-on:click="(showEquipment = true), (showMuscle = false)">Equipment</button>
          </div>
          <div class="col-2"></div>
        </div>

        <!-- <h4>Workout based on a muscle group</h4> -->
        <div class="col-4 workoutcreate">
          <div v-if="showMuscle" class="muscle-group">
            <form v-on:submit.prevent="getWorkout">
              <p>Choose a Muscle Group</p>
              <select class="form-control" v-model="target">
                <option v-for="target in targets" v-bind:key="target">
                  {{ target }}
                </option>
              </select>

              <input class="form-control" type="integer" v-model="exercise_count" placeholder="Number of Exercises" />

              <input
                class="input-button wide"
                v-on:click="(show = true), (visible = true)"
                type="submit"
                value="Get A Workout"
              />
              <p v-if="show">If you don't like these exercises, just click "Get A Workout" again.</p>
            </form>
          </div>
          <!-- <h4>Workout based on the equipment</h4> -->
          <div v-if="showEquipment" class="equipment">
            <form v-on:submit.prevent="getEquipmentWorkout">
              <p>
                Choose Your Equipment
                <br />
                <span class="small-text">* choose "body weight" if you have no equipment</span>
              </p>

              <select class="form-control" v-model="equipment">
                <option placeholder="equipment" v-for="equipment in equipments" v-bind:key="equipment">
                  {{ equipment }}
                </option>
              </select>

              <input class="form-control" type="integer" v-model="exercise_count" placeholder="Number of Exercises" />

              <input
                class="input-button wide"
                v-on:click="(showequip = true), (visible = true)"
                type="submit"
                value="Get A Workout"
              />
              <p v-if="showequip">If you don't like these exercises, just click "Get A Workout" again.</p>
            </form>
          </div>
          <br />
        </div>
      </div>
    </div>
    <!-- ---------WORKOUT CARDS --------- -->
    <div class="center-text" v-if="show || showequip">
      <h3>{{ message }}</h3>
      <p v-if="show">Muscle Group: {{ target }}</p>
      <br />
      <br />
      <div class="row row-cols-1 row-cols-md-3 g-4 padding-b">
        <div class="col" v-for="exercise in exercises" v-bind:key="exercise">
          <div class="card h-100">
            <img v-bind:src="exercise.gifUrl" />
            <div class="card-body">
              <h5 class="card-title">Exercise Name: {{ exercise.name }}</h5>

              <p class="card-text">
                Equipment: {{ exercise.equipment }}
                <br />
                Target Muscle: {{ exercise.target }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-4 workoutcreate" v-if="visible">
        <h3>Want to Save This Workout?</h3>
        <form ref="formSave" @submit="submitForm" v-on:submit.prevent="workoutCreate">
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          <input class="form-control" type="text" v-model="newWorkoutParams.name" placeholder="Name Your Workout" />
          <br />
          <input class="form-control" type="text" v-model="newWorkoutParams.muscle_group" placeholder="Muscle Group" />
          <br />
          <input class="input-button wide" v-on:click="saved = true" type="submit" value="Save Workout" />
        </form>
      </div>
      <div class="workout-create padding-b">
        <br />
        <div v-if="saved">
          <p>Your workout has been saved.</p>
          <router-link to="/workouts/me"><button>View All Workouts</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
