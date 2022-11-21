<template>
  <div class="container-fluid p-0">
    <nav class="p-4 d-flex align-items-center bg-light shadow-sm">
      <div class="brand me-auto">
        <router-link to="/">
          <h2 class="text-dark">DantownBot</h2>
        </router-link>
      </div>
      <div class="menu">
        <router-link to="/">Home</router-link> |
        <router-link to="/tags">Tags</router-link> |
        <router-link to="/users">Users</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </nav>
    <div class="">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
