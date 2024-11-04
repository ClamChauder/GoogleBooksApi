function bookSearch(){
    var search = document.getElementById('search').value
    document.getElementById('results').innerHTML=""
    console.log(search)

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

// function displayBook(data){
//     var template = document.getElementById("template").innerHTML;
//     var compiledTemplate = Handlebars.compile(template);
//     // execute the compiled template and print the output to the console
//     var ourHTML = compiledTemplate(data);

//     var results = document.getElementById("results");
//     results.innerHTML = ourHTML;
// }

document.getElementById('button').addEventListener('click', bookSearch, false)