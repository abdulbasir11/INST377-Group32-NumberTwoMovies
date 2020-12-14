# Developer Manual for Number Tw💩 Movies

The audience of this document is future developers who will take over Number Tw💩 Movies system.

They know technical terms and have general knowledge about web applications, but do not have knowledge about Number Tw💩 Movies system design.

We will provide a technical document so that future developers can start setting up the application on their local machines, and keep working on the system development.

The Developer Manual covers:

### How to install Number Tw💩 Movies and all dependencies
1. Clone this repository through Github Desktop (by pressing the Code button) or through the terminal.
2. Open the repository in within VS Code ("Open this repository in VSCode" button in GitHub Desktop) or terminal application.
3. Type 'code'npm install'code' into the terminal window and run.
4. The application will now be ready to use.

### How to run Number Tw💩 Movies on a server
1. For a new OMDb API key, go to OMDb API Key page and request a free key.
2. Change the key in the server.js file, specifically where the code says data = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=7d48a482&t=" + encodeURIComponent(title)); . 
3. In the terminal again, type npm start.
4. In a web browser, go to http://localhost:3000/.

### How to run any tests written for Number Tw💩 Movies
Currently, there are no pre-written tests for this project, but users can utilize Cypress to create/run their own written tests. To do this:

1. Follow the installation guide for Cypress here.
2. Open two terminals in the main project directory.
3. In the first terminal, run npm start.
4. In the second terminal, run npm test.
5. npm test should automatically open Cypress where you can access any created test files.

### The API for Number Tw💩 Movies server application - all GET, POST, PUT, etc endpoints, and what they each do
- 

### A clear set of expectations around known bugs and a road-map for future development
- On the movie Results page, if the Advanced Search parameters are extremely specific, clicking the 'Show More' button may sometimes show the same movie as an addditional result. This is because only one movie exists in the API for those specific parameters, and the 'Show More' button passes through the API with those same parameters, thus bringing the same movie result. 
