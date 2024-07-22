<template>
  <div id="app">
    <h1>Welcome to the Clothing App</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/upload">Upload Clothing</router-link>
    </nav>
    <router-view /> <!-- This is where routed components are displayed -->
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
}
</style>
