import Vue from 'vue';
import Router from 'vue-router';
import Estados from './views/Estados.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'estados',
      component: Estados,
    },
    {
      path: '/:estadoId',
      name: 'cidades',
      component: () => import(/* webpackChunkName: "cidades" */ './views/Cidades.vue'),
    },
  ],
});
