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
  <div class="exercises" id="findWorkout">
    <h3>What do you want to do today?</h3>
    You get to choose what you want to base your workout off of:
    <br />
    <button v-on:click="(showMuscle = true), (showEquipment = false)">Muscle Group</button>
    <button v-on:click="(showEquipment = true), (showMuscle = false)">Equipment</button>

    <!-- <h4>Workout based on a muscle group</h4> -->
    <div v-if="showMuscle" class="muscle-group">
      <form v-on:submit.prevent="getWorkout">
        <label for="target">Choose a Muscle Group</label>
        <br />
        <select v-model="target">
          <option v-for="target in targets" v-bind:key="target">
            {{ target }}
          </option>
        </select>
        <br />
        <input type="integer" v-model="exercise_count" placeholder="Number of Exercises" />
        <br />
        <input v-on:click="show = true" type="submit" value="Get A Workout" />
        <p v-if="show">If you don't like these exercises, just click "Get A Workout" again.</p>
      </form>
    </div>
    <!-- <h4>Workout based on the equipment</h4> -->
    <div v-if="showEquipment" class="equipment">
      <form v-on:submit.prevent="getEquipmentWorkout">
        <label for="equipment">Choose Your Equipment</label>
        <br />
        <div>* choose "body weight" if you have no equipment</div>
        <br />
        <select v-model="equipment">
          <option v-for="equipment in equipments" v-bind:key="equipment">
            {{ equipment }}
          </option>
        </select>
        <br />
        <input type="integer" v-model="exercise_count" placeholder="Number of Exercises" />
        <br />
        <input v-on:click="showequip = true" type="submit" value="Get A Workout" />
        <p v-if="showequip">If you don't like these exercises, just click "Get A Workout" again.</p>
      </form>
    </div>
    <br />
    <div v-if="show || showequip">
      <h3>{{ message }}</h3>
      Muscle Group: {{ target }}
      <br />
      <br />
      <div v-for="exercise in exercises" v-bind:key="exercise">
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
      <div class="workout-create">
        <br />
        <div v-if="saved">
          <p>Your workout has been saved.</p>
          <router-link to="/workouts/me"><button>View All Workouts</button></router-link>
        </div>
        <div v-if="visible">
          <h3>Want to Save This Workout?</h3>
          <form ref="formSave" @submit="submitForm" v-on:submit.prevent="workoutCreate">
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            <input type="text" v-model="newWorkoutParams.name" placeholder="Name Your Workout" />
            <br />
            <input type="text" v-model="newWorkoutParams.muscle_group" placeholder="Muscle Group" />
            <br />
            <input v-on:click="saved = true" type="submit" value="Save Workout" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
