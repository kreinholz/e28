## P3 Peer Review

+ Reviewer's name: Kevin Reinholz
+ Reviwee's name: Satya Palvadi
+ URL to reviewee's Github repo: <https://github.com/satyapalvadi/e28>

*Answer the following questions in regards to the student's project you are reviewing. Include context and code examples in your answers when relevant.*


### Are you able to produce any errors or unexpected results?

Although not an error, I noticed that console.log() debugging statements were left in the production version of the app. These should have been removed prior to finalizing the application/building for production.

Clearing localStorage does not result in a refresh of the data in the "Home" route. (Still shows 'Paid on: 2019-11-29' until navigating away from, and back to, "Home", or triggering a hard refresh. I think if you review how Professor Buck handled reactivity and localStorage in Weeks 10 and 12, you'll find a quick solution to this problem.

"Pay In Full" button on "Home" does not immediately update the data--navigating away from, and back to, "Home", or triggering a hard refresh is required in order to see that an expense has been "paid." Again, it's a question of reactivity, and if you review Weeks 10 and 12, this should be an easy fix.

### Were there any parts of the interface that you found confusing or unclear?

I liked the "Expenses" route/page. However, each friend should have been named, instead of listed as "p1", "p2", and "p3" in order to maintain consistency with the "Home" and "Friends" routes/pages.

Your JSON data is structured in such a way that each person is associated with an id, e.g. in <https://my-json-server.typicode.com/satyapalvadi/e28-expenser-api2/persons/> you associate a person with an id like so:

```json
{
    "id": "p1",
    "name": "Satya",
    "email": "blah1@gmail.com",
    "phone": "123-123-1234"
}
```
Then, in <https://my-json-server.typicode.com/satyapalvadi/e28-expenser-api2/expenses/> you use a "pid" contained within "splitters" to associate a person with a share of each expense like so:

```json
{
    "id": "e0001",
    "type": "",
    "description": "Shopping at the Mall",
    "amount": "570",
    "date": "10-NOV-2019",
    "paidBy": "p1",
    "split": "yes",
    "splitters": [
      {
        "pid": "p1",
        "splitType": "percent",
        "split": "40"
      },
      {
        "pid": "p2",
        "splitType": "percent",
        "split": "30"
      },
      {
        "pid": "p3",
        "splitType": "percent",
        "split": "30"
      }
    ]
}
```
With this information available, it would've been trivial to name each person sharing expenses, rather than listing their pid. In ExpenseDetail.vue, you display person information like this:

```vue
<div class="line-item" v-for="splitter in expense.splitters" :key="splitter.pid">
    <div><span class="sub-hdg">{{ splitter.pid }}'s share: </span> ${{ (splitter.split * expense.amount)/100 }} </div>
</div>
```
You only pass the prop 'expense' to this component, but if you also passed it 'person' as well, you could cross-reference the pid and id and instead name each splitter instead of listing their id. Alternatively, you could do something similar to what you did in your HomePage.vue component, where you made 2 axios calls, then wrote a function to attribute a person's id to that person's name:

```js
    findFriendName: function(id) {
      let person = this.friends.find(friend => {
        if (friend.id == id) return friend.name;
      });
      return person.name;
    },
```
Since you already know how to attribute a pid to a name, I think it would improve your app to do something similar in ExpensesPage.vue and ExpenseDetail.vue, as you did in HomePage.vue and PersonResponsibility.vue.

On "Home", 'Spent' and (total) 'Expenses' are listed, along with how much each friend has to pay. I would have liked to have been able to expand the 'expenses' to display an itemized list of each friend's share of each expense, drawing on the detailed breakdown in the "Expenses" route/page.

### Are there aspects of the code that you feel were not self-evident and would benefit from comments?

HelloWorld.vue was not a necessary or used component in the project, so the file could have been deleted. The same goes for data.json and data2.json, which appear to have been earlier local testing files used prior to integration with my-json-server.

I felt like your code was clean and it was self-evident what each function was doing, so I didn't see the need for additional comments. I recommend deleting unused/commented out code such as the following in PersonResponsibility.vue:

```vue
<!-- <div> Id: {{ resp.id }} </div> -->
```

### Are there any parts of the code that you found interesting or taught you something new?

I liked how you cross-referenced the person ids and person names in your HomePage.vue component (I already provided a code example above so I won't paste it here again). That was a nice touch.

Nice work with the JavaScript Date object in HomePage.vue! I've found Date() to be non-trivial to work with, and liked how you rose to the challenge:

```js
"paidDate": new Date().toISOString().slice(0,10)
```
You could take it even a step further now that you've converted a JSON string to a Date object, and in PersonResponsibility.vue, do something like this to display the paid in full date in a more human-friendly format:

```js
import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
}

<span>{{yourDateString | formatDate}}</span>
```
See <https://forum.vuejs.org/t/how-to-format-date-for-display/3586/3>. Sadly, Vue doesn't have native support for Date formatting like Angular does, which would allow you to do something simple like:

```ts
<span class="sub-hdg">Paid on: </span> {{ paidDate | date: 'medium' }}
```
But, since Vue doesn't have DatePipe in its templating engine like Angular (<https://angular.io/api/common/DatePipe>), it takes a little more work to format that Date object the way you want it.

### Are there any best practices discussed in course material that you feel were not addressed in the code?

This is more of a hindsight being 20/20 after reviewing Week 12's materials, but naturally, you make a lot of axios calls that could theoretically be consolidated. Vuex would simplify things, reduce redundant axios calls, and make it easier to cross-reference your retrieved data for doing things like associating person names with person ids. I definitely recommending doing that in p4.

### Do you have any additional comments not covered in the above questions?

I know I wrote a lot of comments, and I hope you don't take that negatively! I liked your app, and thought it had a clean, clear interface that was easy to understand and interact with. I had some of the same struggles with my own app, and actually felt reassured seeing somebody else in the same boat as I was--my sense is that you definitely understand how to write a Vue app, but were perhaps crunched for time re some of the cleanup and improvements noted above. I also felt crunched for time on p3, and was less than thrilled with my own submission. Like you, I largely borrowed from zipfoods' scss because working with css (or sass/scss) is one of my weaknesses as a web developer.

I think you've got a great base for p4, and after integrating a Vuex store and making some of the tweaks I suggested, you'll be well on your way!

One feature you might think about adding is the ability to make partial payments--since one of p4's requirements is form validation, offering a partial payment option with a text input would be an ideal place to implement that requirement.