import { expect } from 'chai'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ShowBlogPost from '@/components/ShowBlogPost.vue'

describe('ShowBlogPost.vue', () => {
  it('displays a blog post retrieved from API', () => {

    // Define a blog post for use during test
    let post = {
      title: 'JavaScript, Python, and Databases!',
      image: 'chat-getting-closer-2019-03-22-overlap-fixed-iphone.png',
      date: '2019-03-28T19:59:25.544+00:00',
      id: 6,
      content: "<p>I haven't posted in a while, and the reason for that is simple: my days have been consumed with Computer Science coursework! This semester, I'm taking 2 Master's level classes, for a total of 8 graduate credits, through Harvard Extension School. I'm not going to lie...it's grueling.</p><p>The above screenshot, which is rather tongue-in-cheek, is from a test I did of a chat application I wrote using Flask-SocketIO and JavaScript. I had temporarily opened up my development server to my home network, and connected to it with my trusty iPhone. (Hence 'mobile kev', on the iPhone, chatting with 'Kevin' on my Desktop computer). And my 'monologue' with myself is accurate--I do hate CSS, but I'm determined to learn to like it, or at least to get along with it.</p><p>This semester I'm studying the MEAN Stack--MongoDB (and the Mongoose Node.js module), Express, Angular, and Node--in one class...and Python3, Flask, Django, SQLite3, and PostgreSQL--in the other.</p><p>Node.js and the 2 Python web server options I'm working with, Flask and Django, are very different, with Node being pretty agnostic about everything, and extremely modular, and either Python option being extremely opinionated and taking a lot of server-side design decisions out of my hands. I think the initial learning curve to set up a functioning web server with Node (and Express! I wouldn't want to set up a Node server without all of the goodies Express brings into the equation) is higher than doing the same thing with Flask, but in the long run Node offers far more flexibility. And, with a Node-based web server, you've got JavaScript running server-side, and JavaScript running client-side: seems like an easier move between front-end, back-end, and full-stack web development. That having been said, Python is a pretty cool programming language in its own right, and I'm glad to have gotten exposure to it!</p><p>The server frameworks and the programming languages they're written in are only part of the puzzle, though, because of course then you add in templating engines to dynamically generate web pages (it's 2019, who serves static HTML pages anymore? Really!), and that's another bit to learn. Flask forces Jinja2 on the user, which is itself based on (but different from) Django's built-in templating engine. For continuity's sake (and because I've grown to like it), I found a JavaScript port of Jinja2, Nunjucks, that I've been using on my Node-based web apps.</p><p>Then there are the databases! SQL databases in their various flavors were just about the only way I conceived of 'data'...until I was introduced to MongoDB, a NoSQL database. Why is it called 'NoSQL'? Well, unlike SQLite3 and PostgreSQL, which organize data into tables, with increasingly complex relationships with other tables, and more and more 'foreign keys' to tie them together the bigger your app grows, MongoDB looks like, well, JSON, which is safe and familiar to any web developer. Even writing web apps in Python, I still use JSON for my API routes to easily exchange data with client-side JavaScript. A NoSQL database doesn't divide data into tables with their relationships and foreign keys. No, it lets you structure your data pretty much however you want, and since JSON is such a fact of life on the web, its queries look a lot more intuitive and easier to understand than SQL queries. (MongoDB doesn't actually use JSON, it uses BSON, but syntactically it looks very much like JSON).</p><p>All this is to say, I've been really busy with my studies! The good news is, I'm learning a lot, and I enjoy it! I've always liked computers and technology, but 'looking under the hood' of so many web technologies has been enlightening and fun. Hopefully it'll even lead to a new career writing software and making cool apps! Probably for the web at first, but I may move into mobile or even Desktop app writing in the future...why not?</p><p>So that's what I've been up to. If you don't hear from me for a while, trust that my nose is buried inside of a code editor, and I'm writing some application or other in either JavaScript, Python, or a combination of both!</p>"
    }

    const wrapper = shallowMount(ShowBlogPost, {
      propsData: { post },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.text()).to.include(post.title)
  })
})
