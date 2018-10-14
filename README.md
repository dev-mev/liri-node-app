# LIRI Bot

## Overview

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## Instructions
LIRI accepts the following commands:
   * ### `concert-this <artist/band name here>`
        This searches the Bands in Town Artist Events API for an artist, returns info about upcoming events and logs it to `log.txt`.

        EXAMPLE: `concert-this` with no artist displays the following

        ![alt text](/images/concert-this_no-artist.png "concert-this")
   
        EXAMPLE: `concert-this Childish Gambino` 

        ![alt text](/images/concert-this_gambino.png "concert-this Childish Gambino")

   * ### `spotify-this-song <song name here>`
        This utilizes node-spotify-api to search for a song title. It returns information about the track and logs it to `log.txt`.

        EXAMPLE: `spotify-this-song` with no artist defaults to "The Sign" by Ace of Base

        ![alt text](/images/spotify-this_no-artist.png "spotify-this-song")

        EXAMPLE: `spotify-this-song We are the World` shows handling of multiple artists - separates them by //

        ![alt text](/images/spotify-this_we-are-the-world.png "spotify-this-song We are the World")

        EXAMPLE: `spotify-this-song asdlkjhgd` shows handling of searches with no results

        ![alt text](/images/spotify-this_no-results.png "spotify-this-song asdlkjhgd")

   * ### `movie-this <movie title here>`
        This searches the OMDB API for a specified movie, returns info about that movie and logs it to `log.txt`.

        EXAMPLE: `movie-this` with no movie returns info for the movie "Mr. Nobody"

        ![alt text](/images/movie-this_no-movie.png "movie-this")

        EXAMPLE: `movie-this hausu` 

        ![alt text](/images/movie-this_Hausu.png "movie-this hausu")

        EXAMPLE: `movie-this asdasdg` shows handling of searches with no results

        ![alt text](/images/movie-this_no-results.png "movie-this asdasdg")

   * ### `do-what-it-says`
        This uses the `fs` Node package to take text inside of `random.txt` and use it to call one of LIRI's commands.

        EXAMPLE: `do-what-it-says` using `random.txt` containing a spotify-this-song command

        ![alt text](/images/do-what-it-says_spotify.png "do-what-it-says")

        EXAMPLE: `do-what-it-says` using `random.txt` containing a movie-this command

        ![alt text](/images/do-what-it-says_movie.png "do-what-it-says")
