import Vue from 'vue';
import VueRouter from 'vue-router';

import Occurrences from '../views/Occurrences.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'occurrences',
    component: Occurrences,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
