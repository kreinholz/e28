<template>
  <div id='blog-post-page' v-if='post'>
    <h1>{{ post.title }}</h1>
    <div class='date'>{{ post.date }}</div>
    <div v-if='post.image' class='image'><img
      :alt='"Blog Post Image for  " + post.title'
      :src='require("../../assets/images/" + post.image)'
    /></div>
    <!-- v-html is dangerous, I know, but since I would theoretically be controlling the server
    in a realworld application, for demonstration purposes I'm allowing the injection of raw html -->
    <p class='description' v-html=post.content></p>

    <button @click='addToFavorites(post.id)'>Add to Favorites</button>

    <transition name='fade'>
      <div class='alert' v-if='addAlert'>Post has been saved to Favorites</div>
    </transition>

    <div v-if='comments'><h2>Comments</h2>
      <div v-for='comment in comments' :key='comment.id' :comment='comment'>
        <div v-if='comment.postId == post.id'>
          <p>On {{ comment.date }}, {{ comment.commenter }} said:</p>
          <p>{{ comment.body }}</p>
        </div>
      </div>
    </div>
    <router-link :to='"/posts"'>&larr; Return to all blog posts</router-link>
  </div>
</template>

<script>
import * as app from './../../app.js';
export default {
  name: 'BlogPostPage',
  props: ['id'],
  data: function() {
    return {
      post: null,
      comments: null,
      addAlert: false
    };
  },
  mounted() {
    app.axios.get(app.config.api + 'posts/' + this.id).then(response => {
      this.post = response.data;
    });
    app.axios.get(app.config.api + 'comments').then(response => {
      this.comments = response.data;
    });
  },
  methods: {
    addToFavorites: function(postId) {
      let favorites = new app.Favorites();
      favorites.add(postId);
      app.store.favoritesCount = favorites.count();
      this.addAlert = true;
      setTimeout(() => (this.addAlert = false), 1500);
    }
  }
};
</script>