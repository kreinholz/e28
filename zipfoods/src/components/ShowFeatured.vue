<!-- src/components/ShowFeatured.vue -->
<template>
  <div id='featured'>
    <h2>Featured Products</h2>
    <ul class='cleanList'>
      <li v-for='product in products' :key='product.id'>{{ product.name }}</li>
    </ul>
  </div>
</template>

<script>
import * as app from './../app.js';

export default {
  name: 'ShowFeatured',
  data: function() {
    return {
      category: 'snacks',
      products: null
    };
  },
  mounted() {
    app.axios.get(app.config.api + '/products').then(response => {
      this.products = response.data;
      this.featuredProducts();
    });
  },
  methods: {
    featuredProducts: function() {
      function isMatch(product) {
        return product.categories.includes(this);
      }
      this.products = this.products.filter(isMatch, this.category);
    }
  }
};
</script>