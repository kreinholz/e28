<template>
  <div id='app'>
    <img alt='Blog logo' src='./assets/images/blog_logo.png' id='logo' />
    <nav>
      <ul>
        <li v-for='link in links' :key='link'>
          <router-link exact :to='{ name: link }'>
            {{ link }}
            <span v-if='link == "favorites"'>({{ sharedState.favoritesCount }})</span>
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
      links: ['home', 'posts', 'categories', 'favorites'],
      sharedState: app.store
    };
  },
  mounted() {
    this.favorites = new app.Favorites();
    app.store.favoritesCount = this.favorites.count();
  }
};
</script>