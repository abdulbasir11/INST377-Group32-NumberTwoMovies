import express from 'express';
import fetch from 'node-fetch';

const app = express();
var serverPort = 3000;
var port = process.env.PORT || serverPort;

/* this line is for heroku deployments
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./'));
app.use(express.static('./public'));
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
*/

app.route('/').
  get((req, res) => {
    console.log('GET request detected for main route')
  })
  .post((req, res) => {
    console.log('POST request detected for main route')
  });

  //test GET route that sends some random HTML
  app.get('/test', (req, res) => {
    let name = req.query.name
    let gender = req.query.gender
    res.send("Hello!"+name+"! You are a"+gender)
    console.log('GET request detected for private route')
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});