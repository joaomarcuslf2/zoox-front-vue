<template>
  <div id="error-notification" class="notification is-danger">
    <strong>{{errorObj.error}}</strong>

    <p>
      {{errorObj.message}}
    </p>

    <div v-if="errorObj.invalidFields">
      Campos inválidos:
      <ul v-for="fields in errorObj.invalidFields" v-bind:key="fields">
        <li>{{fields}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorNotification',
  props: {
    errorObj: Object,
    onPressDelete: Function,
  },
};
</script>

<style scoped>
#error-notification {
  position: fixed;
  max-height: 300px;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 50;
}
</style>
