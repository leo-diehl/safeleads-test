import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Importing main styles
import '@/assets/css/main.css';
import '@/assets/css/__forms.css';
import '@/assets/css/__tokens.css';
import '@/assets/css/__spacing.css';

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
