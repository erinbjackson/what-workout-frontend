<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome User",
      user: {},
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
        this.$router.push("/");
      });
    },
  },
};
</script>

<template>
  <div class="user-show">
    <div>
      <h1>{{ message }}</h1>
      <h4>Username: {{ user.name }}</h4>
      <h4>Email: {{ user.email }}</h4>
      <router-link to="/workouts/me"><button>View Workouts</button></router-link>
    </div>
    <hr />
    <div class="user-update">
      <h3>Edit User Account Info</h3>
      <form v-on:submit.prevent="updateUser">
        <input type="text" v-model="user.name" placeholder="Name" />
        <br />
        <input type="email" v-model="user.email" placeholder="Email" />
        <br />
        <input type="submit" value="Update" />
      </form>
      <h3>Close An Account</h3>
      <p>If you no longer want to use What Workout? you can use the button below to delete your account.</p>
      <button v-on:click="destroyUser()">Delete User</button>
    </div>
  </div>
</template>

<style></style>
