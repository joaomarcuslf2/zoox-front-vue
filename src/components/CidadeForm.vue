<template>
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" v-if="cidade.nome || cidade.abreviacao"> Atualizar Cidade </p>
        <p class="modal-card-title" v-else> Adicionar Cidade </p>
      </header>

      <section class="modal-card-body">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input class="input" type="text" v-model="nome">
          </div>
        </div>

        <div class="control">
          <a href="#" class="button is-link is-fullwidth" @click="submitData()">Enviar</a>
        </div>
      </section>
      <br />
    </div>

    <button class="modal-close is-large" aria-label="close" @click="toogleModal()"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: this.cidade.nome || '',
    };
  },
  name: 'CidadeForm',
  props: {
    showModal: Boolean,
    toogleModal: Function,
    onSubmit: Function,
    cidade: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  methods: {
    submitData: function() {
      const newCidade = Object.assign({}, this.cidade, {
        nome: this.nome,
      });

      return this.onSubmit(newCidade);
    },
  },
};
</script>
