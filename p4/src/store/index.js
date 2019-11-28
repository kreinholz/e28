import Vue from 'vue'
import Vuex from 'vuex'

import * as app from './../app.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        favoritesCount: 0,
        posts: [],
        comments: [],
    },
    mutations: {
        setFavoritesCount(state, payload) {
            state.favoritesCount = payload;
        },
        updateFavoritesCount(state, payload) {
            state.favoritesCount += payload;
        },
        setBlogPosts(state, payload) {
            state.posts = payload;
        },
        setComments(state, payload) {
            state.comments = payload;
        }
    },
    actions: {
        setBlogPosts(context) {
            app.axios.get(app.config.api + 'posts.json').then(response => {
                context.commit('setBlogPosts', response.data.slice(1));
            });
        },
        setComments(context) {
            app.axios.get(app.config.api + 'comments.json').then(response => {
                context.commit('setComments', response.data.slice(1));
            });
        }
    },
    getters: {
        getBlogPostById(state) {
            return function (id) {
                return state.posts.find(post => post.id == id);
            }
        }
    }
})