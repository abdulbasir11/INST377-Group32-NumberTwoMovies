document.querySelector('.init-search').addEventListener('click', function(){
    //template for fetching text/json/any file from server
    fetch('/test_res.txt')
    .then((response) => response.text())
    .then((responsetext) => {
       document.querySelector('.header').innerHTML = "<h1>fetched this from server: "+responsetext+"<h1>"
    });
});