
document.querySelector('.main-search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
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

    
document.querySelector('.adv-search-form').addEventListener('submit', async (e) => {
    //e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const form = $(e.target).serializeArray();
    fetch('/results', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((fromServer) => fromServer.json())
      .then((jsonFromServer) => console.log(jsonFromServer))
      .catch((err) => {
        console.log(err);
      });
      
    });
    
       
