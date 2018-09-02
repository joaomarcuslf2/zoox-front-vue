<template>
  <div id="estados">
    <div v-if="!loading" class="estado-list-title card">
      <div class="card-content">
        <div class="content">
          <h2>Lista de Estados</h2>
        </div>

        <div class="content" v-for="filter in selectedFilters">
          <span class="tag">
            {{filter.value}}
            <button class="delete is-small" v-on:click="removeFilter(filter)"></button>
          </span>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item" v-on:click="toogleAddForm()">Adicionar</a>
        <a href="#" class="card-footer-item" v-on:click="toogleAggregationModal()">Refinar</a>
      </footer>
    </div>

    <EstadoListView
      v-if="estados.length && !loading"
      v-for="estado in estados"
      v-bind:key="estado._id"
      :estado=estado
      :onSubmit=onSubmitUpdateEstado
      :onDelete=onSubmitDeleteEstado
    />

    <div v-if="loading">
      <figure class="image is-square is-fullwidth">
        <img src="@/assets/loading.gif">
      </figure>
    </div>

    <div v-if="hadError">
      <a
        v-on:click="fetchEstados()"
        class="button is-large is-fullwidth is-link">
          Recarregar Estados
      </a>
    </div>

    <div class="errors" v-if="error.error">
      <ErrorNotification :errorObj=error />
    </div>

    <EstadoForm
      :showModal=showAddForm
      :toogleModal=toogleAddForm
      :onSubmit=onSubmitSaveEstado
    />

    <AggregationModal
      :showModal=showAggregationModal
      :toogleModal=toogleAggregationModal
      :onSubmit=onSubmitFilter
      :aggregations=aggregations
      :drop=drop
    />
  </div>
</template>

<script>
import EstadoListView from '@/components/EstadoListView.vue';
import EstadoForm from '@/components/EstadoForm.vue';
import ErrorNotification from '@/components/ErrorNotification.vue';
import AggregationModal from '@/components/AggregationModal.vue';

import { getEstados, addEstado, updateEstado, deleteEstado } from '../actions';

export default {
  name: 'Estados',
  data() {
    return {
      estados: [],
      aggregations: {},
      selectedFilters: [],
      error: {},
      hadError: false,
      loading: true,
      showAddForm: false,
      showAggregationModal: false,
      drop: [
        "_id"
      ]
    };
  },
  mounted() {
    this.fetchEstados();
  },
  components: {
    EstadoListView,
    EstadoForm,
    ErrorNotification,
    AggregationModal,
  },
  methods: {
    resetState: function() {
      this.estados = [];
      this.aggregations = {};
      this.selectedFilters = [];
      this.error = {};
      this.hadError = false;
      this.loading = true;
      this.showAddForm = false;
      this.showAggregationModal = false;
    },
    toogleAddForm: function() {
      this.showAddForm = !this.showAddForm;
    },
    toogleAggregationModal: function() {
      this.showAggregationModal = !this.showAggregationModal;
    },
    fetchEstados: function() {
      this.loading = true;
      this.hadError = false;
      this.error = {};

      getEstados(this.selectedFilters)
        .then(this.handleSuccess)
        .catch(this.handleError);
    },
    handleSuccess: function(data) {
      this.loading = false;
      this.hadError = false;
      this.error = {};
      this.estados = data.content;
      this.aggregations = data.aggregations;
      this.selectedFilters = data.selectedFilters;
    },
    handleError: function(err) {
      this.error = err;
      this.hadError = true;
      this.loading = false;
      setTimeout(() => {
        this.error = {};
      }, 2200);
    },
    onSubmitSaveEstado: function(newEstado) {
      this.loading = true;
      addEstado(newEstado)
        .then(data => {
          this.showAddForm = false;
          return data;
        })
        .then(this.fetchEstados)
        .catch(this.handleError);
    },
    onSubmitUpdateEstado: function(newEstado) {
      this.loading = true;
      updateEstado(newEstado)
        .then(data => {
          this.showAddForm = false;
          return data;
        })
        .then(this.fetchEstados)
        .catch(this.handleError);
    },
    onSubmitDeleteEstado: function(newEstado) {
      this.loading = true;
      deleteEstado(newEstado)
        .then(data => {
          this.showAddForm = false;
          return data;
        })
        .then(this.fetchEstados)
        .catch(this.handleError);
    },
    removeFilter: function({ type, value }) {
      const newFilters = this.selectedFilters.filter(filter => {
        return filter.type === type && filter.value !== value;
      });

      this.resetState();

      return getEstados(newFilters)
        .then(this.handleSuccess)
        .catch(this.handleError);
    },
    onSubmitFilter: function({ type, value }) {
      const newFilters = this.selectedFilters.concat({ type, value });

      this.resetState();

      return getEstados(newFilters)
        .then(this.handleSuccess)
        .catch(this.handleError);
    },
  },
};
</script>

<style scoped>
</style>
