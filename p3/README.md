# Project 3
+ By: Kevin Reinholz
+ Production URL: <http://p3.kreinholz.me>


## Outline of features
Blog App:
    - Display a "static" home page introducing the blog
    - Display a list of all blog posts, retrieved from 'server' API
    - Allow filtering of blog posts by category from the Categories page
    - Allow visitors to 'favorite' a blog post, which will list it on the Favorites page
    - Allow visitors to 'share' a blog post on social media via a third-party component

## Outside resources
    - CSS styling derived from https://templated.co/privy and zipfoods e28 course scss file, modified for this app's purposes
    - vue-social-share npm module for sharing blog posts to social media
    - https://www.reddit.com/r/vuejs/comments/5ae7fj/how_do_i_reference_data_from_a_function_inside_a/, an absolute lifesaver for getting CategoriesPage.vue component to work (how to access 'this' inside of a function call by first assigning it to another variable outside the function)

## Notes for instructor

This was a really frustrating project for me for several reasons. First and foremost, the delta between what I *wanted* to accomplish, and what time constraints *permitted* me to accomplish, left me feeling frustrated and dissatisfied.

my-json-server.com, while great for 'mocking' server API data, greatly limited the amount of blog posts I could work with, due to its 10,000 character limit on db.json files. This made it difficult to showcase the full capabilities of this app, as I was forced to limit the amount of blog posts to 3. I would have liked to have worked with ~ 10 blog posts in order to better showcase the category filtering.

With a true server/REST API back-end, I would have liked to have incorporated user authentication (likely via OAuth) and added the ability to create new blog posts, complete with rich text editing and the option to upload to an image associated with the post. This is my ultimate goal for this application--to provide the capability for users to create their own blog posts and publish them without knowing html, css, or programming. No, it won't be the next Drupal or WordPress, but I'll likely use it for my own purposes/personal website.

I hate CSS. I always have. I hope I won't always continue to. But I like worrying about the programmatic logic, not fussing with CSS styles. I felt like I spent an inordinate amount of time messing with the styling rather than focusing on the programmatic logic of the application as I wanted to.

I would have liked to have added the capability for visitors to leave comments on blog posts and moreover to liven up their comments with the third-party emoji-mart-vue npm module. I would also like to have incorporated vue2-editor npm module to allow rich text in comments (although this was really intended for p4, to allow rich text in new blog posts. Allowing rich texts, and by extension, html, in comments is undesirable for security/XSS attack reasons). Ultimately, partially due to time constraints, but also due to limitations in "mocking" server interactions with localStorage, adding the capability to leave comments (that only show up on the user's current browser, and don't persist), it didn't make sense to pursue this path, as much as I wanted to work with emoji-mart-vue and vue2-editor.