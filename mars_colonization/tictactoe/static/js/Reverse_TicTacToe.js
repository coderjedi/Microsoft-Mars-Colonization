// TicTacToe board initialised
var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

var HUMAN = +1;
var COMP = -1;
var flag = true

/* Function for heuristic evaluation of a given board state. */
function getScore_reverse(state) {
	var score = 0;

	if (gameOver(state, COMP)) {
		score = +1;
	}
	else if (gameOver(state, HUMAN)) {
		score = -1;
	} else {
		score = 0;
	}

	return score;
}


// Minimax function
function minimax_reverse(state, depth, player) {
	var best;

	if (player == COMP) {
		best = [-1, -1, +1000];
	}
	else {
		best = [-1, -1, -1000];
	}
// If game over or no more empty cells(depth=no. of empty cells)
	if (depth == 0 || gameOverAll(state)) {
		// return the score at present depth for given state
		var score = getScore_reverse(state);
		return [-1, -1, score];
	}

/*
For every empty cell in the board do the following-
		1.Mark the cell with the current player's value
		2.Calculate score after marking the cell.
		3.If player is computer(minimizing player) and score is the better than previous best score then update the best score
		4.If player is humanr(maximizing player) and score is the better than previous best score then update the best score
Return best score
*/
	getemptyCells(state).forEach(function (cell) {
		var x = cell[0];
		var y = cell[1];
		state[x][y] = player;
		var score = minimax_reverse(state, depth - 1, -player);
		state[x][y] = 0;
		score[0] = x;
		score[1] = y;

		if (player == COMP) {
			if (score[2] < best[2])
				best = score;
		}
		else {
			if (score[2] > best[2])
				best = score;
		}
	});

	return best;
}

/* It calculates the next move based on minimax algorithm */
function aiTurn_minimax_reverse(difficulty) {
	var x = document.getElementsByTagName("td");
	for (var i = 0; i < x.length; i++)
	{
 	 x[i].style.backgroundColor = "#ECECEC";
	}
	var x, y;
	var move;
	var cell;
	msg = document.getElementById("hint");
	msg.innerHTML = "";
	if (getemptyCells(board).length == 9) {
		x = 1;
		y = 1;
		if (setMove(x, y, COMP)) {
			cell = document.getElementById(String(x) + String(y));
			cell.innerHTML = "O";
			flag=true
		}
	}
	else {
		if(difficulty=="Easy")
		{
			console.log("easy")
				move = minimax_reverse(board, 1, COMP);
		}
		else if(difficulty=="Medium")
		{
			console.log("medium")
				move = minimax_reverse(board,3, COMP);
		}
		else
		{
				move = minimax_reverse(board, getemptyCells(board).length, COMP);
		}
		x = move[0];
		y = move[1];
		if (setMove(x, y, COMP)) {
			cell = document.getElementById(String(x) + String(y));
			cell.innerHTML = "O";
			flag=true
		}
		flag=true
	}
}


// Function to suggest next move to the human player based on the AI algorithm selected
function hint_reverse()
{
	var x,y;
	if (getemptyCells(board).length == 9) {
		x = 1;
		y = 1;
	}
	else {
		move = minimax_reverse(board,getemptyCells(board).length, HUMAN);
		x = move[0];
		y = move[1];
	}
	msg = document.getElementById("hint");
	console.log(""+x.toString()+y.toString())
	cell=document.getElementById(""+x.toString()+y.toString())
	cell.style.backgroundColor ="green";
	msg.innerHTML = "Mark box at row " + (x+1) + " column " + (y+1);
}


/* This function gets executed when human player clicks on a cell on TicTacToe board */
function clickedCell_reverse(cell,difficulty) {
	// Until game ends restart button is disabled
	var button = document.getElementById("bnt-restart");
	button.disabled = true;
	// continue game only if empty cell left or game not over yet.
	var conditionToContinue = gameOverAll(board) == false && getemptyCells(board).length > 0;
	msg = document.getElementById("hint");
	msg.innerHTML = "";
	if (conditionToContinue == true && flag==true) {
		var x = cell.id.split("")[0];
		var y = cell.id.split("")[1];
		var move = setMove(x, y, HUMAN);
		// If human's move valid mark X in required box for human's move
		if (move == true) {
			flag=false
			cell.innerHTML = "X";
			 // If after human makes move still game hasnt ended or empty cell left then AI makes a move
			if (gameOverAll(board) == false && getemptyCells(board).length > 0)
			{
				console.log("Condition to continue")
				//Selects which algorithm to use to compute AI's move based on user's choice of algorithm
				aiTurn_minimax_reverse(difficulty);
			}
		}
	}
	// Checks if game ended after players have made their moves
	if (gameOverAll(board)) {
		console.log("Entering")
		var lines;
		var cell;
		var msg;
// Just makes lines signifying 3 in a row.Total 8 such lines possible(3 vertical+3 horizontal+2 diagonal)
		if ((board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1)||(board[0][0] == -1 && board[0][1] == -1 && board[0][2] == -1))
			lines = [[0, 0], [0, 1], [0, 2]];
		else if ((board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1)||(board[1][0] == -1 && board[1][1] == -1 && board[1][2] == -1))
			lines = [[1, 0], [1, 1], [1, 2]];
		else if ((board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1)||(board[2][0] == -1 && board[2][1] == -1 && board[2][2] == -1))
			lines = [[2, 0], [2, 1], [2, 2]];
		else if ((board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1)||(board[0][0] == -1 && board[1][0] == -1 && board[2][0] == -1))
			lines = [[0, 0], [1, 0], [2, 0]];
		else if ((board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1)||(board[0][1] == -1 && board[1][1] == -1 && board[2][1] == -1))
			lines = [[0, 1], [1, 1], [2, 1]];
		else if ((board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1)||(board[0][2] == -1 && board[1][2] == -1 && board[2][2] == -1))
			lines = [[0, 2], [1, 2], [2, 2]];
		else if ((board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1)||(board[0][0] == -1 && board[1][1] == -1 && board[2][2] == -1))
			lines = [[0, 0], [1, 1], [2, 2]];
		else if ((board[2][0] == 1 && board[1][1] == 1 && board[0][2] == 1)||(board[2][0] == -1 && board[1][1] == -1 && board[0][2] == -1))
			lines = [[2, 0], [1, 1], [0, 2]];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "red";
		}
		// Checks which player has won and sends message accordingly
		if(gameOver(board,COMP))
		{
		msg = document.getElementById("message");
		msg.innerHTML = "You win!";
		}
		if(gameOver(board,HUMAN))
		{
		msg = document.getElementById("message");
		msg.innerHTML = "You lose!";
		}
	}
	    // If none of the cells are empty and none of the players have won
	if (getemptyCells(board).length == 0 && !gameOverAll(board)) {
		var msg = document.getElementById("message");
		msg.innerHTML = "Draw!";
	}
		// If game over or no empty cells left,enable restart button
	if (gameOverAll(board) == true || getemptyCells(board).length == 0) {
		button.value = "Restart";
		button.disabled = false;
	}
}

/* Restart the game*/
function restartBnt_reverse(button,difficulty) {
	if (button.value == "AI starts") {
		flag=false
		aiTurn_minimax_reverse(difficulty);
		button.disabled = true;
	}
	else if (button.value == "Restart") {
		var htmlBoard;
		var msg;
		flag=true
		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				board[x][y] = 0;
				htmlBoard = document.getElementById(String(x) + String(y));
				htmlBoard.style.color = "#444";
				htmlBoard.innerHTML = "";
			}
		}
		var x = document.getElementsByTagName("td");
		for (var i = 0; i < x.length; i++)
		{
	 	 x[i].style.backgroundColor = "#ECECEC";
		}
		button.value = "AI starts";
		msg = document.getElementById("message");
		msg.innerHTML = "";
	}
}
