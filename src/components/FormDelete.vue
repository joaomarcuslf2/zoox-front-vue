<template>
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"> Confirmação </p>
      </header>

      <section class="modal-card-body">
        <h2>Tem certeza que deseja remover esse item?</h2>

        <br />
        <div class="control">
          <a href="#" class="button is-fullwidth is-danger" @click="onSubmit()">Enviar</a>
        </div>
      </section>
      <br />
    </div>

    <button class="modal-close is-large" aria-label="close" @click="toogleModal()"></button>
  </div>
</template>

<script>
export default {
  name: 'FormDelete',
  props: {
    showModal: Boolean,
    toogleModal: Function,
    onSubmit: Function,
  },
};
</script>
