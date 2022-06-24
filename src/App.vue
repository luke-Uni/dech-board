<template>
  <router-view />
</template>

<script>
export default {
  methods: {
    isLoggedIn() {},
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.margin_class {
  margin-left: 30em;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #6dfaff;
}

.router-link_class {
  margin-right: 1em;
}
</style>
