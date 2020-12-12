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
  .get((req, res) => {

    console.log(req.query.mpaarating)
    let runtime = req.query.runtime;
    let startRange = 0;
    let endRange = 0;

    switch (runtime){
      case '40to80' :
        startRange = 40;
        endRange = 80;
        break;
      case '80to120' :
        startRange = 80;
        endRange = 120;
        break;
      case '120to160' :
        startRange = 120;
        endRange = 160;
        break;
      case '160plus' :
        startRange = 160;
        break;
    }

    let json_obj = {'mpaarating:' : req.query.mpaarating, 'genre' : req.query.genre, 'language': req.query.language, 'startRange' : startRange, 'endRange' : endRange};

    res.json(json_obj)

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