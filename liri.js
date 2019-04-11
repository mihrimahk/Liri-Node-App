//Required 
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var inquirer = require('inquirer'); 

//For Spotify keys
const env = process.env;

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//Input on CLI
var query = process.argv;
var type = process.argv[2];
var array = [];

//Loop through and join name of arguments after file name
for (var i = 3; i < query.length; i++) {
    array.push(query[i]);
    array.push("+")
}

array.splice(-1); //Get rid of last plus sign, if left errors caused
var finalSearch = array.join(""); //Search query joined together to form string for any query below


// Inquirer //
console.log("==============================================");
console.log("Hi, I'm LIRI! (^_^) \nPlease select one of the following commands to get started.")
console.log("==============================================");

inquirer.prompt ([
    {
        type: "list",
        name: "command",
        message: "Please select a command:",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    }
]).then(function(choice){
    if (choice.command === "concert-this") {
        inquirer.prompt([

            {
              type: "input",
              name: "concert",
              message: "Please enter your concert name:"
            }
            ]).then(function(concertName) {
                 finalSearch= concertName.concert;
                concertThis();
            })
        
    }
    if (choice.command === "spotify-this-song") {
        inquirer.prompt ([
            {
                type: "input",
                name: "song",
                message: "Please enter a song name:"  
            }
        ]).then(function(songTitle){
             finalSearch = songTitle.song;
            spotifyThis();

        })
       
    } 
    if (choice.command === "movie-this") {
        inquirer.prompt([

            {
              type: "input",
              name: "movie",
              message: "Please enter a movie title:"
            }
            ]).then(function(movieTitle) {
                    finalSearch = movieTitle.movie;
                movieThis();
            })
    }
    if (choice.command === "do-what-it-says") {
        doThis();
    }

});

// concert-this (Bands in Town) : Function for Concert Info

function concertThis() {
    if (finalSearch === "") {
        console.log('\n')
        console.log("No Artist entered. Please enter an Artist")
        console.log('\n')
    } else {
        axios.get("https://rest.bandsintown.com/artists/" + finalSearch + "/events?app_id=codingbootcamp").then(
        function (response) {
           if(response.data.length <= 0) {
               console.log("No info for this Artist")
           }else {
            for(var i=0; i < response.data.length; i++) {

                var currData = `\n
    Venue: ${response.data[i].venue.name}
    Location: ${response.data[i].venue.city + ", " + response.data[0].venue.region}
    Event Date: ${moment(response.data[i].datetime).format('LL')}
            `
            console.log(currData)
            }
           }
           
            dataLog(currData)
        }
    );
    }
}

// Spotify : Function for Music Info

function spotifyThis() {

    if (finalSearch === "") {
        finalSearch = "ace+of+base+the+sign"
    }

    spotify.search({
        type: 'artist,track',
        query: finalSearch
    }, function (err, data) {
        // if (err) {
        //     return console.log('Error occurred: ' + err);
        // }

        if(data.artists.items.length <= 0 && data.tracks.items.length <= 0) {
        console.log("No music found for this query...");
        } else {

        var currData = `\n
    Artist: ${data.tracks.items[0].artists[0].name}
    Track: ${data.tracks.items[0].name}
    Preview: ${data.tracks.items[0].preview_url}
    Album: ${data.tracks.items[0].album.name}
            `
            console.log(currData)
            dataLog(currData)
        }
    });
}

// movie-this (OMDB): Funtion for Movie Info


function movieThis() {

    if (finalSearch === "") {
        finalSearch = "mr+nobody"
        console.log('\n')
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log('\n')
        console.log("It's on Netflix!");
        

    }

    axios.get("http://www.omdbapi.com/?t=" + finalSearch + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

        if(response.data.Response === "False") {
            console.log("No info for this movie")
        }else {

            var currData = `\n
    Title: ${response.data.Title}
    Released: ${response.data.Year}
    IMDB Rating: ${response.data.imdbRating}
    Rotten Tomatos Rating: ${response.data.Ratings[1].Value}
    Country: ${response.data.Country}
    Language: ${response.data.Language}
    Plot: ${response.data.Plot}
    Actors: ${response.data.Actors}
            `
            console.log(currData)
            dataLog(currData)
        }
        }
    );

    
}

//  do-what-it-says :function for reading out of random.txt file 

function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }

        var dataArr = data.split(",");
      
        finalSearch = dataArr[1];
        spotifyThis()
      });
}


//Data Logger - see log.txt

function dataLog(data) {
    fs.appendFile("log.txt", data, function(err) {

        if (err) {
          console.log(err);
        } else {
          console.log('\x1b[36m%s\x1b[0m','Log Updated');
        }
      
      });
  }