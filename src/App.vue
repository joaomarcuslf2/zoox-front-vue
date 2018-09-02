<template>
  <section id="app" class="hero is-medium is-fullheight">
    <div class="hero-head">
      <Navbar />
    </div>

    <div class="hero-body">
      <div class="container has-text-centered">
        <router-view/>
      </div>
    </div>

    <div class="hero-foot">
      <Footer />
    </div>
  </section>
</template>

<style>
@import '../node_modules/bulma/css/bulma.css';
.hero-body {
  margin-top: 20px;
}
</style>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    Footer,
  },
};
</script>
