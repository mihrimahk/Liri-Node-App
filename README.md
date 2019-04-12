# Liri-Node-App

- - -

## ABOUT THE LIRI

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands. The  `Commands` are:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

- - -

## HOW TO USE LIRI

### **Step by Step instructions**

1. Open your terminal such as Bash.
2. Navigate to the folder that contains the `liri.js` file. 
3. LIRI utilizes `inquirer` to prompt the user for input.

![Image of Start](1start.png)

Depending on the command you run, the output will vary


**Chosen 1**: Run the `concert-this` command

Output:`Please enter your concert name:[concert name here]` -This will output the following information about  the events and locations where the artist or band will perform. It can result in multiple records. 

   * Name of the venue
   * Venue location
   * Date of the Event (use moment to format this as "MM/DD/YYYY")

![Results] : 

**Chosen 2**: Run the `spotify-this-song` command

Output: `spotify-this-song [song name here]` - This will output the following information about the song the user enters in the terminal window. If no song is provided then the program will default to “The Sign” by Ace of Base.



**Chosen 3**: Run the `movie-this` command

Output: This will output the following information about the movie the user enters to the terminal window. If the user doesn’t supply a movie name, the program will default to “Mr. Nobody.”

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

![Results] : 

**Chosen 4**: Run the `do-what-it-says` command

Output:Using the `fs Node package`, LIRI will take the text inside of random.txt and then use it to call one of LIRI’s commands.

![Results] : 

Data Output In addition to logging the data to the terminal, data will also be output and appended to a .txt file called `log.txt`.

![Results] : 



## TECHNOLOGIES USED
* Javascript
* Nodejs
* Node packages:
    * Node-Spotify-API
    * Axios
    * Moment
    * DotEnv
    * Inquirer
    * fs

* APIs used:
    * Bands in Town
    * OMDB
* Git
* GitHub








