# Microsoft-Mars-Colonization
Github repository of Team Calderon(Himanshu Pandey and Ayush Upadhyay) from BITS Pilani for the Mars Colonization Program by Microsoft.

### OVERVIEW

The project is "Entertain the Crew", an AI-powered TicTacToe game.

The project is hosted at- http://msmarstictactoe.herokuapp.com/

It's a web-based app which uses 3 Artifical Intelligence algorithms-

1. Minimax Algortithm

2. Logic-based Algorithm

3. Neural Network based Algorithm

### FEATURES OF OUR PROJECT

The webapp has several features which include-

1. Two playing modes- **AI vs Player and Player vs Player**.

2. Multiple algorithm options for AI- **Minimax algorithm,Logic Based Algorithm and Neural Network Based Algorithm**.

3. Three difficulty levels- **(i)Easy (ii) Medium (iii) Unbeatable**

4. Two different grid sizes for PvP mode- **3x3** and **4x4** grids supported

5. Optional Hint- **Suggests the best possible next move to the player** incase he's stuck

6. **Reverse TicTacToe vs AI(using Minimax Algorithm)**- Player loses if there are 3 crosses or dots in a row.

7. Multi-player gaming- More than one player can play at the same time in PvP mode.

8. Space themed UI

9. **Functional paradigm**- Explained in detail below.

### METHODOLOGY USED

Agent behavior has been emulated using Functional Programming paradigm with functions that act on other functions.
In the code for every algorithm, every function acts on the other by calling it based on the information required.

For ex- to test a valid move, the function validMove checks whether the chosen cell is empty by acting on the getemptyCells function. In turn, the setMove functions acts on the validMove function to set the move of the board, if the coordinates are valid. Finally, the AIturn functions for all the 3 algorithms acts on the the aforementioned functions to calculate the next move for the AI player.

### PROJECT SETUP

To setup the project on your computer, follow the steps given below-

1. Clone the repo on your local machine

2. Change your working directory to the folder mars_colonization

3. Run the following command
```sh
$ pip install requirements.txt
```

4. After the dependencies get installed execute the commands below
```sh
$ python manage.py makemigrations
$ python manage.py migrate
```

5. After the migrations are done, you can now run the web app using
```sh
$ python manage.py runserver
```
