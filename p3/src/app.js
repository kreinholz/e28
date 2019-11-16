export { default as Favorites } from './Favorites';

export const axios = require('axios');

export const config = {
    api: 'https://my-json-server.typicode.com/kreinholz/e28-p3-api/',
}

export let store = {
    favoritesCount: 0
}