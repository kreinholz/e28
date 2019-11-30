<template>
  <div id='blog-post-page' v-if='post'>
    <h1>{{ post.title }}</h1>
    <p></p>
    <div class='date'>{{ post.date | moment('dddd, MMMM Do, YYYY, h:mm a') }}</div>
    <p></p>
    <div v-if='post.image' class='image'>
      <img
        :alt='"Blog Post Image for  " + post.title'
        :src='require("../../assets/images/" + post.image)'
      />
    </div>
    <!-- v-html is dangerous, I know, but since I would theoretically be controlling the server
    in a realworld application, for demonstration purposes I'm allowing the injection of raw html-->
    <p class='description' v-html='post.content'></p>

    <button @click='addToFavorites(post.id)'>Add to Favorites</button>

    <transition name='fade'>
      <div class='alert' v-if='addAlert'>Post has been saved to Favorites</div>
    </transition>
    <p></p>
    <p>Share on Social Media</p>
    <social-sharing :url='this.$router.fullPath' inline-template>
      <div>
        <network network='facebook'>
          <i class='fa fa-fw fa-facebook'></i> Facebook
        </network>
        <network network='linkedin'>
          <i class='fa fa-fw fa-linkedin'></i> LinkedIn
        </network>
        <network network='pinterest'>
          <i class='fa fa-fw fa-pinterest'></i> Pinterest
        </network>
        <network network='reddit'>
          <i class='fa fa-fw fa-reddit'></i> Reddit
        </network>
        <network network='twitter'>
          <i class='fa fa-fw fa-twitter'></i> Twitter
        </network>
        <network network='whatsapp'>
          <i class='fa fa-fw fa-whatsapp'></i> Whatsapp
        </network>
      </div>
    </social-sharing>
    <p></p>
    <div>
      <h2>Comments</h2>
      <div v-for='comment in comments' :key='comment.id' :comment='comment'>
        <div v-if='comment.postId == post.id'>
          <p
            class='comment'
          >On {{ comment.date | moment('dddd, MMMM Do, YYYY, h:mm a') }}, {{ comment.commenter }} said:</p>
          <p class='comment'>{{ comment.body }}</p>
        </div>
      </div>
    </div>
    <p></p>
    <router-link :to='"/posts"'>&larr; Return to all blog posts</router-link>
  </div>
</template>

<script>
import * as app from './../../app.js';
import SocialSharing from 'vue-social-sharing';

export default {
  name: 'BlogPostPage',
  components: { SocialSharing },
  props: ['id'],
  data: function() {
    return {
      addAlert: false
    };
  },
  computed: {
    post: function() {
      return this.$store.getters.getBlogPostById(this.id);
    },
    comments: function() {
      return this.$store.state.comments;
    }
  },
  mounted() {
    this.$store.dispatch('setComments');
  },
  methods: {
    addToFavorites: function(postId) {
      let favorites = new app.Favorites();
      favorites.add(postId);
      this.$store.commit('setFavoritesCount', favorites.count());
      this.addAlert = true;
      setTimeout(() => (this.addAlert = false), 1500);
    }
  }
};
</script>