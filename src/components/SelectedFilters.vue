<template>
  <section>
    <div class="content" v-for="filter in selectedFilters" v-bind:key="filter.value">
      <span class="tag" v-if="!filter.fixed">
        {{filter.value}}
        <button class="delete is-small" v-on:click="removeFilter(filter)"></button>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SelectedFilters',
  props: {
    removeFilter: Function,
    selectedFilters: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
};
</script>
