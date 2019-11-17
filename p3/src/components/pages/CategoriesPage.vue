<template>
  <div>
    <div>
      <h2>Categories</h2>
      <ul class='cleanList'>
        <li v-for='(category, id) in categories' :key='id'>{{ category }}</li>
      </ul>
    </div>
    <div id='posts'>
      <h2>Blog Posts</h2>
      <show-blog-post v-for='post in posts' :key='post.id' :post='post'></show-blog-post>
    </div>
  </div>
</template>

<script>
import ShowBlogPost from './../ShowBlogPost.vue';
import * as app from './../../app.js';

export default {
  name: 'CategoriesPage',
  components: { ShowBlogPost },
  data: function() {
    return {
      posts: null,
      categories: null
    };
  },
  methods: {
    loadCategories: function() {
      let categories = this.posts.map(post => post.categories);
      let mergedCategories = [].concat.apply([], categories);
      // Return unique, sorted categories
      this.categories = [...new Set(mergedCategories)].sort();
    }
  },
  mounted() {
    app.axios.get(app.config.api + 'posts').then(response => {
      this.posts = response.data;
      this.loadCategories();
    });
  }
};
</script>