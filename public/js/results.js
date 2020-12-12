function getSpecificMovie() {
    var search = location.search.substring(1);
    let data = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    return data;
}
console.log(getSpecificMovie())

async function getAllMovie() {
    const getMovie = await fetch(`/server_files/movieList.txt`)
    const movielist = await getMovie.text();
    let titles = movielist.split('\n');
    console.log(titles.slice(0,2))

    // const data = lines.slice(0,2).map(async (mov) => {
    //     const d = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=5606a178&t="+mov)
    //     .then((res) => res.json());
    //     return d;
    // })
    
    let moviesData = [];
    titles.forEach((t) => {
        
    })
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=bd165689=xXx").then((res) => {moviesData.push(res.json())})
    
    console.log(moviesData);
    return moviesData;
}

console.log(getAllMovie());

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
