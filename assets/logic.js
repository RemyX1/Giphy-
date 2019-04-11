        
        var topicArray = ["Natsu Dragneel", "Erza Scarlet", "Gray Fullbuster", "Lucy Heartfilia",  "Laxaus Dreyar"]
        var Newtop = $("#Topic").val()

        buttonmaker = function() {

            topicArray.forEach(element => {
                
                var button = $("<button>")
                button.attr("id", element)
                button.html(element)
                button.addClass("tb")
                $("#Tdiv").append(button)

            });




        }

        buttonmaker()

    $(document).ready(function(){

        $("#add").on("click", function(){

            event.preventDefault()
            topicArray.push($("#Topic").val())
            $("#Tdiv").html("")
            buttonmaker()



        })



          $(document).on("click",".tb", function() {
 
        var topic = $(this).attr("id")
  
      
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=UXmFAewOa37AsXcm9oZbY063PyGMCOr4";
  
   
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          
          .then(function(response) {
          
            
            var results = response.data;
            $("#Div").html("")
            
            for (var i = 0; i < 10; i++) {
                
              
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          
                var gifDiv = $("<div>");

                $("#Div").append(gifDiv)
               
                var rating = results[i].rating;
  
               
                
                var p = $("<p>")
                p.text("Rated: "+rating)
  
               
                var personImage = $("<img>");
  
               
                personImage.attr("src", results[i].images.fixed_height.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.addClass("content")
  
                gifDiv.append(personImage);
                gifDiv.append(p);
                
            
                $("#gifs-appear-here").prepend(gifDiv);
              }
            }
          });
      });

    })


    $(document).on("click",".content", function() {
       
        var state = $(this).attr("data-state");
      
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });