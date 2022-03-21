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
      <router-link to="/" class="navbar-brand workout">What Workout?</router-link>
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
          <router-link v-if="!isLoggedIn" to="/signup" class="nav-link workout" aria-current="page">Signup</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link workout">Login</router-link>
          <router-link v-if="!!isLoggedIn" to="/logout" class="nav-link workout">Logout</router-link>
          <router-link v-if="!!isLoggedIn" to="/users/me" class="nav-link workout">View Account</router-link>
          <router-link v-if="!!isLoggedIn" to="/workouts/me" class="nav-link workout">My Workouts</router-link>
          <router-link v-if="!!isLoggedIn" to="/workoutcreate" class="nav-link workout">New workout</router-link>
          <router-link v-if="!!isLoggedIn" to="/workoutsort" class="nav-link workout">Exercise Filter</router-link>
        </div>
        <div class="right-nav-item">
          <router-link to="/workoutsort" class="nav-link workout btn float-end">Quick Workout</router-link>
        </div>
      </div>
    </div>
  </nav>

  <router-view />

  <footer>
    <div class="row align-items-center">
      <div class="col-3 rm-on-mobile">
        <button><router-link to="/workouts/me" class="footer-link">My Workouts</router-link></button>
      </div>
      <div class="col-6">
        <h4>- What Workout? -</h4>
      </div>
      <div class="col-3">
        <a href="https://github.com/erinbjackson" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
        <a href="https://www.linkedin.com/in/erin-jackson-pdx/" target="_blank">
          <i class="fa fa-brands fa-linkedin"></i>
        </a>
        <a href="mailto:erinebjackson@gmail.com" target="_blank"><i class="fa fa-solid fa-envelope"></i></a>
      </div>
    </div>
  </footer>
</template>

<style></style>
