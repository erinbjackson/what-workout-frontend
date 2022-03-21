<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome User",
      user: {},
      show: false,
    };
  },
  created: function () {
    axios.get(`/users/me`).then((response) => {
      console.log("show user", response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function () {
      axios
        .patch("/users/me", this.user)
        .then((response) => {
          console.log("success", response.data);
          this.$router.push("/users/me");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    destroyUser: function () {
      axios.delete(`/users/me`).then((response) => {
        console.log("Account deleted", response.data);
        this.show = true;

        setTimeout(() => {
          localStorage.removeItem("jwt");
          this.$router.push("/");
        }, 2000);
      });
    },
  },
};
</script>

<template>
  <div class="container this-user-show padding-t">
    <div class="myuserspage col-4">
      <div>
        <h1>{{ message }}</h1>
        <h4>Username: {{ user.name }}</h4>
        <h4>Email: {{ user.email }}</h4>
        <button><router-link to="/workouts/me">View Workouts</router-link></button>
      </div>

      <hr />
      <div class="user-update padding-t-b">
        <h3>Edit User Account Info</h3>
        <form v-on:submit.prevent="updateUser">
          <input class="form-control" type="text" v-model="user.name" placeholder="Name" />
          <br />
          <input class="form-control" type="email" v-model="user.email" placeholder="Email" />
          <br />
          <input class="form-control input-button wide" type="submit" value="Update" />
        </form>

        <hr />
        <h3>Close An Account</h3>
        <p>If you no longer want to use What Workout? you can use the button below to delete your account.</p>
        <button v-on:click="destroyUser()">Delete User</button>
        <p v-if="show">Your account has been deleted.</p>
      </div>
    </div>
  </div>
</template>

<style></style>
