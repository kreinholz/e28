<template>
  <div id='new-comment'>
    <h1>Comment on this Post</h1>
    <form @submit.prevent='handleSubmit'>
      <div class='form-group'>
        <label for='commenter'>Your Name</label>
        <input
          type='text'
          :class='{ "form-input-error": $v.blogComment.commenter.$error }'
          id='commenter'
          data-test='comment-commenter-input'
          v-model='$v.blogComment.commenter.$model'
        />

        <div v-if='$v.blogComment.commenter.$error'>
          <div
            class='form-feedback-error'
            v-if='!$v.blogComment.commenter.required'
          >You must provide your name.</div>
          <div
            class='form-feedback-error'
            v-else-if='!$v.blogComment.commenter.minLength'
          >Your name must be at least 3 characters long.</div>
        </div>

        <small class='form-help'>Min: 3</small>
      </div>

      <div class='form-group'>
        <label for='body'>Comment</label>
        <textarea
          type='text'
          :class='{ "form-input-error": $v.blogComment.body.$error }'
          data-test='comment-body-input'
          id='body'
          v-model='$v.blogComment.body.$model'
        />
        <div v-if='$v.blogComment.body.$error'>
          <div
            class='form-feedback-error'
            v-if='!$v.blogComment.body.required'
          >A comment is required.</div>
          <div
            class='form-feedback-error'
            v-else-if='!$v.blogComment.body.minLength'
          >Your comment must be at least 10 characters long.</div>
        </div>
        <small class='form-help'>Min: 10</small>
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
      blogComment: {
        commenter: '',
        body: '',
        date: null,
        postId: null
      },
      formHasErrors: false,
      blogPostId: this.postId
    };
  },
  validations: {
    blogComment: {
      commenter: {
        required,
        minLength: minLength(3)
      },
      body: {
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
        // Update the date and postId fields within the new comment object
        this.blogComment.date = new Date();
        this.blogComment.postId = this.blogPostId;
        // Axios request to the server to save the new comment to Firebase
        app.axios
          .post(app.config.api + 'comments.json', this.blogComment)
          // Refresh comments received from Firebase to the Vuex store
          .then(response => {
            console.log(response);
            this.$store.dispatch('setComments');
            // clear form inputs and reset vuelidate error state - see <https://github.com/vuelidate/issues/132>
            this.blogComment = {};
            this.$v.$reset();
          });
      }
    }
  }
};
</script>