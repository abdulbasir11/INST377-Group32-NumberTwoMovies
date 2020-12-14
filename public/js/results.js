function getSpecificMovie() {
    var search = location.search.substring(1);

    //SENDING parameters to GET route;
    //GET route will use the parameters with the
    //new web scraper to match a movie
    console.log(search)
    fetch('/results/?'+search)
    .then((fromServer) => fromServer.json())
    .then((movieList) => {
        console.log(movieList)
        movieList.forEach(data => {
            $(".movie-list").append(`
                <li class="poster">
                    <div>
                        <a href="/selection.html?title=${data.Title}">
                        <img src=${data.Poster}/>
                        </a>
                    </div>
                </li>
            `);
        });
    })
    .catch((err) => {
      console.log(err);
    });

    let data = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    return data;
}
getSpecificMovie();


async function getSelection() {
    
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
        
        $(".summary").text(() => $(".summary").text() + data.Plot);
        
        $(".imdbrating p").text(() => $(".imdbrating").text() + data.imdbRating);
        data.Ratings.map((item, index) => {
            $(".ratings_section").append(`<li><p>${data.Ratings[index].Source}: ${data.Ratings[index].Value}</p></li>`);
        })
        
        $(".mpaarating p").text(() => $(".mpaarating p").text() + data.Rated);
        $(".genre p").text(() => $(".genre p").text() + data.Genre);
        $(".language p").text(() => $(".language p").text() + data.Language);
        $(".runtime p").text(() => $(".runtime p").text() + data.Runtime);
        
        $(".actors p").text(() => $(".actors p").text() + data.Actors);
    })
}
