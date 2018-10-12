require("dotenv").config();
var moment = require("moment");
var request = require("request");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
// var fs = require("fs");

// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });

// Bands in Town
if (process.argv[2] === "concert-this") {
  var artist = process.argv.slice(3).join(" ");
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp",
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        for (let i = 0; i < JSON.parse(body).length; i++) {
          const artistObject = JSON.parse(body)[i];
          console.log(moment(artistObject.datetime).format("MM/DD/YYYY") + "\r\n"
          + artistObject.venue.name + "\r\n"
          + artistObject.venue.city + ", " + artistObject.venue.region + " " + artistObject.venue.country + "\r\n");
        }
      }
    });
}

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

if (process.argv[2] === "spotify-this-song") {
  var spotify = new Spotify(keys.spotify);
  var song = process.argv.splice(3).join(" ");

  spotify.search({ type: "track", query: song }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(data.tracks.items[0].album.artists[0].name);
  });
}

// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and my-tweets