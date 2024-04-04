function generateMatrix() {
    var rows = parseInt(document.getElementById('rows').value);
    var columns = parseInt(document.getElementById('columns').value);
    var matrixHTML = '';

    for (var i = 0; i < rows; i++) {
        matrixHTML += '<tr>';
        for (var j = 0; j < columns; j++) {
            matrixHTML += '<td><input type="text" id="cell_' + i + '_' + j + '"></td>';
        }
        matrixHTML += '</tr>';
    }

    document.getElementById('matrix').innerHTML = matrixHTML;
}

function calculateSolution() {
    let grid = [];
    let ans = 0;

    var rows = parseInt(document.getElementById('rows').value);
    var columns = parseInt(document.getElementById('columns').value);
    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < columns; j++) {
            grid[i].push(parseInt(document.getElementById('cell_' + i + '_' + j).value));
        }
    }

   
    while (grid.length < Math.max(rows, columns)) {
        if (grid.length < rows) {
            grid.push(new Array(columns).fill(0));
        }
        if (grid[0].length < columns) {
            for (let i = 0; i < grid.length; i++) {
                grid[i].push(0);
            }
        }
    }

   
    let assigned = [];
    for (let i = 0; i < rows; i++) {
        assigned.push(-1);
    }

    for (let j = 0; j < columns; j++) {
        let visited = new Array(columns).fill(false);
        if (match(j, visited, assigned, grid, rows)) ans += grid[assigned[j]][j];
    }

    function match(j, visited, assigned, grid, rows) {
        for (let i = 0; i < rows; i++) {
            if (grid[i][j] && !visited[i]) {
                visited[i] = true;
                if (assigned[j] === -1 || match(assigned[j], visited, assigned, grid, rows)) {
                    assigned[j] = i;
                    return true;
                }
            }
        }
        return false;
    }

    document.getElementById('solution').innerHTML = "The initial feasible basic solution using Assignment Method is " + ans;
}
