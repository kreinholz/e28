<template>
  <div id='app'>
    <div id='logo'>
      <img alt='Blog logo' src='./assets/images/blog_logo.png' />
    </div>
    <nav>
      <ul>
        <li v-for='link in links' :key='link'>
          <router-link exact :to='{ name: link }'>
            {{ link }}
            <span v-if='link == "favorites"'>({{ favoritesCount }})</span>
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
      links: ['home', 'posts', 'categories', 'favorites']
    };
  },
  computed: {
    favoritesCount: function() {
      return this.$store.state.favoritesCount;
    }
  },
  mounted() {
    this.favorites = new app.Favorites();

    this.$store.commit('setFavoritesCount', this.favorites.count());

    this.$store.dispatch('setBlogPosts');
  }
};
</script>

<style lang="css">
@import './assets/css/style.css';
</style>