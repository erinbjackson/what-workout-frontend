<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
      flashMessage: null,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.flashMessage = localStorage.flashMessage;
    },
  },
  methods: {},
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">What Workout?</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/" class="nav-link workout">Home</router-link>
          <router-link v-if="!isLoggedIn" to="/signup" class="nav-link active" aria-current="page">Signup</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link workout">Login</router-link>
          <router-link v-if="!!isLoggedIn" to="/logout" class="nav-link workout">Logout</router-link>
          <router-link v-if="!!isLoggedIn" to="/users/me" class="nav-link workout">View Account</router-link>
          <router-link v-if="!!isLoggedIn" to="/workouts/me" class="nav-link workout">My Workout</router-link>
          <router-link v-if="!!isLoggedIn" to="/workoutcreate" class="nav-link workout">New workout</router-link>
          <router-link v-if="!!isLoggedIn" to="/workoutsort" class="nav-link workout">Exercise Filter</router-link>
        </div>
        <div class="right-nav-item">
          <router-link v-if="!!isLoggedIn" to="/workoutsort" class="nav-link workout btn float-end">
            Quick Workout
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <router-view />

  <footer>
    <h4>- What Workout? -</h4>
  </footer>
</template>

<style></style>
