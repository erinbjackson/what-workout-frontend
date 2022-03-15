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
      exercise_ids: [],
      errors: [],
    };
  },
  created: function () {},
  //after the workouts post, need to get the workout I just created so I can get the workout_id. Then I need to save the workout_id and the exercise id to workout_exercises
  methods: {
    getWorkout: function () {
      axios
        .get(`/exercises`, { params: { target: this.target, exercise_count: this.exercise_count } })
        .then((response) => {
          console.log("here are some exercises", response.data, this.exercises);
          this.exercises = response.data;
          //this.exercise_ids = response.data;

          // write map each exercise_id to array

          for (let i = 0; i < this.exercises.length; i++) {
            this.exercise_ids.push(this.exercises[i].id);
          }
          console.log("here's your ids", this.exercise_ids);
          //
        });
    },
    workoutCreate: function () {
      axios
        .post("/workouts", this.newWorkoutParams, this.exericse_ids)
        .then((response) => {
          console.log("your workout has been saved", response.data);
          this.$router.push("/workouts");
        })

        // axios
        //   .post("/workout_exercises", this.exercises_ids)
        //   .then((response) => {
        //     console.log("your exercises have been saved to workout_exercises", response.data);
        //     this.$router.push("/workout_exercises");
        //   })

        .catch((error) => {
          this.sadStatus = error.response.status;
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="exercises">
    <h3>What do you want to do today?</h3>
    <form v-on:submit.prevent="getWorkout">
      <input type="text" v-model="target" placeholder="Muscle Group" />
      <br />
      <input type="integer" v-model="exercise_count" placeholder="Number of Exercises" />
      <br />
      <input type="submit" value="Get A Workout" />
    </form>
    <br />
    <h3>{{ message }}</h3>
    Muscle Group: {{ target }}
    <br />
    <br />
    <div v-for="exercise in exercises" v-bind:key="exercise">
      {{ exercise.id }}
      Exercise Name: {{ exercise.name }}
      <br />
      <img v-bind:src="exercise.gifUrl" />
      <br />
      Equipment: {{ exercise.equipment }}
      <br />
      Bodypart: {{ exercise.bodyPart }}
      <br />
      Target Muscle: {{ exercise.target }}
    </div>
    <div class="workout-create">
      <h3>Want to Save This Workout?</h3>
      <form v-on:submit.prevent="workoutCreate">
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        <input type="text" v-model="newWorkoutParams.name" placeholder="Name Your Workout" />
        <br />
        <input type="text" v-model="newWorkoutParams.muscle_group" placeholder="Muscle Group" />
        <br />
        <input type="submit" value="Save Workout" />
      </form>
    </div>
  </div>
</template>

<style></style>
