$(document).ready(function () {
  
  var searchInput; // set to input val in function
  var url; // Wikipedia API search link
  var results; // number of titles returned from search
  
  // function to retrieve articles from user input
  var getArticles = function() {
    
    searchInput = $("#search-box").val();
    url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&format=json&callback=?";
    
    // ajax call to retrieve relevant data
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data) {
        results = data[1];
        // clear previous results before displaying 
        $(".articles").empty();
        
        // search yields no relevant results
        if (results.length == 0) {
          $('#inline').append(".articles { grid-template-columns: 1fr; grid-column: 2; } @media only screen and (max-width: 926px) { .articles { grid-column: 2;} @media only screen and (max-width: 767px) { .articles { grid-column: 1/4;}}");
          // display error message
          $(".articles").append('<div class="entry"><h3>"' + searchInput + '" yielded no results</h3><p>Oh well, here\'s a link to a random article for all your effort.</p><a id="read" target="_blank" href="https://en.wikipedia.org/wiki/Special:Random">RANDOM ARTICLE</a></div>');
        }
        
        // display entries
        for (var i = 0; i < results.length; i++) {
          // adapt grid to number of entries
          if (results.length == 1 || results.length == 2) {
            $('#inline').append(".articles { grid-template-columns: 1fr; grid-column: 2; } @media only screen and (max-width: 926px) { .articles { grid-column: 2;} @media only screen and (max-width: 767px) { .articles { grid-column: 1/4;}}");
          } else {
            $('#inline').empty();
          } // end if
          
          $(".articles").append('<div class="entry"><h3>' + results[i] + '</h3><p>' + data[2][i] + '</p><a id="read" target="_blank" href="' + data[3][i] + '">READ ARTICLE</a></div>');
          
        } // end for loop 
      }
      
    }); // end ajax call
    
  }; // end getArticles function
  
  // click button to search
  $("#search-button").click(function() {
    getArticles();
  });
  
  // on enter to search
  $("#search-box").on("keyup", function(event) {
        if (event.which === 13) {
          getArticles();
        }
  });
  
});

/*

Wikipedia url:
https://en.wikipedia.org/w/api.php?action=opensearch&search= + input + &format=json&callback=?


*/
