//loads data that was previously saved from the previous search
window.onload = function(){
    const savedData = sessionStorage.getItem('bookData');
    if(savedData){
        const data = JSON.parse(savedData);
        displayData(data);
    }
}
// JSON DATA REFERENCE LINK: https://www.googleapis.com/books/v1/volumes?q=harrypotter

function bookSearch(event){
    if(event.key == 'Enter'){
        var search = document.getElementById('search').value
        document.getElementById('results').innerHTML="";

        var top100 = document.getElementById('top100');
        var search_results = document.getElementById('search-results');

        console.log(search);
        //conducts the ajax request if theres something in the search bar
        if(search.trim() !== ''){
            $.ajax({
                url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
                dataType: "json",
                type: 'GET',
        
                success: function(data){
                    //Saves data to local storage, for onload function above
                    sessionStorage.setItem('bookData', JSON.stringify(data));
                    //hides the best sellers display and replaces it with search results
                    topsellers.style.display = 'none';
                    search_results.style.display = 'flex';
                    displayData(data);
                },
            });
        }
        else{
            topsellers.style.display = 'inline-block';
            search_results.style.display = 'none';
        }
    }
}

function displayData(data){
    var template = document.getElementById("template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var ourHTML = compiledTemplate(data);
    var results = document.getElementById("results");
    results.innerHTML = ourHTML;
}

//Helper functions allows you to use functions inside the handlebars script, otherwise everything inside has to be html or handlebars
Handlebars.registerHelper('titleLink', 
    function(title, id) {
        //replace spaces in the book's title with underscores
        var convertedTitle = title.replace(/[^a-zA-Z]/g, "_");
        //forms the url for the title page
        var link = "https://www.google.com/books/edition/" + convertedTitle + "/" + id;
        return link;
});

Handlebars.registerHelper('authorLink', 
    function(author) {
        var link = "https://www.google.com/search?sca_esv=280a44b9c274f648&udm=36&udm=36&q=inauthor:\"" + author + "\"";
        return link;
});

// document.getElementById('button').addEventListener('click', bookSearch, false)
document.getElementById('search').addEventListener('keypress', bookSearch, false)