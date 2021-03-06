function Board() {
	this.board = new Array();
	for (var j = 0; j < 9; j++) {
		this.board[j] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	this.possibilities = new Array();
	for (var r = 0; r < 9; r++) {
		this.possibilities[r] = new Array();
		for (var c = 0; c < 9; c++) {
			this.possibilities[r][c] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		}
	}

	// Given a row and column, return the indices of the board that are in 
	// the same section of the board.
	this.getSectionIndices = function(row, col) {
		if (row < 3) {
			if (col < 3) 
				return [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
			else if (col < 6)
				return [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]];
			else
				return [[0, 6], [0, 7], [0, 8], [1, 6], [1, 7], [1, 8], [2, 6], [2, 7], [2, 8]];
		}
		else if (row < 6) {
			if (col < 3) 
				return [[3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2]];
			else if (col < 6)
				return [[3, 3], [3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4], [5, 5]];
			else
				return [[3, 6], [3, 7], [3, 8], [4, 6], [4, 7], [4, 8], [5, 6], [5, 7], [5, 8]];
		}
		else {
			if (col < 3) 
				return [[6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2], [8, 0], [8, 1], [8, 2]];
			else if (col < 6)
				return [[6, 3], [6, 4], [6, 5], [7, 3], [7, 4], [7, 5], [8, 3], [8, 4], [8, 5]];
			else
				return [[6, 6], [6, 7], [6, 8], [7, 6], [7, 7], [7, 8], [8, 6], [8, 7], [8, 8]];
		}
	}

	this.setCell = function(row, col, value) {
		this.board[row][col] = value;
		if (value != 0)
			this.possibilities[row][col] = [];

		// Clear out the possibilities
		for (var r = 0; r < 9; r++) {
			var x = this.possibilities[r][col].indexOf(value);
			if (x > -1)
				this.possibilities[r][col].splice(x, 1);
		}

		for (var c = 0; c < 9; c++) {
			var x = this.possibilities[row][c].indexOf(value);
			if (x > -1)
				this.possibilities[row][c].splice(x, 1);
		}

		var indices = this.getSectionIndices(row, col);
		for (var j = 0; j < indices.length; j++) {
			coord = indices[j];			
			var p = this.possibilities[coord[0]][coord[1]];
			var x = p.indexOf(value);
			if (x > -1)
				p.splice(x, 1);
		}
	}

	this.getCell = function(r, c) {
		return this.board[r][c];
	}

	this.dump = function() {
		var g = "";
		for (var r = 0; r < 9; r++) {
			var txt = "";
			for (var c = 0; c < 9; c++) {
				txt += this.board[r][c] + " ";
			}
			g += txt + "\n";
		}

		return g;
	}

	this.checkGrid = function() {
		var finished = true;
		var errors = [];
		
		// Check each row 
		for (var r = 0; r < 9; r++) {
			sqrs = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
			for (var c = 0; c < 9; c++) {
				if (this.board[r][c] == 0)
					finished = false;
				else {
					sqrs[this.board[r][c]] += 1;
					if (sqrs[this.board[r][c]] > 1) {
						errors.push("Error " + r + "," + c);
					}
				}
			}
		}

		// Check the columns 
		for (var c = 0; c < 9; c++) {
			sqrs = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
			for (var r = 0; r < 9; r++) {
				if (this.board[r][c] == 0)
					finished = false;
				else {
					sqrs[this.board[r][c]] += 1;
					if (sqrs[this.board[r][c]] > 1) {
						errors.push("Error " + r + "," + c);
					}
				}
			}
		}

		// Check the nine sub-sections 
		var start_r = 0;
		while (start_r < 9) {
			var start_c = 0;
			while (start_c < 9) {
				sqrs = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
				for (var r = start_r; r <= start_r + 2; r++) {
					for (var c = start_c; c <= start_c + 2; c++) {
						if (this.board[r][c] == 0)
							finished = false;
						else {
							sqrs[this.board[r][c]] += 1;
							if (sqrs[this.board[r][c]] > 1) {
								errors.push("Error " + r + "," + c);
							}
						}
					}
				}
				start_c += 3;
			}
			
			start_r += 3;
		}

		return { "finished" : finished, "errors" : errors }
	}
}

function cellSelector(table, row, col) {
	var cell = "r" + row + "c" + col;
	return sel = table + " #" + cell + " :first-child";
}

function getCell(table, row, col) {
	return $(cellSelector(table, row, col)).val();
}

function clearStyles(table, row, col) {
	$(cellSelector(table, row, col)).removeClass("error");
	$(cellSelector(table, row, col)).removeClass("marked");
}

function markError(table, row, col) {	
	$(cellSelector(table, row, col)).addClass("error");	
}

function writeCell(table, row, col, value) {
	if (value == '' || (!isNaN(value) && value >= 1 && value <= 9))
		$(cellSelector(table, row, col)).val(value);	
}

function initializeEntryTable() {
	// This is the example puzzle provided in the description of Euler #96
	writeCell("#entry-table", 0, 2, 3);
	writeCell("#entry-table", 0, 4, 2);
	writeCell("#entry-table", 0, 6, 6);
	writeCell("#entry-table", 1, 0, 9);
	writeCell("#entry-table", 1, 3, 3);
	writeCell("#entry-table", 1, 5, 5);
	writeCell("#entry-table", 1, 8, 1);
	writeCell("#entry-table", 2, 2, 1);
	writeCell("#entry-table", 2, 3, 8);
	writeCell("#entry-table", 2, 5, 6);
	writeCell("#entry-table", 2, 6, 4);
	writeCell("#entry-table", 3, 2, 8);
	writeCell("#entry-table", 3, 3, 1);
	writeCell("#entry-table", 3, 5, 2);
	writeCell("#entry-table", 3, 6, 9);
	writeCell("#entry-table", 4, 0, 7);
	writeCell("#entry-table", 4, 8, 8);
	writeCell("#entry-table", 5, 2, 6);
	writeCell("#entry-table", 5, 3, 7);
	writeCell("#entry-table", 5, 5, 8);
	writeCell("#entry-table", 5, 6, 2);
	writeCell("#entry-table", 6, 2, 2);
	writeCell("#entry-table", 6, 3, 6);
	writeCell("#entry-table", 6, 5, 9);
	writeCell("#entry-table", 6, 6, 5);
	writeCell("#entry-table", 7, 0, 8);
	writeCell("#entry-table", 7, 3, 2);
	writeCell("#entry-table", 7, 5, 3);
	writeCell("#entry-table", 7, 8, 9);
	writeCell("#entry-table", 8, 2, 5);
	writeCell("#entry-table", 8, 4, 1);
	writeCell("#entry-table", 8, 6, 3);
}

// Look for any squares that have only a single possibility
function checkForSingles(board) {
	for (var r = 0; r < 9; r++) {
		for (var c = 0; c < 9; c++) {
			if (board.possibilities[r][c].length == 1) {
				return [r, c, board.possibilities[r][c][0]];
			}
		}
	}

	return [];
}

function doMove(board, move) {
	writeCell("#entry-table", move[0], move[1], move[2]);
	$(cellSelector("#entry-table", move[0], move[1])).addClass("marked");
	board.setCell(move[0], move[1], move[2]);
}

function clearPuzzle() {
	for (var r = 0; r < 9; r++) {
		for (var c = 0; c < 9; c++) {
			clearStyles("#entry-table", r, c);
			writeCell("#entry-table", r, c, '');
		}
	}
}

function solvePuzzle() {
	board = new Board();

	for (var r = 0; r < 9; r++) {
		for (var c = 0; c < 9; c++) {
			var v = parseInt(getCell("#entry-table", r, c));
			if (isNaN(v))
				v = 0;

			board.setCell(r, c, v);
			clearStyles("#entry-table", r, c)			
		}
	}

	var result = board.checkGrid();
	if (result.errors.length > 0) {
		result.errors.map(function(err) {
			r = parseInt(err.substring(5, 7));
			c = parseInt(err.substring(8));
			markError("#entry-table", r, c);
		});
		alert("There were errors in the entered puzzle.");
	}
	else {
		while (true) {
			found_move = false;

			var move = checkForSingles(board);
			if (move.length > 0) {
				found_move = true;
				doMove(board, move);
			}

			if (!found_move)
				break;
		}
	}
}