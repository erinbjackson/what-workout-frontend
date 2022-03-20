import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// import Vue from "vue";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// // // Import Bootstrap an BootstrapVue CSS files (order is important)
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

// // // Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue);
// // // Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin);

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

createApp(App).use(router).mount("#app");
