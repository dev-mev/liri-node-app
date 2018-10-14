require("dotenv").config();
const fs = require("fs");
const moment = require("moment");
const request = require("request");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");

// LOG RESULTS
function writeInfo(info) {
  fs.appendFile("log.txt", info, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("log.txt was updated!");
  });
}

function runCommand(command, arg) {
  // BANDS IN TOWN
  // Tried to handle if there were no results, couldn't figure it out.
  if (command === "concert-this") {
    const artist = arg;
    let eventInfo;
    if (artist === "") {
      console.log("Enter a band or artist.");
      return;
    }

    request("https://rest.bandsintown.com/artists/" + encodeURIComponent(artist) + "/events?app_id=codingbootcamp",
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const results = JSON.parse(body);

          for (let i = 0; i < Math.min(10, results.length); i++) {
            const artistObject = results[i];
            eventInfo = moment(artistObject.datetime).format("MM/DD/YYYY") + "\n"
              + artistObject.venue.name + "\n"
              + artistObject.venue.city + ", " + artistObject.venue.region + " " + artistObject.venue.country + "\n";
            console.log(eventInfo);
            writeInfo(eventInfo + "\n");
          }
        }
      });
  }

  // SPOTIFY
  if (command === "spotify-this-song") {
    const spotify = new Spotify(keys.spotify);
    let song = arg;
    if (song === "") {
      song = "The Sign Ace of Base";
    }

    spotify.search({ type: "track", query: song }, function (err, data) {
      let musicInfo;
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      if (data.tracks.items.length >= 1) {
        for (let i = 0; i < Math.min(10, data.tracks.items.length); i++) {
          const trackInfo = data.tracks.items[i];
          musicInfo = trackInfo.artists.map(artist => artist.name).join(" // ") + "\n" // handles multiple artists
            + trackInfo.name + "\n"
            + trackInfo.preview_url + "\n"
            + trackInfo.album.name + "\n";
          console.log(musicInfo);
          writeInfo(musicInfo + "\n");
        }
      } else { console.log("no results"); }
    });
  }

  // OMDB
  if (command === "movie-this") {
    let movie = arg;
    let movieInfo;

    if (movie === "") {
      movie = "Mr. Nobody";
    }

    request(
      "http://www.omdbapi.com/?t=" + encodeURIComponent(movie) + "&y=&plot=short&apikey=trilogy",
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const movieObject = JSON.parse(body);

          // handles if there are no results
          if (movieObject.Response === "True") {
            // loops through array to find Rotten Tomatoes, if found, returns rating info
            const rottenToms = movieObject.Ratings.find(rating => rating.Source === "Rotten Tomatoes");

            // learned shorthand for conditional assignment
            const rottenTomsVal = rottenToms !== undefined
              ? rottenToms.Value
              : "none";

            movieInfo = "Title: " + movieObject.Title + "\n"
              + "Year: " + movieObject.Year + "\n"
              + "IMDB rating: " + movieObject.imdbRating + "\n"
              + "Rotten Tomatoes rating: " + rottenTomsVal + "\n"
              + "Country: " + movieObject.Country + "\n"
              + "Language: " + movieObject.Language + "\n"
              + "Plot: " + movieObject.Plot + "\n"
              + "Actors: " + movieObject.Actors + "\n";
            console.log(movieInfo);
            writeInfo(movieInfo + "\n");
          } else {
            console.log("No results found.");
          }
        }
      }
    );
  }

  // DO WHAT IT SAYS
  if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
        console.log(error);
        return;
      }
      const randomText = data.split(",");
      runCommand(randomText[0], randomText[1]);
    });
  }
}

const command = process.argv[2];
const arg = process.argv.slice(3).join(" ");

runCommand(command, arg);
