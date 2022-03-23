<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log("test data", response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup-page container padding-t">
    <div class="signup col-4">
      <div>
        <form v-on:submit.prevent="submit()">
          <h1>Signup</h1>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
          <div>
            <input class="form-control" type="text" placeholder="Name" v-model="newUserParams.name" />
          </div>
          <div>
            <input class="form-control" type="email" placeholder="Email" v-model="newUserParams.email" />
          </div>
          <div>
            <input class="form-control" type="password" placeholder="Password" v-model="newUserParams.password" />
          </div>
          <div>
            <input
              class="form-control"
              type="password"
              placeholder="Password Confirmation"
              v-model="newUserParams.password_confirmation"
            />
          </div>
          <input class="input-button wide form-control" type="submit" value="Submit" />
        </form>
        <br />
        <p class="center-text">
          Have an account?
          <br />
          <router-link to="/login">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
