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
      exercise_count: null,
      equip_arr: "",
      equipment: [
        "assisted",
        "band",
        "barbell",
        "dumbbell",
        "cable",
        "bosu ball",
        "body weight",
        "barbell",
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
      targets: "",
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
        "levator scapulae",
        "pectorals",
        "quads",
        "serratus anterior",
        "spine",
        "traps",
        "triceps",
        "upper back",
      ],
    };
  },
  created: function () {
    axios
      .get(`/db-exercises`, {
        params: { targets: this.targets, equip_arr: this.equip_arr, exercise_count: this.exercise_count },
      })
      .then((response) => {
        console.log("here's the big array", response.data);
        this.exercises = response.data;
      });
    // Need to figure out how I'm getting the data from the front end, to the backend and back to the front end. Should be similar to workoutcreate.
  },
  methods: {},
};
</script>

<!-- Vue component -->
<template>
  <div>
    <div>
      <p>Choose Your Equipment</p>
      <form>
        <div>
          <multiselect v-model="equip_arr" :options="equipment" :multiple="true"></multiselect>

          This is my equip_arr: {{ equip_arr }}
        </div>
        <br />
        <div>
          <p>Choose Your Muscle Group</p>
          <multiselect v-model="targets" :options="targets_list" :multiple="true"></multiselect>
          These are my targets array: {{ targets }}
        </div>
        <input type="integer" v-model="exercise_count" placeholder="Number of Exercises" />
        <br />
        <input v-on:click="show = true" type="submit" value="Get A Workout" />
        <p v-if="show">If you don't like these exercises, just click "Get A Workout" again.</p>
      </form>
    </div>

    <div v-for="exercise in exercises" v-bind:key="exercise.id">
      <b>Exercise Name: {{ exercise.name }}</b>
      <br />
      Target: {{ exercise.target }}
      <br />
      Equipment Needed: {{ exercise.equipment }}
      <br />
      <img v-bind:src="exercise.gifUrl" width="200" />

      <br />
      <br />
    </div>
  </div>
</template>
<style>
.multiselect {
  width: 45%;
}
</style>
