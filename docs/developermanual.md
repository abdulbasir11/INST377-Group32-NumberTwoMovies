# Developer Manual for Number Tw💩 Movies

The audience of this document is future developers who will take over Number Tw💩 Movies system.

They know technical terms and have general knowledge about web applications, but do not have knowledge about Number Tw💩 Movies system design.

We will provide a technical document so that future developers can start setting up the application on their local machines, and keep working on the system development.

The Developer Manual covers:

### How to install Number Tw💩 Movies and all dependencies
1. Clone this repository through Github Desktop (by pressing the Code button) or through the terminal.
2. Open the repository in within VS Code ("Open this repository in VSCode" button in GitHub Desktop) or terminal application.
3. Type ```npm install``` into the terminal window and run.
4. The application will now be ready to use.

### How to run Number Tw💩 Movies on a server
1. For a new OMDb API key, go to OMDb API Key page and request a free key.
2. Change the "API_KEY" in the server.js file with your own api key, specifically where the code says 
```data = await fetch("http://www.omdbapi.com/?i=API_KEY&t=" + encodeURIComponent(title));```. 
3. In the terminal again, type ```npm start```.
4. In a web browser, go to http://localhost:3000/.

### How to run any tests written for Number Tw💩 Movies
Currently, there are no pre-written tests for this project, but users can utilize Cypress to create/run their own written tests. To do this:

1. Follow the installation guide for Cypress [here](https://www.toolsqa.com/cypress/install-cypress/).
2. Open two terminals in the main project directory.
3. In the first terminal, type/run ```npm start```.
4. In the second terminal, type/run ```npm test```.
5. ```npm test``` should automatically open Cypress where you can access any created test files.

### The API for Number Tw💩 Movies server application
#### The ```/results``` endpoint:
##### GET route
 - The ```/results``` GET route is responsible for the "Advance Search" function.
 - Takes four parameters (```mpaa rating, genre, language, runtime```). The value of the specified paramters is individually compared to every movie from ```imdbscrap_dump.json```. If a parameter was passed in, it will return an array of JSON objects with the each movie that matched.
 - The arrays are compared against each other for common elements. If a movie intersects with all arrays, it matches all parameters and is stored in a new array.
 - All matches are shuffled (i.e., the order of the entries is randomized). The first three matches are then sent to the API, and the response is stored in an array and sent via the response object. More can be displayed with additional clicks.
##### Post route
 - The ```/results``` POST route is responsible for the "I'm Feeling Lucky" function.
 - The title of a random movie from all scraped movies is selected.
 - The selected title is sent to the API and the response is sent to the front-end
 
#### The ```/selection``` endpoint:
##### PUT route
 - The ```/selection``` PUT route allows the user to be directed to the details of a movie when clicking the poster.
 - If the title parameter is passed in, it will send the title to the API and send the response to the front end.

### Bugs and future development
- On the movie Results page, if the Advanced Search parameters are extremely specific, clicking the 'Show More' button may sometimes show the same movie as an addditional result. This is because only one movie exists in the API for those specific parameters, and the 'Show More' button passes through the API with those same parameters, thus bringing the same movie result.
- Future development would likely address any redundant or unneccessary requests to the API to ensure the key did not get exhausted.
- Website navigability while maintaining form information as expect is also a area of future development we may be interested in.
- Allowing users to create an account to bookmark movies, review them, share them, and open details on external sites (such as Rotten Tomatoes) would add a layer of depth to the site; however, it is currently quite effective at retrieving and displaying bad movies -- its intended base function.
