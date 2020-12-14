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
  })
  .post((req, res) => {
    console.log('POST request detected for main route')
  });

app.route('/results')
  .get(async (req, res) => {
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

    //HERE'S THE DUMP! NOTE that it is not the full dump!
    const dump = await fetch(`${server}/server_files/imdbscrape_dump.json`)
    const dumpjson = await dump.json()

    //my initial thoughts for finding matches and returning an array for each based on it
    //-1 is a sentinel value for rejecting. don't be afraid of the ternary. he's nice once you get to know him.
    let mpaamatches = (req.query.mpaarating) ? searchSingle(dumpjson,'mpaarating',req.query.mpaarating) : -1
    let genrematches = (req.query.genre) ? searchMultiple(dumpjson,'genre',req.query.genre) : -1
    let languagematches = (req.query.language) ? searchMultiple(dumpjson,'language',req.query.language) : -1
    let runtimematches = (req.query.runtime) ? searchRange(dumpjson,'runtime',startRange,endRange) : -1

    //shove them all in an array
    let matches_unprocessed = [];
    matches_unprocessed.push(mpaamatches)
    matches_unprocessed.push(genrematches)
    matches_unprocessed.push(languagematches)
    matches_unprocessed.push(runtimematches)

    //remove the -1s. they were super lame anyway
    matches_unprocessed = removeSentinels(matches_unprocessed)

    //digusting unreadable pyramid of doom thing. Don't look at it too closely. It bites.
    //But, essentially, returns common elements across all arrays. If an array is empty,
    //this won't return anything (as intended). IT'S NOT A BUG. I THINK.
    var matches = matches_unprocessed.shift().reduce(function(res, v) {
      if (res.indexOf(v) === -1 && matches_unprocessed.every(function(a) {
          return a.indexOf(v) !== -1;
      })) res.push(v);
      return res;
  }, []);

    //grab the titles and prepare them to send to the api
    let matchedTitles = matches.map(match => match.title)

    //limit to 3 maximum. The PUT method can "load more". But, due to access
    //token restictions (1000 per day per key). we have to be
    //a bit... frugal. But it's fine because it lets us fulfill
    //a requirement anyway
    let counter = 0
    let top3_req = ""
    let top3 = ""
    let top3_json = []

    for (var i = 0; i<matchedTitles.length; i++){
      if (!(counter > 2)){
      top3_req = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=7d48a482&t="+encodeURIComponent(matchedTitles[i])); 
      top3 = await top3_req.json()
      await top3_json.push(top3)
      counter++
      }
    }

    res.json(top3_json)

  })
  .post(async (req, res) => {
    console.log(req);
    const getMovie = await fetch(`${server}/server_files/movieList.txt`)
    const movielist = await getMovie.text();
    let lines = movielist.split('\n');
    let movie = lines[Math.floor(Math.random()*lines.length)];

    console.log('POST request detected');

    const data = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=7d48a482&t=" + encodeURIComponent(movie));
    const json = await data.json();
    res.json(json);
  });

app.route('/selection')
  .get(async (req, res) => {
    console.log(req.params);
  })
  .put(async (req, res) => {
    let title = req.query.title;
    let data;
    if (title.length > 0) {
      data = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=7d48a482&t=" + encodeURIComponent(title));
    } else {
      const getMovie = await fetch(`${server}/server_files/movieList.txt`)
      const movielist = await getMovie.text();
      let lines = movielist.split('\n');
      let movie = lines[Math.floor(Math.random()*lines.length)];
  
      data = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=7d48a482&t=" + encodeURIComponent(movie));
    }
    const json = await data.json();
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

//searches for a single value against a single value
function searchSingle(arr, field, val){
  let results = []
  if (val){

    for (var i = 0; i < arr.length; i++){
      if (arr[i][field] == val) {
        results.push(arr[i]);
      }
    }

  }
  return results;
}

//searches for a value in an array of values. for e.g., if a movie has multiple genres
//(comedy,drama != dramedy, according to JS. The pencil pushers at ISO hate colloquialisms.
//And fun. Misanthropes, really)
function searchMultiple(arr, field, val){
  let results = []
  if (val){

    for (var i = 0; i < arr.length; i++){
      for (var j = 0; j < arr[i][field].length; j++){

        if (arr[i][field][j].toUpperCase() == val.toUpperCase()) {
          results.push(arr[i]);
        }

      }

    }

  }
  return results;
}

//searches for a number within a range from the json dump
function searchRange(arr, field, lower, upper){
  let results = []
    if (upper){
      for (var i = 0; i < arr.length; i++){
        if (parseInt(arr[i][field]) > parseInt(lower) && parseInt(arr[i][field]) < parseInt(upper)) {
          results.push(arr[i]);
        }
      }
    } else{
      for (var i = 0; i < arr.length; i++){
        if (arr[i][field] > lower) {
          results.push(arr[i]);
        }
      }
    }

  return results;
}

//removes objects from list of arrays that are not arrays.. I think
function removeSentinels(arr){
  let results = [];
  for (var i = 0; i < arr.length; i++){
    if (Array.isArray(arr[i])){
      results.push(arr[i]);
    }
  }
  return results
}