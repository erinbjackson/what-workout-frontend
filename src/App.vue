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
<script></script>

<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand workout">
        <img src="/img/new-white-logo.png" width="150" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link v-if="!isLoggedIn" to="/signup" class="nav-link workout">Signup</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!isLoggedIn" to="/login" class="nav-link workout">Login</router-link>
          </li>

          <li class="nav-item">
            <router-link v-if="!!isLoggedIn" to="/workouts/me" class="nav-link workout">My Workouts</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!!isLoggedIn" to="/workoutcreate" class="nav-link workout">New Workout</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/workoutsort" class="nav-link workout">Quick Workout</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!!isLoggedIn" to="/users/me" class="nav-link workout">Account</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!!isLoggedIn" to="/logout" class="nav-link workout">Logout</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <button class="btn btn-outline-success" type="submit">
            <router-link to="/workoutsort">Quick Workout</router-link>
          </button>
        </form>
      </div>
    </div>
  </nav>

  <router-view />

  <footer>
    <div class="row align-items-center">
      <div class="col-3 rm-on-mobile"></div>
      <div class="col-6">
        <img class="footer-logo" src="/img/new-white-logo.png" />
        <!-- <h4>- What Workout? -</h4> -->
        <div>
          <a href="https://github.com/erinbjackson" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
          <a href="https://www.linkedin.com/in/erin-jackson-pdx/" target="_blank">
            <i class="fa fa-brands fa-linkedin"></i>
          </a>
          <a href="mailto:erinebjackson@gmail.com" target="_blank"><i class="fa fa-solid fa-envelope"></i></a>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </footer>
</template>

<style></style>
