<template>
  <div id='new-comment'>
    <h1>Comment on this Post</h1>
    <form @submit.prevent='handleSubmit'>
      <div class='form-group'>
        <label for='name'>Your Name</label>
        <input
          type='text'
          :class='{ "form-input-error": $v.blogComment.name.$error }'
          id='name'
          data-test='comment-name-input'
          v-model='$v.blogComment.name.$model'
        />

        <div v-if='$v.blogComment.name.$error'>
          <div
            class='form-feedback-error'
            v-if='!$v.blogComment.name.required'
          >You must provide your name.</div>
          <div
            class='form-feedback-error'
            v-else-if='!$v.blogComment.name.minLength'
          >Your name must be at least 3 characters long.</div>
        </div>

        <small class='form-help'>Min: 3</small>
      </div>

      <div class='form-group'>
        <label for='comment'>Comment</label>
        <input
          type='text'
          :class='{ "form-input-error": $v.blogComment.comment.$error }'
          data-test='comment-comment-input'
          id='comment'
          v-model='$v.blogComment.comment.$model'
        />
        <div v-if='$v.blogComment.comment.$error'>
          <div
            class='form-feedback-error'
            v-if='!$v.blogComment.comment.required'
          >A comment is required.</div>
          <div
            class='form-feedback-error'
            v-else-if='!$v.blogComment.comment.minLength'
          >Your comment must be at least 10 characters long.</div>
        </div>
      </div>

      <button data-test='new-comment-button' type='submit'>Submit Comment</button>

      <div class='form-feedback-error' v-if='formHasErrors'>Please correct the above errors</div>
    </form>
  </div>
</template>

<script>
import * as app from './../app.js';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'WriteComment',
  props: ['postId'],
  data: function() {
    return {
      blogComment: null,
      formHasErrors: false,
      blogPostId: this.postId
    };
  },
  validations: {
    blogComment: {
      name: {
        required,
        minLength: minLength(3)
      },
      comment: {
        required,
        minLength: minLength(10)
      }
    }
  },
  watch: {
    '$v.$anyError': function() {
      this.formHasErrors = this.$v.$anyError;
    }
  },
  methods: {
    handleSubmit: function() {
      if (!this.formHasErrors) {
        // Axios request to the server to save the new comment to Firebase
        app.axios
          .post(app.config.api + 'comments.json', this.blogComment)
          // Refresh comments received from Firebase to the Vuex store
          .then(response => {
            console.log(response);
            this.$store.dispatch('setComments');
          });
      }
    },
    mounted: function() {
      // If in dev mode, pre-fill the 2 input fields to make testing easier
      if (process.env.NODE_ENV == 'development') {
        this.blogComment = {
          name: 'Kevin Reinholz',
          comment: 'What an amazing blog post!',
          date: JSON.stringify(new Date()),
          postId: this.blogPostId
        };
      } else {
        this.blogComment = {
          name: '',
          comment: '',
          date: JSON.stringify(new Date()),
          postId: this.blogPostId
        };
      }
    }
  }
};
</script>