# How Number Tw💩 Movies Works
- This application takes a unique approach to discovering movies. Instead of giving 'good movie' recommendations, the site will recommend by ‘low-rating,’ guaranteeing users the worst movies. Users will not be able to adjust the critical score search parameter; it will be fixed to be below 50% for all movies displayed. However, other search parameters about the movies (such as MPAA rating, genre, and more) will be editable. 
- The application works with an API (application programming interface) and passes through it depending on either: a single, random search ("Im Feeling Lucky!") or a specific, filtered set of parameters ("Filtered/Advanced Search").
- The API being worked with is the IMDb public database. For this application, the results will be dealing with facets like MPAA rating, Genre, Language, and Runtime.

## I’m Feeling Lucky!
- The "I'm Feeling Lucky!" button generates and shows the user one randomly selected 'bad movie.' This button allows for no specific search parameters, and each movie  

### Filtered/Advanced Search
- The "Filtered/Advanced Search" button allows for users to input specific parameters for facets like MPAA Rating, Genre, Language, and Runtime.

### MPAA Rating
- Users can search for specific movie ratings. MPAA Ratings include G, PG, PG-13, R, and NC-17. Some movies in the IMDb API database have no MPAA rating, or N/A.

### Genre
- Users can search for specific movie genres. There are a vast amount of movie genres, but a few examples include Action, Suspense, Thriller, Horror, and Crime.

### Language
- Users can search for specific movie languages. There are many languages for movies, but a few examples include English, Spanish, Turkish, Korean, and Finnish. 

### Runtime
- Users can search for specific movie runtimes. Runtimes in the IMDb API database are in minutes. If searching for a movie that is an hour and a half long, users can input '90' (for 90 minutes) into the search box. 