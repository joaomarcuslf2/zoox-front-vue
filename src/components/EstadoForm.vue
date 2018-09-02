<template>
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" v-if="estado.nome || estado.abreviacao"> Atualizar Estado </p>
        <p class="modal-card-title" v-else> Adicionar Estado </p>
      </header>

      <section class="modal-card-body">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input class="input" type="text" v-model="nome">
          </div>
        </div>

        <div class="field">
          <label class="label">Abreviacao</label>
          <div class="control">
            <input class="input" type="text" v-model="abreviacao">
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
      nome: this.estado.nome || '',
      abreviacao: this.estado.abreviacao || '',
    };
  },
  name: 'EstadoForm',
  props: {
    showModal: Boolean,
    toogleModal: Function,
    onSubmit: Function,
    estado: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  methods: {
    submitData: function() {
      const newEstado = Object.assign({}, this.estado, {
        nome: this.nome,
        abreviacao: this.abreviacao.toUpperCase(),
      });

      return this.onSubmit(newEstado);
    },
  },
};
</script>
