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
    })
}

getRandomMovies();