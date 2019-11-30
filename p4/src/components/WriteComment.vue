<template>
<form id='newComment' @submit='checkForm' action='https://e28-p4-5044d.firebaseio.com/comments.json' method='put'>
  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key='error'>{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">Name</label>
    <input
      id="name"
      v-model="name"
      type="text"
      name="commenter"
    >
  </p>
  <p>
    <label for="comment">Comment</label>
    <input
      id="comment"
      v-model="comment"
      type="text"
      name="body"
    >
  </p>

  <input type='hidden' name='date' :value='currentDate'>
  <input type='hidden' name='postId' :value='this.$route.path.replace("/posts/", "")'>

  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
</template>

<script>

export default {
  name: 'WriteComment',
  data: function() {
    return {
      errors: [],
      name: null,
      comment: null,
      currentDate: new Date(),
    };
  },
  methods: {
    checkForm: function (evt) {
      if (this.name && this.comment) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.comment) {
        this.errors.push('Comment required.');
      }

      evt.preventDefault();
    }
  }
};
</script>