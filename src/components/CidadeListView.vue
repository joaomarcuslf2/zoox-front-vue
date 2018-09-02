<template>
  <div class="cidade-list-view card">
    <div class="card-content">
      <div class="content">
        <h2>{{cidade.nome}}</h2>
        Data de Atualização: <time datetime="2016-1-1">{{formatDate(cidade.dataDeAtualizacao)}}</time>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" v-on:click="toogleModal()">Editar</a>
      <a href="#" class="card-footer-item" v-on:click="toogleDelete()">Delete</a>
    </footer>

    <CidadeForm
      :cidade=cidade
      :showModal=showModal
      :toogleModal=toogleModal
      :onSubmit=onSubmit
    />

    <FormDelete
      :showModal=showDelete
      :toogleModal=toogleDelete
      :onSubmit=onSubmitDelete
    />
  </div>
</template>

<script>
import CidadeForm from '@/components/CidadeForm.vue';
import FormDelete from '@/components/FormDelete.vue';
import moment from '../helpers/moment';

export default {
  name: 'CidadeListView',
  data() {
    return { showModal: false, showDelete: false };
  },
  components: {
    CidadeForm,
    FormDelete,
  },
  props: {
    cidade: Object,
    onSubmit: Function,
    onDelete: Function,
  },
  methods: {
    toogleModal: function() {
      this.showModal = !this.showModal;
    },
    toogleDelete: function() {
      this.showDelete = !this.showDelete;
    },
    formatDate: function(date) {
      return moment(date)
        .format('D [de] MMMM, YYYY [às] h:mm')
        .toString();
    },
    onSubmitDelete: function() {
      this.onDelete(this.cidade);
    },
  },
};
</script>

<style scoped>
.cidade-list-view {
  border-top: 2px solid #666;
  margin: 0 10px;
}
</style>
