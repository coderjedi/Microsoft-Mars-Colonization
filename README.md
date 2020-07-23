# Microsoft-Mars-Colonization
Github repository for of Team Calderon(Himanshu Pandey and Ayush Upadhyay) from BITS Pilani for the Mars Colonization Program by Microsoft.

O̲V̲E̲R̲V̲I̲E̲W̲

The project is "Entertain the Crew", an AI-powered TicTacToe game.

The project is hosted at- http://msmarstictactoe.herokuapp.com/

It's a web-based app which uses 3 Artifical Intelligence algorithms-

1- Minimax Algortithm

2- Logic-based Algorithm

3- Neural Network based Algorithm

P̲R̲O̲J̲E̲C̲T̲ ̲S̲E̲T̲U̲P̲




F̲E̲A̲T̲U̲R̲E̲S̲ ̲O̲F̲ ̲T̲H̲E̲ ̲P̲R̲O̲J̲E̲C̲T̲

The webapp has several features which include-

1- Two playing modes- AI vs player and Player vs Player. Multiple algorithm option for AI and multiple grid option for PvP.

2- Three difficulty levels- (i)Easy (ii) Medium (iii) Unbeatable

3- Two different grid sizes for PvP mode- 3x3 and 4x4 grids supported

4- Optional Hint- which suggests the best possible next move to the player incase he's stuck

5- Reverse TicTacToe vs A- using Minimax Algorithm. Player loses if there are 3 crosses or dots in a row.

6- Multi-player gaming- More than one player can play at the same time in PvP mode.

7- Space themed UI

8- Functional paradigm- Explained in detail below.

M̲E̲T̲H̲O̲D̲O̲L̲O̲G̲Y̲ ̲U̲S̲E̲D̲

Agent behavior has been emulated using Functional Programming paradigm with functions that act on other functions.
In the code for every algorithm, every function acts on the other by calling it based on the information required.

For ex- to test a valid move, the function validMove checks whether the chosen cell is empty by acting on the getemptyCells function. In turn, the setMove functions acts on the validMove function to set the move of the board, if the coordinates are valid. Finally, the AIturn functions for all the 3 algorithms acts on the the aforementioned functions to calculate the next move for the AI player.
