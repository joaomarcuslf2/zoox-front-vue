<template>
  <div id="loading" v-if="loading">
    <div class="container">
      <figure class="image is-square is-fullwidth">
        <img src="@/assets/loading.gif">
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: Boolean,
  },
};
</script>

<style scoped>
#loading .image img {
  height: 100vh;
  width: auto;
  margin: 0 auto;
}
</style>
