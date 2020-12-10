import express from 'express';
import fetch from 'node-fetch';


const app = express();
var serverPort = 3000;
var port = process.env.PORT || serverPort;
const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://number-two-movies.herokuapp.com/';

/* this line is for heroku deployments
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./'));
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.route('/').
  get(async(req, res) => {
    console.log('GET request detected for main route')
    console.log('GET request detected');
    console.log(req.query.mpaarating)
    let rating = req.query.mpaarating;
    let genre = req.query.genre;
    res.json({mpaarating : rating})
  })
  .post((req, res) => {
    console.log('POST request detected for main route')
  });

app.route('/results')
  .get(async (req, res) => {
    console.log('GET request detected!!!');
    console.log(req.query.mpaarating)
    console.log(req.query.genre)
    console.log(req.query.language)
    console.log(req.query.runtime)
    res.json(req.query.mpaarating+" "+req.query.genre+" "+req.query.language+" "+req.query.runtime)
  })
  .post(async (req, res) => {

    const getMovie = await fetch(`${server}/server_files/movieList.txt`)
    const movielist = await getMovie.text();
    let lines = movielist.split('\n');
    let movie = lines[Math.floor(Math.random()*lines.length)];

    console.log('POST request detected');
    const data = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=5606a178&t="+movie);
    const json = await data.json();
    res.json(json);
  })

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});