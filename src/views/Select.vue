<!-- <script>
/*global Vue, VueSelect.VueSelect*/
Vue.component("v-select", VueSelect.VueSelect);

export default {
  el: "#app",
  data() {
    return {
      fruits: ["Mangoo", "Apple", "Orange", "Melon", "Pineapple", "Lecy", "Blueberry"],
    };
  },
};
</script>

<template>
  <div id="app" class="root">
    <h3>Learn Vue-select</h3>
    <v-select v-bind:key="fruits" :options="fruits" label="pick a fruit"></v-select>
  </div>
</template>

(html comment removed: Add "scoped" attribute to limit CSS to this component only )
<style scoped>
.root {
  margin: 0 auto;
  max-width: 600px;
}
</style> -->
