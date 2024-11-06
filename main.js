//loads data that was previously saved from the previous search
window.onload = function(){
    const savedData = localStorage.getItem('bookData');
    if(savedData){
        const data = JSON.parse(savedData);
        displayData(data);
    }
}

function bookSearch(){
    var search = document.getElementById('search').value
    document.getElementById('results').innerHTML=""
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
        type: 'GET',

        success: function(data){
            //Saves data to local storage, for onload function above
           localStorage.setItem('bookData', JSON.stringify(data));
           displayData(data);
        },
    });
}

function displayData(data){
    var template = document.getElementById("template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var ourHTML = compiledTemplate(data);
    var results = document.getElementById("results");
    results.innerHTML = ourHTML;
}

//Helper functions allows you to use functions inside the handlebars script, otherwise everything inside has to be html or handlebars
Handlebars.registerHelper('generateLink', 
    function(title, id) {
        //replace spaces in the book's title with underscores
        var convertedTitle = title.replace(/[^a-zA-Z]/g, "_");
        //forms the url for the info page
        var link = "https://www.google.com/books/edition/" + convertedTitle + "/" + id;
        return link;
});

document.getElementById('button').addEventListener('click', bookSearch, false)