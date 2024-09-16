<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/room-list">Rooms</router-link>
    </nav>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
a {
  padding: 0.5em;
  margin-right: 1em;
  background-color: rgb(168, 255, 241);
  border-radius: 4px;
  text-decoration: none;
  color: black;
}
nav a {
  background-color: rgb(248, 248, 248);
  border-radius: 0px;
}
#app{
  margin: 2em;
  max-width: 1100px;
}
#main a {
  font-size: larger;
}
</style>
