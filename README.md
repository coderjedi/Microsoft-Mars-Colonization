# Microsoft-Mars-Colonization
Github repository for of Team Calderon(Himanshu Pandey and Ayush Upadhyay) from BITS Pilani for the Mars Colonization Program by Microsoft.

The project is "Entertain the Crew", an AI-powered TicTacToe game.
The project is hosted at- http://msmarstictactoe.herokuapp.com/

It's a web-based app which uses 3 Artifical Intelligence algorithms-
1- Minimax Algortithm
2- Logic-based Algorithm
3- Neural Network based Algorithm

The webapp has several features which include-

1- 2 playing modes- AI vs player and Player vs Player
2- 3 difficulty levels- (i)Easy (ii) Medium (iii) Hard
3- 2 different grid sizes for PvP mode- 3x3 and 4x4 grids
4- Optional Hint- which suggests the best possible next move
5- Reverse TicTacToe vs A- using Minimax Algorithm
6- Multi-player gaming
7- Space themed UI
8- Functional paradigm- Explained in detail below.

Agent behavior has been emulated using Functional Programming paradigm with functions that act on other functions.
In the code for every algorithm, every function acts on the other by calling it based on the information required. For ex- to test a valid move, the function validMove checks whether the chosen cell is empty by acting on the getemptyCells function. In turn, the setMove functions acts on the validMove function to set the move of the board, if the coordinates are valid. Finally, the AIturn functions for all the 3 algorithms acts on the the aforementioned functions to calculate the next move for the AI player.
