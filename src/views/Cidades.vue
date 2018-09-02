<template>
  <div id="cidades">
    <div v-if="!loading" class="cidade-list-title card">
      <div class="card-content">
        <div class="content">
          <h2>Lista de Cidades</h2>
        </div>

        <SelectedFilters
          :selectedFilters=selectedFilters
          :removeFilter=removeFilter
        />
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item" v-on:click="toogleAddForm()">Adicionar</a>
        <a href="#" class="card-footer-item" v-on:click="toogleAggregationModal()">Refinar</a>
      </footer>
    </div>

    <CidadeListView
      v-if="cidades.length && !loading"
      v-for="cidade in cidades"
      v-bind:key="cidade._id"
      :cidade=cidade
      :onSubmit=onSubmitUpdateCidade
      :onDelete=onSubmitDeleteCidade
    />

    <Loading :loading=loading />

    <div v-if="hadError">
      <a
        v-on:click="fetchCidades()"
        class="button is-large is-fullwidth is-link">
          Recarregar Cidades
      </a>
    </div>

    <div class="errors" v-if="error.error">
      <ErrorNotification :errorObj=error />
    </div>

    <CidadeForm
      :showModal=showAddForm
      :toogleModal=toogleAddForm
      :onSubmit=onSubmitSaveCidade
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
import CidadeListView from '@/components/CidadeListView.vue';
import CidadeForm from '@/components/CidadeForm.vue';
import ErrorNotification from '@/components/ErrorNotification.vue';
import AggregationModal from '@/components/AggregationModal.vue';
import Loading from '@/components/Loading.vue';
import SelectedFilters from '@/components/SelectedFilters.vue';

import { getCidades, addCidade, updateCidade, deleteCidade } from '../actions';

export default {
  name: 'Cidades',
  data() {
    return {
      cidades: [],
      aggregations: {},
      selectedFilters: [],
      error: {},
      hadError: false,
      loading: true,
      showAddForm: false,
      showAggregationModal: false,
      drop: ['estadoId', '_id'],
    };
  },
  mounted() {
    this.fixedFilter = {
      type: 'estadoId',
      value: this.$route.params.estadoId,
      fixed: true,
    };

    this.fetchCidades();
  },
  components: {
    CidadeListView,
    CidadeForm,
    ErrorNotification,
    AggregationModal,
    Loading,
    SelectedFilters,
  },
  methods: {
    resetState: function() {
      this.cidades = [];
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
    fetchCidades: function() {
      this.loading = true;
      this.hadError = false;
      this.error = {};

      const filters = this.selectedFilters.concat(this.fixedFilter);

      getCidades(filters)
        .then(this.handleSuccess)
        .catch(this.handleError);
    },
    handleSuccess: function(data) {
      this.loading = false;
      this.hadError = false;
      this.error = {};
      this.cidades = data.content;
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
    onSubmitSaveCidade: function(newCidade) {
      this.loading = true;
      addCidade(Object.assign({}, newCidade, { estadoId: this.fixedFilter.value }))
        .then(data => {
          this.showAddForm = false;
          return data;
        })
        .then(this.fetchCidades)
        .catch(this.handleError);
    },
    onSubmitUpdateCidade: function(newCidade) {
      this.loading = true;
      updateCidade(Object.assign({}, newCidade, { estadoId: this.fixedFilter.value }))
        .then(data => {
          this.showAddForm = false;
          return data;
        })
        .then(this.fetchCidades)
        .catch(this.handleError);
    },
    onSubmitDeleteCidade: function(newCidade) {
      this.loading = true;
      deleteCidade(newCidade)
        .then(data => {
          this.showAddForm = false;
          return data;
        })
        .then(this.fetchCidades)
        .catch(this.handleError);
    },
    removeFilter: function({ type, value }) {
      const newFilters = this.selectedFilters
        .filter(filter => {
          return filter.type === type && filter.value !== value;
        })
        .concat(this.fixedFilter);

      this.resetState();

      return getCidades(newFilters)
        .then(this.handleSuccess)
        .catch(this.handleError);
    },
    onSubmitFilter: function({ type, value }) {
      const newFilters = this.selectedFilters.concat({ type, value }).concat(this.fixedFilter);

      this.resetState();

      return getCidades(newFilters)
        .then(this.handleSuccess)
        .catch(this.handleError);
    },
  },
};
</script>

<style scoped>
</style>
