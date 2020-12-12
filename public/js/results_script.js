async function getParameterizedMovie() {
    await fetch('/results.html', {
        method: 'GET', // or 'PUT'
    })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => console.log(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
}

getParameterizedMovie();