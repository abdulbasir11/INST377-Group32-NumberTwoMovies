async function getRandomMovies() {
    
    await fetch('/results', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        $("#poster-img").attr("src",data.Poster);
        $(".movietitle").text(data.Title);
        
        $(".imdbrating p").text(() => $(".imdbrating").text() + data.imdbRating);
        data.Ratings.map((item, index) => {
            $(".ratings_section").append(`<li><p>${data.Ratings[index].Source}: ${data.Ratings[index].Value}</p></li>`);
        })
        
        $(".mpaarating").text(() => $(".mpaarating").text() + data.Rated);
    })
}

getRandomMovies();