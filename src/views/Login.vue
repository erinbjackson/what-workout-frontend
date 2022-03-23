<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/workouts/me");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<template>
  <div class="container login-page padding-t">
    <div class="login col-4">
      <div>
        <form v-on:submit.prevent="submit()">
          <h1>Login</h1>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
          <div>
            <input class="form-control" placeholder="Email" type="email" v-model="newSessionParams.email" />
          </div>
          <div>
            <input class="form-control" placeholder="Password" type="password" v-model="newSessionParams.password" />
          </div>
          <input class="input-button wide" type="submit" value="Submit" />
        </form>
        <br />
        <p class="center-text">
          Need an account?
          <br />
          <router-link to="/signup">Create An Account</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
