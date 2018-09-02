<template>
  <div class="estado-list-view card">
    <div class="card-content">
      <div class="content">
        <h2>{{estado.nome}} - {{estado.abreviacao}}</h2>
        Data de Atualização: <time datetime="2016-1-1">{{formatDate(estado.dataDeAtualizacao)}}</time>
      </div>
    </div>
    <footer class="card-footer">
      <a v-bind:href="estado._id" class="card-footer-item">Ampliar</a>
      <a href="#" class="card-footer-item" v-on:click="toogleModal()">Editar</a>
      <a href="#" class="card-footer-item" v-on:click="toogleDelete()">Delete</a>
    </footer>

    <EstadoForm
      :estado=estado
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
import EstadoForm from '@/components/EstadoForm.vue';
import FormDelete from '@/components/FormDelete.vue';
import moment from '../helpers/moment';

export default {
  name: 'EstadoListView',
  data() {
    return { showModal: false, showDelete: false };
  },
  components: {
    EstadoForm,
    FormDelete,
  },
  props: {
    estado: Object,
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
      this.onDelete(this.estado);
    },
  },
};
</script>

<style scoped>
.estado-list-view {
  border-top: 2px solid #666;
  margin: 0 10px;
}
</style>
