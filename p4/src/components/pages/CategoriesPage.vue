<template>
  <div>
    <div>
      <h2>Categories</h2>
      <ul class='cleanList'>
        <li
          v-for='(category, id) in categories'
          :key='id'
          @click='filterPosts(category)'
          class='nav'
        >
          <span v-if='category == activeCategory' class='selected'>{{ category }}</span>
          <span v-else>{{ category }}</span>
        </li>
      </ul>
    </div>
    <div v-if='categorySelected' id='posts'>
      <h2>Blog Posts</h2>
      <show-blog-post v-for='post in filteredPosts' :key='post.id' :post='post'></show-blog-post>
    </div>
  </div>
</template>

<script>
import ShowBlogPost from './../ShowBlogPost.vue';

export default {
  name: 'CategoriesPage',
  components: { ShowBlogPost },
  data: function() {
    return {
      filteredPosts: [],
      categorySelected: false,
      activeCategory: null
    };
  },
  methods: {
    filterPosts: function(selectedCategory) {
      // Re-initialize the filteredPosts array and activeCategory, to clear out posts from a previous category
      this.filteredPosts = [];
      this.activeCategory = null;
      // Define a new variable to allow access to 'this' within modified function scope--
      // see https://www.reddit.com/r/vuejs/comments/5ae7fj/how_do_i_reference_data_from_a_function_inside_a/
      let that = this;
      // Iterate over the array of objects, searching for the user-selected category
      this.posts.forEach(function(object) {
        if (object.categories.includes(selectedCategory)) {
          // add the matching object to the filteredPosts array
          that.filteredPosts.push(object);
          that.categorySelected = true;
          that.activeCategory = selectedCategory;
        }
      });
    }
  },
  computed: {
    posts: function() {
      return this.$store.state.posts;
    },
    categories: function() {
      let categories = this.posts.map(post => post.categories);
      let mergedCategories = [].concat.apply([], categories);
      // Return unique, sorted categories
      return [...new Set(mergedCategories)].sort();
    }
  }
};
</script>