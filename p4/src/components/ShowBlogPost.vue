<template>
  <div class='post'>
    <router-link :to='{ name: "post", params: {"id" : post.id }}'>
      <div class='post-title' v-html='post.title'></div>
      <div v-if='post.image'>
        <img
          class='thumbnail'
          :alt='"Image associated with " + post.title'
          :src='require("../assets/images/" + post.image)'
        />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ShowBlogPost',
  props: ['post']
};
</script>