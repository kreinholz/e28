import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router';
import ShowHome from './components/ShowHome.vue';
import ShowProducts from './components/ShowProducts.vue';
import ShowCategories from './components/ShowCategories.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: ShowHome },
  { path: '/products', component: ShowProducts },
  { path: '/categories', component: ShowCategories }
]

const router = new VueRouter({
  routes: routes,
  mode: "history"
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
