
document.body.addEventListener('submit', async (e) => {
    //template for fetching text/json/any file from server
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const form = $(e.target).serializeArray();
    fetch('/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((fromServer) => fromServer.json())
      .then((jsonFromServer) => console.log(jsonFromServer))
      .catch((err) => {
        console.log(err);
      });
      
    });
    
       
