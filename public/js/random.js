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


// var search = location.search.substring(1);
// if (search.length == 0) {
//     getRandomMovies();
// } else {
//     let data = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
//     console.log(data);

// }

async function getRandomMovies2(url) {
    
    await fetch(url, {
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

var search = location.search.substring(1);
if (search.length > 0) {
    let param = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    let url = '/selection?' + new URLSearchParams(param);
    getRandomMovies2(url);
} else {
    getRandomMovies();
}
