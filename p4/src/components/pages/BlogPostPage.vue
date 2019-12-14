<template>
  <div id='blog-post-page' v-if='post'>
    <!-- v-html is dangerous, I know, but since I would theoretically be controlling the server
    in a realworld application, for demonstration purposes I'm allowing the injection of raw html-->
    <h1 v-html='post.title'></h1>
    <p></p>
    <div class='date'>{{ post.date | moment('dddd, MMMM Do, YYYY, h:mm a') }}</div>
    <p></p>
    <div v-if='post.image' class='image'>
      <img
        :alt='"Blog Post Image for  " + post.title'
        :src='require("../../assets/images/" + post.image)'
      />
    </div>
    <p class='description' v-html='post.content'></p>

    <button @click='addToFavorites(post.id)'>Add to Favorites</button>

    <transition name='fade'>
      <div class='alert' v-if='addAlert'>Post has been saved to Favorites</div>
    </transition>
    <p></p>
    <p>Share on Social Media:</p>
    <social-sharing :url='this.$router.fullPath' inline-template>
      <div>
        <network network='facebook'>
          <span class='social'><i class='fa fa-fw fa-facebook'></i> Facebook</span>
        </network>
        <network network='linkedin'>
          <span class='social'><i class='fa fa-fw fa-linkedin'></i> LinkedIn</span>
        </network>
        <network network='pinterest'>
          <span class='social'><i class='fa fa-fw fa-pinterest'></i> Pinterest</span>
        </network>
        <network network='reddit'>
          <span class='social'><i class='fa fa-fw fa-reddit'></i> Reddit</span>
        </network>
        <network network='twitter'>
          <span class='social'><i class='fa fa-fw fa-twitter'></i> Twitter</span>
        </network>
        <network network='whatsapp'>
          <span class='social'><i class='fa fa-fw fa-whatsapp'></i> Whatsapp</span>
        </network>
      </div>
    </social-sharing>
    <p></p>
    <div>
      <h2>Comments</h2>
      <div v-for='comment in comments' :key='comment.date' :comment='comment'>
        <div v-if='comment.postId == post.id'>
          <div class='comment'>
            <p>On {{ comment.date | moment('dddd, MMMM Do, YYYY, h:mm a') }}, {{ comment.commenter }} said:</p>
            <p>{{ comment.body }}</p>
          </div>
        </div>
      </div>
    </div>
    <p></p>
    <write-comment :postId='post.id'></write-comment>
    <p></p>
    <router-link :to='"/posts"'>&larr; Return to all blog posts</router-link>
  </div>
</template>

<script>
import * as app from './../../app.js';
import SocialSharing from 'vue-social-sharing';
import WriteComment from './../WriteComment.vue';

export default {
  name: 'BlogPostPage',
  components: { SocialSharing, WriteComment },
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