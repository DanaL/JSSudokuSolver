function Board() {
	this.board = new Array();
	for (var j = 0; j < 9; j++) {
		this.board[j] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	this.setCell = function(r, c, value) {
		this.board[r][c] = value;
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

function getCell(table, row, col) {
	var cell = "r" + row + "c" + col;
	var sel = table + " #" + cell + " :first-child";
	
	return $(sel).val();
}

function clearError(table, row, col) {
	var cell = "r" + row + "c" + col;
	var sel = table + " #" + cell + " :first-child";

	$(sel).removeClass("error");
}

function markError(table, row, col) {
	var cell = "r" + row + "c" + col;
	var sel = table + " #" + cell + " :first-child";

	$(sel).addClass("error");	
}

function writeCell(table, row, col, value) {
	if (isNaN(value) || value < 1 || value > 9)
		return;

	if (row >= 0 &&  row < 9 && col >= 0 && col < 9) {
		var cell = "r" + row + "c" + col;
		var sel = table + " #" + cell + " :first-child";
		$(sel).val(value);
	}
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

function solvePuzzle() {
	board = new Board();

	for (var r = 0; r < 9; r++) {
		for (var c = 0; c < 9; c++) {
			var v = parseInt(getCell("#entry-table", r, c));
			if (isNaN(v))
				v = 0;

			board.setCell(r, c, v);
			clearError("#entry-table", r, c);
		}
	}

	var result = board.checkGrid();
	if (result["errors"].length > 0) {
		for (var x = 0; x < result.errors.length; x ++) {
			r = parseInt(result.errors[x].substring(5, 7));
			c = parseInt(result.errors[x].substring(8));
			markError("#entry-table", r, c);
		}
		alert("There were errors in the entered puzzle.");
	}
}