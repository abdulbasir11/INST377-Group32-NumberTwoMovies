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

//route for landing page -- auto redirect to index
app.route('/')
  .get((req, res) => {
    console.log('GET request detected for public route');
    res.redirect('/public');
  })
  
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});