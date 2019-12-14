// https://docs.cypress.io/api/introduction/api.html

describe('Cypress e2e testing of p4', () => {
  it('Visits the home page', () => {
    cy.visit('/')
    cy.get('#logo').should('exist')
    cy.get('img').should('have.attr', 'alt')
  })


  // Define a blog post for use throughout tests
  let post = {
    title: 'JavaScript, Python, and Databases!',
    image: 'chat-getting-closer-2019-03-22-overlap-fixed-iphone.png',
    date: '2019-03-28T19:59:25.544+00:00',
    id: 6,
    content: "<p>I haven't posted in a while, and the reason for that is simple: my days have been consumed with Computer Science coursework! This semester, I'm taking 2 Master's level classes, for a total of 8 graduate credits, through Harvard Extension School. I'm not going to lie...it's grueling.</p><p>The above screenshot, which is rather tongue-in-cheek, is from a test I did of a chat application I wrote using Flask-SocketIO and JavaScript. I had temporarily opened up my development server to my home network, and connected to it with my trusty iPhone. (Hence 'mobile kev', on the iPhone, chatting with 'Kevin' on my Desktop computer). And my 'monologue' with myself is accurate--I do hate CSS, but I'm determined to learn to like it, or at least to get along with it.</p><p>This semester I'm studying the MEAN Stack--MongoDB (and the Mongoose Node.js module), Express, Angular, and Node--in one class...and Python3, Flask, Django, SQLite3, and PostgreSQL--in the other.</p><p>Node.js and the 2 Python web server options I'm working with, Flask and Django, are very different, with Node being pretty agnostic about everything, and extremely modular, and either Python option being extremely opinionated and taking a lot of server-side design decisions out of my hands. I think the initial learning curve to set up a functioning web server with Node (and Express! I wouldn't want to set up a Node server without all of the goodies Express brings into the equation) is higher than doing the same thing with Flask, but in the long run Node offers far more flexibility. And, with a Node-based web server, you've got JavaScript running server-side, and JavaScript running client-side: seems like an easier move between front-end, back-end, and full-stack web development. That having been said, Python is a pretty cool programming language in its own right, and I'm glad to have gotten exposure to it!</p><p>The server frameworks and the programming languages they're written in are only part of the puzzle, though, because of course then you add in templating engines to dynamically generate web pages (it's 2019, who serves static HTML pages anymore? Really!), and that's another bit to learn. Flask forces Jinja2 on the user, which is itself based on (but different from) Django's built-in templating engine. For continuity's sake (and because I've grown to like it), I found a JavaScript port of Jinja2, Nunjucks, that I've been using on my Node-based web apps.</p><p>Then there are the databases! SQL databases in their various flavors were just about the only way I conceived of 'data'...until I was introduced to MongoDB, a NoSQL database. Why is it called 'NoSQL'? Well, unlike SQLite3 and PostgreSQL, which organize data into tables, with increasingly complex relationships with other tables, and more and more 'foreign keys' to tie them together the bigger your app grows, MongoDB looks like, well, JSON, which is safe and familiar to any web developer. Even writing web apps in Python, I still use JSON for my API routes to easily exchange data with client-side JavaScript. A NoSQL database doesn't divide data into tables with their relationships and foreign keys. No, it lets you structure your data pretty much however you want, and since JSON is such a fact of life on the web, its queries look a lot more intuitive and easier to understand than SQL queries. (MongoDB doesn't actually use JSON, it uses BSON, but syntactically it looks very much like JSON).</p><p>All this is to say, I've been really busy with my studies! The good news is, I'm learning a lot, and I enjoy it! I've always liked computers and technology, but 'looking under the hood' of so many web technologies has been enlightening and fun. Hopefully it'll even lead to a new career writing software and making cool apps! Probably for the web at first, but I may move into mobile or even Desktop app writing in the future...why not?</p><p>So that's what I've been up to. If you don't hear from me for a while, trust that my nose is buried inside of a code editor, and I'm writing some application or other in either JavaScript, Python, or a combination of both!</p>"
  }

  // Define a comment for use throughout tests
  let comment = {
    id: 3,
    postId: 6,
    commenter: 'Kevin Reinholz',
    date: '2019-11-16T17:30:53.885+00:00',
    body: "This chat app would've been so much easier with a Vue.js, React, or Angular front-end instead of vanilla JavaScript!"
  }

  // Visit the blog posts page and check to ensure all posts are displaying as expected
  it('Shows all blog posts', () => {
    cy.visit('/posts')

    cy.get('img').should('have.attr', 'alt')

    cy.contains('h2', 'Blog Posts')

    cy.contains(post.title)

    cy.get('.post').should('have.length', 6)

    cy.get('[id="JavaScript, Python, and Databases!"]').click();
    cy.contains('h1', post.title)
  })

  // Visit an individual blog post page and check that it loads as expected
  it('Shows an individual blog post', () => {
    cy.visit('/posts/' + post.id)

    cy.contains('h1', post.title)

    cy.get('img').should('exist')
  })

  // Test save to favorites functionality
  it('Favorites the current post', () => {
    cy.get('[id="add-to-favorites"]').click()
    cy.get('[id="favorited-alert"]').should('exist')
  })

  // Test SocialSharing third party module loading
  // Note - https://docs.cypress.io/guides/references/trade-offs.html#Multiple-tabs explains why it is not feasible to open/test a pop-up
  it('Tests loading of sharing links via 3rd-party SocialSharing module', () => {
    cy.get('[id="twitter-share"]').should('exist')
  })

  // Test display of comments (for a blog post we know to have a specific comment)
  it('Displays comments associated with the current blog post', () => {
    cy.contains(comment.commenter)
    cy.contains(comment.body)
  })

  // Test leaving a new comment on a blog post
  it('Tests leaving a new comment', () => {
    // Test comment that meets criteria
    let testGoodComment = {
      commenter: 'Cypress',
      body: 'This is a test comment left by Cypress during e2e testing'
    }
    // Test comment that doesn't meet criteria
    let testBadComment = {
      commenter: 'A',
      body: 'B'
    }

    // Try leaving a comment that fails validation
    cy.get('[id="commenter"]').type(testBadComment.commenter)
    cy.get('[id="body"]').type(testBadComment.body)
    cy.get('[data-test="new-comment-button"]').click()
    cy.contains('Your name must be at least 3 characters long.')
    cy.contains('Your comment must be at least 10 characters long.')

    // Clear the bad comment - see https://docs.cypress.io/api/commands/clear.html#Syntax
    cy.get('[id="commenter"]').clear()
    cy.get('[id="body"]').clear()

    // Try leaving a comment that passes validation
    cy.get('[id="commenter"]').type(testGoodComment.commenter)
    cy.get('[id="body"]').type(testGoodComment.body)
    cy.get('[data-test="new-comment-button"]').click()
    cy.contains('Cypress')
    cy.contains('This is a test comment left by Cypress during e2e testing')
  })

  // Test categories page/functionality
  it('Shows the different blog categories', () => {
    cy.visit('/categories')
    cy.contains('h2', 'Categories')
    cy.contains('aspirations').click()
    cy.contains('Updated course schedule')
    cy.contains('writing').click()
    cy.contains('Summer Plans')
  })

  // Test the Favorites page/functionality
  it('Favorites a blog post, then removes it', () => {
    cy.visit('/posts/' + post.id)
    cy.get('[id="add-to-favorites"]').click()

    // Go to Favorites page to confirm favorited post is listed
    cy.visit('/favorites')
    cy.contains(post.title)

    // Remove the favorited post
    cy.contains('Remove').click()
    cy.contains('No Favorites')
  })

})