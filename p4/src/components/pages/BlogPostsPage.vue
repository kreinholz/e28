<template>
  <div id='posts'>
    <h2>Blog Posts</h2>
    <show-blog-post v-for='post in posts' :key='post.id' :post='post'></show-blog-post>
  </div>
</template>

<script>
import ShowBlogPost from './../ShowBlogPost.vue';

export default {
  name: 'BlogPostsPage',
  components: { ShowBlogPost },
  data: function() {
    return {};
  },
  computed: {
    posts: function() {
      return this.$store.state.posts;
    }
  }
};
</script>