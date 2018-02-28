const express = require('express');

const app = express();
const fs = require('fs');

contents = fs.readFileSync('names.txt', 'utf8')
contents = contents.split('\r\n')
contents = contents.filter(content => content !== '');
// console.log(contents);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.status(200).json(contents)
})

app.get('/names', (req, res) => {
  const regex = new RegExp('^' + req.query.name, 'i');
  const newContents = contents.filter(content => regex.test(content));
  console.log(newContents);
  console.log('', req.query.name)
  res.status(200).json(newContents)
})

app.listen(3000, () => console.log('App start at port 3000...'));