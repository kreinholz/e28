// /src/Favorites.js -- yes this is a mod of Cart.js from zipfoods :)
export default class Favorites {

    /**
     * 
     */
    constructor() {
        // Extract JSON favorites string from local storage
        let favorites = localStorage.getItem('favorites');

        // Parse JSON cart String to `items` object
        this.items = (favorites) ? JSON.parse(favorites) : [];
    }

    /**
     * Getter method for items
     */
    getItems() {
        return this.items;
    }

    /**
     * Returns how many total items are saved to favorites
     */
    count() {
        let sum = 0;
        if (this.items.length > 0) {
            sum = this.items.length;
        }
        return sum;
    }

    /**
     * Updates favorites in localstorage
     */
    update() {
        localStorage.setItem('favorites', JSON.stringify(this.items))
    }

    /**
     * Add a new item of the given postId
     */
    add(postId) {

        // First see if product is already present
        let item = this.getItem(postId)

        if (item) {
            // Product is in favorites already; don't add it again
            return;

        } else {
            // Product not in favorites, add as new item
            this.items.push({
                id: postId
            });
        }

        this.update();
    }

    /**
     * Remove an item from items via postId
     */
    remove(postId) {
        let item = this.getItem(postId);

        let itemIndex = this.items.indexOf(item);

        if (item) {
            this.items.splice(itemIndex, 1);
            this.update();
        }
    }

    /**
     * Get an item from items via postId
     * Returns null if post does not exist in items
     */
    getItem(postId) {
        return this.items.find(({ id }) => id === postId) || null;
    }
}