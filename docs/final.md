# Number Tw💩 Movies
## Team members
  - Abdul-B. A.
  - Carl J.
  - Joseph K.
  - Mary T.
  - Samantha D.
### Link to working application
  - [Heroku](https://number-two-movies.herokuapp.com/)
### Information problem
  - The information problem we’re hoping to solve is a lack of sites or apps that explicitly recommend bad movies; for people seeking “good” movie recommendations, there are several sites (e.g., FlickMetrix, Movie of the Night, etc). However, for people seeking “bad” movies recommendations, there are few options.
### Identified stakeholders/target browsers
  - A person may want to seek out a “bad” (i.e., low-rated movie) to watch with friends, criticize, or talk and laugh over as opposed to watch seriously. Additionally, film companies could benefit from more attention to negatively reviewed films.
### Data we chose to work with
  - The API we chose to work with is the OMDb API. It contains an incredible number of movies, contains the necessary fields to build the proposed website, and is well-organized (returning detailed JSON objects for any particular movie). With it, searching for movies based upon rating is relatively simple to implement.
### Chosen strategies and solutions for the problem
  - The system we propose as the solution is a website that takes a ‘unique’ approach to discovering movies. Instead of giving serious recommendations, the site will recommend by ‘low-rating,’ guaranteeing users the worst movies. Users will not be able to adjust the critical score search parameter; it will be fixed to be below 50% for all movies displayed. However, other search parameters about the movies (such as MPAA rating, genre, and more) will be editable.
### Technical system decision rationale
  - For the front-end part of this project, we will be using HTML, CSS, JScript and jQuery. HTML is necessary for displaying web pages. We plan to use base CSS for the majority of our styling needs. And we plan to primarily use JavaScript along with jQuery for manipulating the DOM as necessary.
  - As for the target screen sizes, we are targeting both Android devices and PCs, which have screen sizes of 1920px by 1080px (PCs) and 640dp by 480dp (android). We plan to make our user interface responsive so that it will automatically resize on all devices.
  - For the back-end part of this project, we will not have our own database that stores our data needed; instead we will be using API (IMDb API) upon access (passthrough). We will be using NodeJS for the server, and ExpressJS web framework for creating necessary APIs and web servers of our own (if needed).
### How/if our final system helps to address the problem
  - Again, our application will search for movies that are rated subpar. This is less common than searching for movies 'that are good.' Users who want an alternative/unique way to search for new movies to watch can use our application, either by a random movie generator or by specific parameters.
### Challenges faced and impact on final design
  - The complexity of allowing users to search through a form and then selecting a result from that form to use as a search parameter was something we had trouble with. 
### Possible future work directions with this problem
  - If more opportunities arise to work with this application, it would be ideal to work on the CSS/layout. As is, it is bare-bones and not very modern. Adding gradients, curved edges, and so forth can make the web application friendlier to look at.
