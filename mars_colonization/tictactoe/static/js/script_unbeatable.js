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
function getScore(state) {
	var score = 0;

	if (gameOver(state, COMP)) {
		score = -1;
	}
	else if (gameOver(state, HUMAN)) {
		score = +1;
	} else {
		score = 0;
	}

	return score;
}

/* This function tests if a specific player wins */
function gameOver(state, player) {
	var win_state = [
		[state[0][0], state[0][1], state[0][2]],
		[state[1][0], state[1][1], state[1][2]],
		[state[2][0], state[2][1], state[2][2]],
		[state[0][0], state[1][0], state[2][0]],
		[state[0][1], state[1][1], state[2][1]],
		[state[0][2], state[1][2], state[2][2]],
		[state[0][0], state[1][1], state[2][2]],
		[state[2][0], state[1][1], state[0][2]],
	];

	for (var i = 0; i < 8; i++) {
		var line = win_state[i];
		var filled = 0;
		for (var j = 0; j < 3; j++) {
			if (line[j] == player)
				filled++;
		}
		if (filled == 3)
			return true;
	}
	return false;
}

/* This function test if the human or computer wins */
function gameOverAll(state) {
	return gameOver(state, HUMAN) || gameOver(state, COMP);
}

/* Returns a list of all the empty cells in the tictactoe board */
function getemptyCells(state) {
	var cells = [];
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
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

// Minimax function
function minimax(state, depth, player) {
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
		var score = getScore(state);
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
		var score = minimax(state, depth - 1, -player);
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
function aiTurn_minimax() {
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
		move = minimax(board, getemptyCells(board).length, COMP);
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

/* It calculates the next move based on a logical algorithm */
function aiTurn_lgcl() {
	console.log("Executing logical")
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
		$.ajax({type:"POST",url: '/lgcl/',
		data:{brd:JSON.stringify(board)}
		, success: function(result){
			x = result.x;
			y = result.y;
			if (setMove(x, y, COMP)) {
				cell = document.getElementById(String(x) + String(y));
				cell.innerHTML = "O";
				flag=true
			}
		  },async: false});
	}
}

/* It calculates the next move based on a neural network algorithm */
function aiTurn_nn() {
	console.log("Executing nn")
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
		$.ajax({type:"POST",url: '/nn/',
		data:{brd:JSON.stringify(board)}
		, success: function(result){
			x = result.x;
			y = result.y;
			if (setMove(x, y, COMP)) {
				cell = document.getElementById(String(x) + String(y));
				cell.innerHTML = "O";
				flag=true
			}
		  },async: false});
	}
}

// Function to suggest next move to the human player based on the AI algorithm selected
function hint(algorithm)
{
	var x,y;
	if (getemptyCells(board).length == 9) {
		x = parseInt(Math.random() * 3);
		y = parseInt(Math.random() * 3);
	}
	else {
		if(algorithm=="Minimax")
		{
		move = minimax(board,getemptyCells(board).length, HUMAN);
		x = move[0];
		y = move[1];
	  }
		else if(algorithm=="Logical")
		{
			$.ajax({type:"POST",url: '/lgcl/',
			data:{brd:JSON.stringify(board)}
			, success: function(result){
				x = result.x;
				y = result.y;
			  },async: false});
	  }
		else
		{
			$.ajax({type:"POST",url: '/nn/',
			data:{brd:JSON.stringify(board)}
			, success: function(result){
				x = result.x;
				y = result.y;
			  },async: false});
	  }
	}
	msg = document.getElementById("hint");
	console.log(""+x.toString()+y.toString())
	cell=document.getElementById(""+x.toString()+y.toString())
	cell.style.backgroundColor ="green";
	msg.innerHTML = "Mark box at row " + (x+1) + " column " + (y+1);
}


/* This function gets executed when human player clicks on a cell on TicTacToe board */
function clickedCell(cell,algorithm) {
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
				if(algorithm=="Minimax")
				aiTurn_minimax();
				else if(algorithm=="Logical")
				aiTurn_lgcl();
				else
				aiTurn_nn()
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
		msg.innerHTML = "You lose!";
		}
		if(gameOver(board,HUMAN))
		{
		msg = document.getElementById("message");
		msg.innerHTML = "You win!";
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
function restartBnt(button,algorithm) {
	if (button.value == "AI starts") {
		flag=false
		if(algorithm=="Minimax")
		aiTurn_minimax();
		else if(algorithm=="Logical")
		aiTurn_lgcl();
		else
		aiTurn_nn()
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
