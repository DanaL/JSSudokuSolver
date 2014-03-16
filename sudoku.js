function Grid() {
	this.grid = new Array();
	for (var j = 0; j < 9; j++) {
		this.grid[j] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	this.setCell = function(r, c, value) {
		this.grid[r][c] = value;
	}

	this.getCell = function(r, c) {
		return this.grid[r][c];
	}

	this.dump = function() {
		var g = "";
		for (var r = 0; r < 9; r++) {
			var txt = "";
			for (var c = 0; c < 9; c++) {
				txt += this.grid[r][c] + " ";
			}
			g += txt + "\n";
		}

		return g;
	}
}

function getCell(table, row, col) {
	var cell = "r" + row + "c" + col;
	var sel = table + " #" + cell + " :first-child";
	
	return $(sel).val();
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
	/* This is the example puzzle provided in the description of Euler #96 */
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
	grid = new Grid();
	grid.setCell(0, 0, 9);
	grid.setCell(0, 8, 8);
	grid.setCell(8, 8, 4);
	grid.setCell(4, 4, 1);
	alert(grid.dump());
}