<template>
  <div id="aggregation-modal" class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"> Refinar por filtro: </p>
      </header>

      <section class="modal-card-body">
        <div v-for="key in Object.keys(aggregations)" v-bind:key="key" v-if="!drop.includes(key)">
          <strong class="aggregation-title"> {{key}} </strong>

          <div class="field-body" v-for="aggregation in aggregations[key]" v-bind:key="aggregation.value">
            <div class="field" @click="onSubmit(aggregation)">
              <div class="control">
                <label class="checkbox" >
                  <input type="checkbox" />

                  {{aggregation.value}}
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
    </div>

    <button class="modal-close is-large" aria-label="close" @click="toogleModal()"></button>
  </div>
</template>

<script>
export default {
  name: 'AggregationModal',
  props: {
    showModal: Boolean,
    toogleModal: Function,
    onSubmit: Function,
    aggregations: {
      type: Object,
      default: function() {
        return {};
      },
    },
    drop: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#aggregation-modal .checkbox {
  color: #666;
}

#aggregation-modal .aggregation-title {
  display: flex;
  color: #302e2e;
  font-weight: bolder;
  font-size: 1.5rem;
}
</style>
