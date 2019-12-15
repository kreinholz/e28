# Project 4
+ By: Kevin Reinholz
+ Production URL: <http://p4.kreinholz.me>

## Improvements based on P3 peer review feedback
+ Added social media logos/icons to SocialSharing links, and also improved CSS styling so they look like clickable links
+ Improved the behavior of Categories to make the selected category appear different and hopefully make the overall interface clearer to the user
+ Comments are now active, and users have the ability to create/post new comments :)
+ Shrunk blog post images so they're not so huge :)

## Outside resources
+ CSS styling derived from https://templated.co/privy and zipfoods e28 course scss file, modified for this app's purposes
+ https://www.reddit.com/r/vuejs/comments/5ae7fj/how_do_i_reference_data_from_a_function_inside_a/, an absolute lifesaver for getting CategoriesPage.vue component to work (how to access 'this' inside of a function call by first assigning it to another variable outside the function)
+ vue-social-share npm module for sharing blog posts to social media
+ vue-moment to incorporate Moment.js date filters
+ emoji-mart-vue npm module for providing an emoji picker to non-mobile users of the app when creating new blog comments

## Notes for instructor
+ I'm far less dissatisfied with p4 than I was with p3! I did have to cut out vue-authenticate, which was rather disappointing, as I wanted only OAuth authenticated users to be able to leave blog post comments, and have their social media usernames and icons displayed in their comment boxes. However, I decided not to attempt to implement this functionality due to security concerns with hosting the entire source code of my app on Github and hosting a 100% client-side app on Netlify per p4's requirements
+ In a similar vein, I would have liked to have worked with Firebase's authentication system to "lock down" my app more in terms of public access to both blog posts and comments, but since I have no server on which to "hide" sensitive login credentials/keys, this wasn't really feasible
+ Again, if I had server-side logic, I would have liked to have incorporated rich text editing and the ability to create new blog posts. However, due to the public/insecure nature of the app, I decided not to pursue this
+ Finally, I tried integrating emoji-mart-vue into p4, but found that the npm package does nothing beyond allowing a user to "pick" an emoji out of the box--it doesn't handle the logic of inserting a selected emoji into the textarea (a non-trivial matter). However, there are publicly available demo components that do just that--however, copying and pasting a large amount of code, or importing a third party's Vue component into my project does nothing to advance or demonstrate my own mastery of course concepts, and frankly threatened to swallow a good portion of p4 for the sake of a "nice to have." I opted to remove/not pursue this functionality.
+ As the above hopefully makes clear, I started with a laundry list of "nice to haves" but opted to whittle the scope of p4 down to something that's hopefully (a) quality work, and (b) not a security risk (beyond blog posts and comments on Firebase being accessible to the public)