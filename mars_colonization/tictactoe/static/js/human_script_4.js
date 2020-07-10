var board = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

var HUMAN1 = +1;
var HUMAN2 = -1;
var last_turn=-1;

/* Returns a list of all the empty cells in the tictactoe board */
function getemptyCells(state) {
	var cells = [];
	for (var x = 0; x < 4; x++) {
		for (var y = 0; y < 4; y++) {
			if (state[x][y] == 0)
				cells.push([x, y]);
		}
	}

	return cells;
}

/* A move is valid if the chosen cell is empty */
function validMove(x, y) {
	var empties = getemptyCells(board);
	try {
		if (board[x][y] == 0) {
			return true;
		}
		else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

/* Set the move on board, if the coordinates are valid */
function setMove(x, y, player) {
	if (validMove(x, y)) {
		board[x][y] = player;
		return true;
	}
	else {
		return false;
	}
}

// Checks if the player passed as parameter has won the match
function gameOver(state, player) {
	var win_state = [
		[state[0][0], state[0][1], state[0][2],state[0][3]],
		[state[1][0], state[1][1], state[1][2],state[1][3]],
		[state[2][0], state[2][1], state[2][2],state[2][3]],
		[state[0][0], state[1][0], state[2][0],state[3][0]],
		[state[0][1], state[1][1], state[2][1],state[3][1]],
		[state[0][2], state[1][2], state[2][2],state[3][2]],
		[state[0][0], state[1][1], state[2][2],state[3][3]],
		[state[3][0], state[1][2], state[2][1],state[0][3]]
	];

	for (var i = 0; i < 8; i++) {
		var line = win_state[i];
		var filled = 0;
		for (var j = 0; j < 4; j++) {
			if (line[j] == player)
				filled++;
		}
		if (filled == 4)
			return true;
	}
	return false;
}

/* This function test if any of the two players have won the match */
function gameOverAll_human(state) {
	return gameOver(state, HUMAN1) || gameOver(state, HUMAN2);
}

/* This function gets executed when a player clicks on a cell on TicTacToe board */
function clickedCell(cell) {
    // Until game ends restart button is disabled
	var button = document.getElementById("bnt-restart");
    button.disabled = true;
    // continue game only if empty cell left or game not over yet.
	var conditionToContinue = gameOverAll_human(board) == false && getemptyCells(board).length > 0;

	if (conditionToContinue == true) {
		var x = cell.id.split("")[0];
    var y = cell.id.split("")[1];
		// Check if the move made by player is valid
    var move = setMove(x, y, -1*last_turn);
		if (move == true ) {
            last_turn=last_turn*-1;
            if(last_turn == +1)
            cell.innerHTML = "X";
            else
            cell.innerHTML = "O";
		}
    }
		// Checks if any of the two players has won the game
	if (gameOverAll_human(board)) {
		var lines;
		var cell;
		var msg;
		// Finds the line along which there are 3 in a row
		if ((board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1 && board[0][3]==1)||(board[0][0] == -1 && board[0][1] == -1 && board[0][2] == -1 && board[0][3]==-1))
			lines = [[0, 0], [0, 1], [0, 2],[0,3]];
		else if ((board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1 && board[1][3]==1)||(board[1][0] == -1 && board[1][1] == -1 && board[1][2] == -1 && board[1][3]==-1))
			lines = [[1, 0], [1, 1], [1, 2],[1,3]];
		else if ((board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1 && board[2][3]==1)||(board[2][0] == -1 && board[2][1] == -1 && board[2][2] == -1 && board[2][3]==-1))
			lines = [[2, 0], [2, 1], [2, 2],[2,3]];
		else if ((board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1 && board[3][0]==1)||(board[0][0] == -1 && board[1][0] == -1 && board[2][0] == -1 && board[3][0]==-1))
			lines = [[0, 0], [1, 0], [2, 0],[3,0]];
		else if ((board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1 && board[3][1]==1)||(board[0][1] == -1 && board[1][1] == -1 && board[2][1] == -1 && board[3][1]==-1))
			lines = [[0, 1], [1, 1], [2, 1],[3,1]];
		else if ((board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1 && board[3][2]==1)||(board[0][2] == -1 && board[1][2] == -1 && board[2][2] == -1 && board[3][2]==-1))
			lines = [[0, 2], [1, 2], [2, 2],[3,2]];
		else if ((board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1 && board[3][3]==1)||(board[0][0] == -1 && board[1][1] == -1 && board[2][2] == -1 && board[3][3]==-1))
			lines = [[0, 0], [1, 1], [2, 2],[3,3]];
		else if ((board[3][0] == 1 && board[2][1] == 1 && board[1][2] == 1 && board[0][3]==1)||(board[3][0] == -1 && board[2][1] == -1 && board[1][2] == -1 && board[0][3]==-1))
			lines = [[3, 0], [2, 1], [1, 2], [0,3]];

			for (var i = 0; i < lines.length; i++)
			{
				cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
				cell.style.color = "red";
			}
			// Checks which player has won and sends message accordingly
			if(gameOver(board, HUMAN1))
			{
				msg = document.getElementById("message");
				msg.innerHTML = "Player 1 wins!";
			}
			else if(gameOver(board, HUMAN2))
			{
					msg = document.getElementById("message");
					msg.innerHTML = "Player 2 wins!";
			}
    }

	if (getemptyCells(board).length == 0 && !gameOverAll_human(board)) {
		var msg = document.getElementById("message");
		msg.innerHTML = "Draw!";
    }

	if (gameOverAll_human(board) == true || getemptyCells(board).length == 0) {
		button.value = "Restart";
		button.disabled = false;
	}
}

/* Restart the game*/
function restartBnt_human(button) {
    if (button.value == "Restart") {
		var htmlBoard;
		var msg;
        last_turn=-1;
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 4; y++) {
				board[x][y] = 0;
				htmlBoard = document.getElementById(String(x) + String(y));
				htmlBoard.style.color = "#444";
				htmlBoard.innerHTML = "";
			}
		}
		msg = document.getElementById("message");
		msg.innerHTML = "";
	}
}
