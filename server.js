import express from 'express';
import fetch from 'node-fetch';

const app = express();
var serverPort = 3000;
var port = process.env.PORT || serverPort;

// this line is for heroku deployments
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/')
  .get((req, res) => {
    console.log('GET request detected');
    //GET code goes here
    //Reserve this route for searches?
    //console.log('fetch request data', json)
  })


  .post(async(req, res) => {
    console.log('POST request detected');
    //const data = await fetch();
    //const json = await data.json();
    //console.log('fetch req data:', data);
    //res.json(json);
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
