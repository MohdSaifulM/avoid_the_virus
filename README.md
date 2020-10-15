<h1>PROJECT 1: THE GAME</h1> 

**Project title:** Avoid the virus!!! <br>
**Duration:** 1 week <br>

_Objective of the game: To avoid the virus that spawns randomly for as long as you can. Once player hits the virus, the game is over._ <br>

<h4>Concepts used:</h4><br>

**1. Event listener that tracks the mouse position and is also the position of the player**
   - For this i added an event listener to check for mousemove in the play area
   - Store offsetX and offsetY of the mouse event listener in different variables
   - Next, I place the player in a div inside the play area and gave it the position of offsetX and offsetY
   - The challenge I faced with this is that the mouse is on the top left hand corner of the player image
   - So I had to offset the offsetX and offsetY values for this to be more accurate
   - I also set the display of the cursor to "none" when it enters the play area

**2. Random spawns of the virus: <br>**
   - To spawn it randomly I had to have random positions within the play area 
   - First, I obtained the play area's height and width
   - Then, I did generate a random height and width within the play area
  
**3. Random movement of the virus: <br>**
   - Using the random height and width function, I created various positions and simply animate the virus from the first point to the next
   - I also included the max width and height of the play area so the virus won't just stay in the middle of the play area
   - I do this a couple of times until the movement becomes unpredictable but within the play area
   - I had some challenges with this because the virus spawns on top of the player sometimes
      - I fixed this by putting an if conditional statement after making the random positions and checking it against the player position
      
**4. Collision detection: <br>**
  - I managed to do this by applying the concept of pythagoras theorem
      - Generally, I have to find the position of one element and retrieve the X and Y position of this element
      - After which, I find the position of another elemetn and retrieve its X and Y position
      - So I minus X of one element with another element to get the distance between the two elements horizontally
      - And minus Y of one element with another element to get the distance between the two elements vertically
      - From here we can get the diagonal distance between the two elements by applying the pythagoras theorem
      - c = √(a² + b²)
  - Using the theory, I managed to detect when the player hits the virus or the other way around.
  - I also added the player and the virus into an array. The player is always at position[0]. So I only had to do a for loop from position[1] onwards to check if the player is hitting any of the virus.
  - The challenge I had with this is returning the distance from a setInterval function because I want to be always checking. However I just decided to put the collision detection inside the main game instead of a separate function outside of the game.
 
**5. Putting the game together: <br>** 
  - Generally, putting the functions together and create a playable game flow
  - Using event listeners for click events to navigate through different processes
  - Setting display to "none" or "block" to display the correct screen
  
**6. Highscore: <br>** 
  - Instead of having dodging endlessly, I have added a scoring system which is basically a setInterval function that stops when the game is over.
  - I did managed to store this score into localStorage and retrieve it at the highscore screen
      - Since localStorage can only store strings and cannot be null
      - I have to first check in the beginning of the game if the localStorage is null, if it is I set a default object
      - Once the game ends a for loop will check the score against the first 5 elements, if the score is higher than any of the 5, it will be stored in an object which will then be turned into a string using JSON.stringfy() and then will be pushed to localStorage
      - In highscore screen, the score will be retrieve from localStorage and be made back into an object by using JSON.parse() and then sorted according the highest one first and the top five will be displayed on the highscore screen. 




**Includes sources from the following:** <br>
- animate.css
- sweet alert
- game sounds from Kenney assets
- photos from pinclipart




