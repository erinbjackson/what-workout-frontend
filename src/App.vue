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
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link v-if="!isLoggedIn" to="/signup">Signup</router-link>
    |
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    |
    <router-link v-if="!!isLoggedIn" to="/logout">Logout</router-link>
    |
    <router-link v-if="!!isLoggedIn" to="/users/me">View Account</router-link>
    |
    <router-link v-if="!!isLoggedIn" to="/workouts/me">My Workouts</router-link>
    |
    <router-link v-if="!!isLoggedIn" to="/workoutcreate">New Workout</router-link>
    |
    <router-link v-if="!!isLoggedIn" to="/workoutsort">Exercise Filter</router-link>
    |
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
