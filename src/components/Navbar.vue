<template>
  <nav id="navbar" class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item has-dropdown is-hoverable">
          <h2 class="subtitle has-text-centered">
            <a href="https://github.com/joaomarcuslf">@joaomarcuslf</a>
          </h2>
        </a>
        <span class="navbar-burger burger" data-target="navbarMenuHeroA" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenuHeroA" class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-end">
          <router-link class="navbar-item" to="/">Estados</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return { showNav: false };
  },
};
</script>

<style scoped>
#navbar {
  background-color: #272727;
}
</style>
