<template>
  <div id='app'>
    <img alt='ZipFoods logo' src='./assets/images/zipfoods-logo.png' id='logo' />
    <nav>
      <ul>
        <li v-for='link in links' :key='link'>
          <router-link exact :to='{ name: link }'>
            {{ link }}
            <span v-if='link == "cart"'>({{ sharedState.cartCount }})</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import * as app from './app.js';

export default {
  name: 'app',
  components: {},
  data: function() {
    return {
      links: ['home', 'products', 'categories', 'cart'],
      sharedState: app.store
    };
  },
  mounted() {
    this.cart = new app.Cart();
    app.store.cartCount = this.cart.count();
  }
};
</script>

<style lang='scss'>
@import './assets/css/zipfoods.scss';
</style>
