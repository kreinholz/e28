<template>
  <div id='cart-page'>
    <h1>Your Favorite Blog Posts</h1>

    <div v-if='items.length == 0'>No Favorites</div>

    <ul v-else-if='posts.length > 0' class='cleanList'>
      <li v-for='item in items' :key='item.id'>
        <button @click='removeFromFavorites(item.id)'>Remove</button>
        <router-link
          :to='{ name: "post", params: {"id" : item.id }}'
        >{{ getPostDetails(item.id)['title'] }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import * as app from './../../app.js';

export default {
  name: 'FavoritesPage',
  data: function() {
    return {
      items: [],
      favorites: null
    };
  },
  methods: {
    getPostDetails(postId) {
      return this.posts.find(({ id }) => id === postId);
    },
    removeFromFavorites: function(postId) {
      this.favorites.remove(postId);

      this.$store.commit('setFavoritesCount', this.favorites.count());
    }
  },
  computed: {
    posts: function() {
      return this.$store.state.posts;
    }
  },
  mounted() {
    this.favorites = new app.Favorites();

    this.items = this.favorites.getItems();
  }
};
</script>