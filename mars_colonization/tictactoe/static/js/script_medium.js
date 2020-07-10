var flg = true


/* It calls the minimax function */
function aiTurn_minimax_medium() {
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
	if (getemptyCells(board ).length == 9) {
		x = 1;
		y = 1;
		if (setMove(x, y, COMP)) {
			cell = document.getElementById(String(x) + String(y));
			cell.innerHTML = "O";
			flg=true
		}
	}
	else {
		move = minimax(board , 5, COMP);
		x = move[0];
		y = move[1];
		if (setMove(x, y, COMP)) {
			cell = document.getElementById(String(x) + String(y));
			cell.innerHTML = "O";
			flg=true
		}
		// flg=true
	}
}

/* It calculates the next move based on a logical algorithm */
function aiTurn_lgcl_medium() {
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
	if (getemptyCells(board ).length == 9) {
		x = 1;
		y = 1;
		if (setMove(x, y, COMP)) {
			cell = document.getElementById(String(x) + String(y));
			cell.innerHTML = "O";
			flg=true
		}
	}
	else {
		$.ajax({type:"POST",url: '/lgcl_med/',
		data:{brd:JSON.stringify(board )}
		, success: function(result){
			x = result.x;
			y = result.y;
			if (setMove(x, y, COMP)) {
				cell = document.getElementById(String(x) + String(y));
				cell.innerHTML = "O";
				flg=true
			}
		  },async: false});
	}
}

/* It calculates the next move based on a neural network algorithm */
function aiTurn_nn_medium() {
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
			flg=true
		}
	}
	else {
		$.ajax({type:"POST",url: '/nn_med/',
		data:{brd:JSON.stringify(board )}
		, success: function(result){
			x = result.x;
			y = result.y;
			if (setMove(x, y, COMP)) {
				cell = document.getElementById(String(x) + String(y));
				cell.innerHTML = "O";
				flg=true
			}
		  },async: false});
	}
}
// // Function to suggest next move to the human player.May want to limit number of hints allowed.
function hint(algorithm)
{
	var x,y;
	if (getemptyCells(board ).length == 9) {
		x = parseInt(Math.random() * 3);
		y = parseInt(Math.random() * 3);
	}
	else {
		if(algorithm=="Minimax")
		{
		move = minimax(board ,getemptyCells(board ).length, HUMAN);
		x = move[0];
		y = move[1];
	  }
		else if(algorithm=="Logical")
		{
			$.ajax({type:"POST",url: '/lgcl/',
			data:{brd:JSON.stringify(board )}
			, success: function(result){
				x = result.x;
				y = result.y;
			  },async: false});
	  }
		else
		{
			$.ajax({type:"POST",url: '/nn/',
			data:{brd:JSON.stringify(board )}
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
function clickedCell_medium(cell,algorithm) {
	// Until game ends restart button is disabled
	var button = document.getElementById("bnt-restart");
	button.disabled = true;
	var conditionToContinue = gameOverAll(board ) == false && getemptyCells(board ).length > 0;
	msg = document.getElementById("hint");
	msg.innerHTML = "";
	// continue game only if empty cell left or game not over yet.
	if (conditionToContinue == true && flg==true) {
		var x = cell.id.split("")[0];
		var y = cell.id.split("")[1];
		var move = setMove(x, y, HUMAN);
		// If human's move valid mark X in required box for human's move
		if (move == true) {
			flg=false
			cell.innerHTML = "X";
			 // If after human makes move still game hasnt ended or empty cell left then AI makes a move
			if (gameOverAll(board ) == false && getemptyCells(board ).length > 0)
			{
				console.log("Condition to continue")
				//Selects which algorithm to use to compute AI's move based on user's choice of algorithm
				if(algorithm=="Minimax")
				aiTurn_minimax_medium();
				else if(algorithm=="Logical")
				aiTurn_lgcl_medium();
				else
				aiTurn_nn_medium()
			}
		}
	}
	// Checks if game ended AI player makes a move
	if (gameOverAll(board )) {
		console.log("Entering")
		var lines;
		var cell;
		var msg;
// Just makes lines signifying 3 in a row.Total 8 such lines possible(3 vertical+3 horizontal+3 diagonal)
		if ((board [0][0] == 1 && board [0][1] == 1 && board [0][2] == 1)||(board [0][0] == -1 && board [0][1] == -1 && board [0][2] == -1))
			lines = [[0, 0], [0, 1], [0, 2]];
		else if ((board [1][0] == 1 && board [1][1] == 1 && board [1][2] == 1)||(board [1][0] == -1 && board [1][1] == -1 && board [1][2] == -1))
			lines = [[1, 0], [1, 1], [1, 2]];
		else if ((board [2][0] == 1 && board [2][1] == 1 && board [2][2] == 1)||(board [2][0] == -1 && board [2][1] == -1 && board [2][2] == -1))
			lines = [[2, 0], [2, 1], [2, 2]];
		else if ((board [0][0] == 1 && board [1][0] == 1 && board [2][0] == 1)||(board [0][0] == -1 && board [1][0] == -1 && board [2][0] == -1))
			lines = [[0, 0], [1, 0], [2, 0]];
		else if ((board [0][1] == 1 && board [1][1] == 1 && board [2][1] == 1)||(board [0][1] == -1 && board [1][1] == -1 && board [2][1] == -1))
			lines = [[0, 1], [1, 1], [2, 1]];
		else if ((board [0][2] == 1 && board [1][2] == 1 && board [2][2] == 1)||(board [0][2] == -1 && board [1][2] == -1 && board [2][2] == -1))
			lines = [[0, 2], [1, 2], [2, 2]];
		else if ((board [0][0] == 1 && board [1][1] == 1 && board [2][2] == 1)||(board [0][0] == -1 && board [1][1] == -1 && board [2][2] == -1))
			lines = [[0, 0], [1, 1], [2, 2]];
		else if ((board [2][0] == 1 && board [1][1] == 1 && board [0][2] == 1)||(board [2][0] == -1 && board [1][1] == -1 && board [0][2] == -1))
			lines = [[2, 0], [1, 1], [0, 2]];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "red";
		}
		// Checks which player has won and sends message accordingly
		if(gameOver(board ,COMP))
		{
		msg = document.getElementById("message");
		msg.innerHTML = "You lose!";
		}
		if(gameOver(board ,HUMAN))
		{
		msg = document.getElementById("message");
		msg.innerHTML = "You win!";
		}
	}
	    // If none of the cells are empty and none of the players have won
	if (getemptyCells(board ).length == 0 && !gameOverAll(board )) {
		var msg = document.getElementById("message");
		msg.innerHTML = "Draw!";
	}
		// If game over or no empty cells left,enable restart button
	if (gameOverAll(board ) == true || getemptyCells(board ).length == 0) {
		button.value = "Restart";
		button.disabled = false;
	}
}

/* Restart the game*/
function restartBnt_medium(button,algorithm) {
	if (button.value == "AI starts") {
		flg=false
		if(algorithm=="Minimax")
		aiTurn_minimax_medium();
		else if(algorithm=="Logical")
		aiTurn_lgcl_medium();
		else
		aiTurn_nn_medium()
		button.disabled = true;
	}
	else if (button.value == "Restart") {
		var htmlBoard;
		var msg;
		flg=true
		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				board [x][y] = 0;
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
