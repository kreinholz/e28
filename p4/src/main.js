import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router';
import HomePage from './components/pages/HomePage.vue';
import BlogPostsPage from './components/pages/BlogPostsPage.vue';
import BlogPostPage from './components/pages/BlogPostPage.vue';
import CategoriesPage from './components/pages/CategoriesPage.vue';
import FavoritesPage from './components/pages/FavoritesPage.vue';

import store from './store';

import SocialSharing from 'vue-social-sharing';

import Vuelidate from 'vuelidate';

Vue.use(VueRouter);
Vue.use(SocialSharing);
Vue.use(require('vue-moment'));
Vue.use(Vuelidate);

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/posts', component: BlogPostsPage, name: 'posts' },
  { path: '/posts/:id', component: BlogPostPage, name: 'post', props: true },
  { path: '/categories', component: CategoriesPage, name: 'categories' },
  { path: '/favorites', component: FavoritesPage, name: 'favorites' }
]

const router = new VueRouter({
  routes: routes,
  mode: "history"
})

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
