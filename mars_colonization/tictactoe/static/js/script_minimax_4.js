var board = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

var HUMAN = +1;
var COMP = -1;
var flag = true

function evalute(state) {
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

function emptyCells(state) {
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
	var empties = emptyCells(board);
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




/* This function test if the human1 or human2 wins */
function gameOverAll(state) {
	return gameOver(state, HUMAN) || gameOver(state, COMP);
}





function minimax(state, depth, player ,alpha,beta) {
	var best;
	if (player == COMP) {
		best = [-1, -1, +1000];
	}
	else {
		best = [-1, -1, -1000];
	}
// If game over or no more empty cells(depth=no. of empty cells)
	if (depth == 0 || gameOverAll(state)) {
		var score = evalute(state);
		return [-1, -1, score];
	}
	emptyCells(state).forEach(function (cell) {
		var x = cell[0];
		var y = cell[1];
		state[x][y] = player;
		var score = minimax(state, depth - 1, -player,alpha,beta);
		state[x][y] = 0;
		score[0] = x;
		score[1] = y;

		if (player == COMP) {
			if (score[2] < best[2])
				{
					best = score;
				}
			beta=Math.min(best[2],beta);
			if(alpha>=beta)
			{
					return best;
			}
		}
		else {
			if (score[2] > best[2])
			{
			best = score;
			}
			alpha=Math.max(best[2],alpha);
			if(alpha>=beta)
			{
					return best;
		}
		}
	});
//  if(player==COMP)
// 	return beta;
// else
// {
// 	return alpha;
// }
 			return best;
}




function aiTurn_minimax_4(difficulty) {
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
	if (emptyCells(board).length == 16) {
    x = parseInt(Math.random() * 4);
		y = parseInt(Math.random() * 4);
		if (setMove(x, y, COMP)) {
			cell = document.getElementById(String(x) + String(y));
			cell.innerHTML = "O";
			flag=true
		}
	}
	else {
    if(difficulty=="easy")
    {
																		console.log("Enterign minmax easy")
    move = minimax(board, 3, COMP,-1000,+1000);
    }
    else if (difficulty=="medium")
    {
															console.log("Enterign minmax mediume")
		move = minimax(board, 4, COMP,-1000,+1000);
    }
    else
    {
												console.log("Enterign minmax unbeatable")
    move = minimax(board, 7, COMP,-1000,+1000);
		// move = minimax(board, 5, COMP,-1000,+1000);
    }
		x = move[0];
		y = move[1];
		if (setMove(x, y, COMP)) {
			cell = document.getElementById(String(x) + String(y));
			cell.innerHTML = "O";
			flag=true
		}
		// flag=true
	}
}




function hint()
{
	var x,y;
	if (emptyCells(board).length == 16) {
		x = parseInt(Math.random() * 4);
		y = parseInt(Math.random() * 4);
	}
	else {
		move = minimax(board,emptyCells(board).length, HUMAN,-1000,+1000);
		x = move[0];
		y = move[1];
}
	msg = document.getElementById("hint");
	console.log(""+x.toString()+y.toString())
	cell=document.getElementById(""+x.toString()+y.toString())
	cell.style.backgroundColor ="green";
	msg.innerHTML = "Mark box at row " + (x+1) + " column " + (y+1);
}




/* main */
function clickedCell(cell,difficulty) {
    // Until game ends restart button is disabled
		console.log("Enterign clcikedcell")
    var button = document.getElementById("bnt-restart");
  	button.disabled = true;
  	var conditionToContinue = gameOverAll(board) == false && emptyCells(board).length > 0;
  	msg = document.getElementById("hint");
  	msg.innerHTML = "";
    // continue game only if empty cell left or game not over yet.

	if (conditionToContinue == true && flag==true) {
		var x = cell.id.split("")[0];
    var y = cell.id.split("")[1];

    var move = setMove(x, y, HUMAN);
		if (move == true ) {
					console.log("Enterign clcikedcell 1")
      flag=false
      cell.innerHTML = "X";
      if (gameOverAll(board) == false && emptyCells(board).length > 0)
      {
        console.log("Condition to continue")
        //Selects which algorithm to use to compute AI's move based on user's choice of algorithm
        aiTurn_minimax_4(difficulty);
									console.log("Enterign clcikedcell 2")
      }
		}
    }
	if (gameOverAll(board)) {
		var lines;
		var cell;
		var msg;
		// Need to make changes here
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

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "red";
        }
        if(gameOver(board, COMP))
        {
		msg = document.getElementById("message");
        msg.innerHTML = "You Lose!";
        }
        else if(gameOver(board, HUMAN)){
            msg = document.getElementById("message");
            msg.innerHTML = "You win!";
        }
    }

	if (emptyCells(board).length == 0 && !gameOverAll(board)) {
		var msg = document.getElementById("message");
		msg.innerHTML = "Draw!";
    }

	if (gameOverAll(board) == true || emptyCells(board).length == 0) {
		button.value = "Restart";
		button.disabled = false;
	}
}

/* Restart the game*/
function restartBnt(button,difficulty) {
  if (button.value == "AI starts") {
		flag=false
		if(algorithm=="Minimax")
		aiTurn_minimax_4(difficulty);
		button.disabled = true;
	}
	else if (button.value == "Restart") {
		var htmlBoard;
		var msg;
		flag=true
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 4; y++) {
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
