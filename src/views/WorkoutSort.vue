<script>
import axios from "axios";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      show: false,
      exercises: [],
      final_workouts: {},
      no_match: false,
      exercise_count: null,
      equip_arr: [],
      equipment: [
        "assisted",
        "band",
        "barbell",
        "body weight",
        "bosu ball",
        "cable",
        "dumbbell",
        "ez barbell",
        "kettlebell",
        "leverage machine",
        "medicine ball",
        "olympic barbell",
        "resistance band",
        "roller",
        "rope",
        "stability ball",
        "trap bar",
        "weighted",
        "wheel roller",
      ],
      targets: [],
      targets_list: [
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
        "pectorals",
        "quads",
        "spine",
        "traps",
        "triceps",
        "upper back",
      ],
    };
  },
  created: function () {},
  methods: {
    getFilteredWorkout: function () {
      axios
        .get(`/db-exercises-filter`, {
          params: { targets: this.targets, equip_arr: this.equip_arr, exercise_count: this.exercise_count },
        })
        .then((response) => {
          this.final_workouts = response.data;
          if (this.final_workouts.length != 0) {
            this.no_match = false;
            this.show = true;
          } else {
            this.no_match = true;
          }
          console.log("Here is the multifiltered array", this.final_workouts);
        });
      // Need to figure out how I'm getting the data from the front end, to the backend and back to the front end. Should be similar to workoutcreate.
    },
  },
};
</script>

<!-- Vue component -->
<template>
  <div class="container">
    <div class="container sort-page padding-t">
      <div class="sort-page row col-5">
        <h1>Milti-Sort Workout</h1>
        <p class="center-text">
          Choose the muscles you want to target, the equipment you have on hand, number of exercises, and hit "Get
          Workout"!
        </p>
        <form v-on:submit.prevent="getFilteredWorkout">
          <div>
            <p>Choose Your Muscle Group</p>
            <multiselect v-model="targets" :options="targets_list" :multiple="true"></multiselect>
          </div>
          <br />

          <div>
            <p>Choose Your Equipment</p>
            <multiselect v-model="equip_arr" :options="equipment" :multiple="true"></multiselect>
          </div>
          <br />
          <p>Number of Exercises</p>
          <input type="integer" class="form-control" v-model="exercise_count" />
          <br />
          <div class="center-text">
            <input class="input-button multisearch-pg" type="submit" value="Get A Workout" />
          </div>
          <p class="center-text padding-b" v-if="show">
            If you don't like these exercises, just click "Get A Workout" again for a new set of exercises.
          </p>
          <p class="center-text padding-b" v-if="no_match">
            There are no exercises that match your muscle / equipment choices. Please change or add more options
          </p>
        </form>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4 padding-b">
      <div class="col" v-for="final_workout in final_workouts" v-bind:key="final_workout.id">
        <div class="card h-100">
          <img v-bind:src="final_workout.gifUrl" class="exercise-gif" width="200" />
          <div class="card-body">
            <h5 class="card-title">Exercise Name: {{ final_workout.name }}</h5>
            <p class="card-text">
              Target: {{ final_workout.target }}
              <br />
              Equipment Needed: {{ final_workout.equipment }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.multiselect {
  width: 45%;
}
</style>
