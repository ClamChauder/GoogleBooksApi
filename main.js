//loads data that was previously saved from the previous search
window.onload = function(){
    const savedData = sessionStorage.getItem('bookData');
    if(savedData){
        const data = JSON.parse(savedData);
        displaySearch(data);
    }
}

// READING THE .JSON FILE WHERE THE SCRAPER PUTS THE BESTSELLER INFO
document.addEventListener('DOMContentLoaded',function(){
    fetch('books.json')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
            //Displays 5 books in the div with the given id name using handlebars template
            displayBestSellers(document.getElementById('fiction'), data.slice(0,5));
            displayBestSellers(document.getElementById('nonfiction'), data.slice(5,10));
            displayBestSellers(document.getElementById('advice'), data.slice(10,15));
            displayBestSellers(document.getElementById('hardcover_children'), data.slice(15,20));
            displayBestSellers(document.getElementById('children_picture'), data.slice(20,25));
            displayBestSellers(document.getElementById('children_YA'), data.slice(25,30));
            displayBestSellers(document.getElementById('hardcover_YA'), data.slice(30,35));
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    }); 
})

// highlights the active navbar tab 
function setActive(name) {
    var currentActive = document.getElementById("active");

    if (currentActive) {  // Check if the element is not null. If yes, delete the 'active' id
        currentActive.removeAttribute('id');
    } else {
        console.log('Element with id ' + name + ' not found.');
    }
    
    // returns a list of elements, so you have to loop through to use setAttribute().
    var elements = document.getElementsByClassName(name); 
    for(element of elements){
        element.setAttribute("id", "active");
    }
}    

function dropdown(){
    document.getElementById("dropdown").classList.toggle("show");
}

function subjectSearch(subject){
    document.getElementById('results').innerHTML="";
    var search_results = document.getElementById('search-results');
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?langRestrict=en&q=subject:" + subject + "&orderBy=newest",
            dataType: "json",
            type: 'GET',
    
            success: function(data){
                //Saves data to local storage, for onload function above
                sessionStorage.setItem('bookData', JSON.stringify(data));
                //hides the best sellers display and replaces it with search results
                topsellers.style.display = 'none';
                search_results.style.display = 'flex';
                displaySearch(data);
            },
        });
    
}

//when you click on the "Book Finder" header, it sends you back to the bestsellers display(home menu) if it is not already displayed
function homeMenu(){   
    if(topsellers.style.display = 'none'){
        topsellers.style.display = 'inline-block';
        var search_results = document.getElementById('search-results');
        search_results.style.display = 'none';
    }

}

function bookSearch(event){
    if(event.key == 'Enter'){
        var search = document.getElementById('search').value
        document.getElementById('results').innerHTML="";
        var search_results = document.getElementById('search-results');
        //conducts the ajax request if theres something in the search bar
        if(search.trim() !== ''){
            $.ajax({
                url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "+intitle:" + search + "&orderBy=newest&langRestrict=en",
                dataType: "json",
                type: 'GET',
        
                success: function(data){
                    //Saves data to local storage, for onload function above
                    sessionStorage.setItem('bookData', JSON.stringify(data));
                    //hides the best sellers display and replaces it with search results
                    topsellers.style.display = 'none';
                    search_results.style.display = 'flex';
                    displaySearch(data);
                },
            });
        }
        else{
            topsellers.style.display = 'inline-block';
            search_results.style.display = 'none';
        }
    }
}

//Uses "search-bestsellers" template to display the best sellers from the New York Times.
function displayBestSellers(container, data){
    var template = document.getElementById('search-bestsellers').innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var ourHTML = compiledTemplate(data);
    container.innerHTML += ourHTML;
}

//Uses "search-template" to display the search results
function displaySearch(data){
    var template = document.getElementById("search-template").innerHTML;
    var compiledTemplate = Handlebars.compile(template);
    var ourHTML = compiledTemplate(data);
    var results = document.getElementById("results");
    results.innerHTML = ourHTML;
}

//Helper functions allows you to use functions inside the handlebars script in the html file, otherwise everything inside has to be html or handlebars
//Generates the link to search by title
Handlebars.registerHelper('titleLink', 
    function(title, id) {
        //replace spaces in the book's title with underscores
        var convertedTitle = title.replace(/[^a-zA-Z]/g, "_");
        //forms the url for the title page
        var link = "https://www.google.com/books/edition/" + convertedTitle + "/" + id;
        return link;
});

Handlebars.registerHelper('titleLink2', 
    function(title, author) {
        //forms the url for the title page
        var link = "https://www.google.com/search?q=" + title + "&inauthor:" + author; 
        return link;
});

//Generates the link to search by author
Handlebars.registerHelper('authorLink', 
    function(author) {
        var link = "https://www.google.com/search?sca_esv=280a44b9c274f648&udm=36&udm=36&q=inauthor:\"" + author + "\"";
        return link;
});

document.getElementById('search').addEventListener('keypress', bookSearch, false)