# Project 3
+ By: Kevin Reinholz
+ Production URL: <http://p3.kreinholz.me>


## Outline of features
Blog App:
    - Display a "static" home page introducing the blog
    - Display a list of all blog posts, retrieved from 'server' API
    - Allow filtering of blog posts by category from the Categories page
    - Allow visitors to 'favorite' a blog post, which will list it on the Favorites page
    - Allow visitors to leave comments on blog posts (persistence simulated using localStorage)

## Outside resources
    - CSS styling derived from https://templated.co/privy and zipfoods e28 course scss file, modified for this app's purposes
    - Incorporated emoji-mart-vue npm module to allow non-mobile users to select emojis for inclusion in their blog comments
    - Incorporated vue2-editor npm module to allow rich text in comments (experimental--this is really intended for p4, to allow rich text in new blog posts. Allowing rich texts, and by extension, html, in comments is undesirable for security/XSS attack reasons)

## Notes for instructor

This was a really frustrating project for me for several reasons. First and foremost, the delta between what I *wanted* to accomplish, and what time constraints *permitted* me to accomplish, left me feeling frustrated and dissatisfied.

my-json-server.com, while great for 'mocking' server API data, greatly limited the amount of blog posts I could work with, due to its 10,000 character limit on db.json files. This made it difficult to showcase the full capabilities of this app, as I was forced to limit the amount of blog posts to 3. I would have liked to have worked with ~ 10 blog posts in order to better showcase the category filtering.

With a true server/REST API back-end, I would have liked to have incorporated user authentication (likely via OAuth) and added the ability to create new blog posts, complete with rich text editing and the option to upload to an image associated with the post. This is my ultimate goal for this application--to provide the capability for users to create their own blog posts and publish them without knowing html, css, or programming. No, it won't be the next Drupal or WordPress, but I'll likely use it for my own purposes/personal website.

I hate CSS. I always have. I hope I won't always continue to. But I like worrying about the programmatic logic, not fussing with CSS styles. I felt like I spent an inordinate amount of time messing with the styling rather than focusing on the programmatic logic of the application as I wanted to.