<template>
  <div id='posts'>
    <h2>Blog Posts</h2>
    <show-blog-post v-for='post in posts' :key='post.id' :post='post'></show-blog-post>
  </div>
</template>

<script>
import ShowBlogPost from './../ShowBlogPost.vue';

import * as app from './../../app.js';

export default {
  name: 'BlogPostsPage',
  components: { ShowBlogPost },
  data: function() {
    return {
      posts: null
    };
  },
  mounted() {
    app.axios.get(app.config.api + 'posts').then(response => {
      this.posts = response.data;
    });
  }
};
</script>