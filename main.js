function bookSearch(){
    var search = document.getElementById('search').value
    document.getElementById('results').innerHTML=""
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
        type: 'GET',

        success: function(data){
            // results.innerHTML = "";
            // for(var i = 0; i < data.items.length; i++){
            //     results.innerHTML += "<div class='book'>" + "<h2>" + data.items[i].volumeInfo.title + "</h2>" + "</div>";            
            // }
            var template = document.getElementById("template").innerHTML;
            var compiledTemplate = Handlebars.compile(template);
            var ourHTML = compiledTemplate(data);
            var results = document.getElementById("results");
            results.innerHTML = ourHTML;
        },
    });
}

Handlebars.registerHelper('generateLink', 
    function(title, id) {
        //replace spaces in the book's title with underscores
        var convertedTitle = title.replace(/[^a-zA-Z]/g, "_");
        //forms the url for the info page
        var link = "https://www.google.com/books/edition/" + convertedTitle + "/" + id;
        return link;
});

document.getElementById('button').addEventListener('click', bookSearch, false)