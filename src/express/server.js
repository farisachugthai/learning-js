const express = require('express');
const app = express()

const mockUserData = [
  {name: 'Mark'},
  {name: 'Jill'},
]

/* In Express URLs, words with a colon in front of them are treated as vars.
 * You can access the value of each variable through req.params
 * Note: Running this file and going to localhost:8000 won't work
 * Go to localhost:8000/users/whatever-name-you-want
 * Then open up the console and see if something logged. For example
 * `yarn start`
 * and then directing a browser to
 * http:localhost:8000/users/mark
 * will display mark
 */
app.get('/users/:id', function (req, res) {
  console.log(req.params.id)
  res.json({
    success: true,
    message: 'got 1 user. Nice!',
    user: req.params.id
  })
})

app.listen(8000, function () {
  console.log("server is running")
})
