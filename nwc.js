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

    document.getElementById('supplyInputs').innerHTML = '';
    document.getElementById('demandInputs').innerHTML = '';

    for (var i = 0; i < rows; i++) {
        var div = document.createElement('div');
        div.innerHTML = '<label>Supply for Row ' + (i + 1) + ':</label><input type="number" class="supplyInput" placeholder="Enter supply">';
        document.getElementById('supplyInputs').appendChild(div);
    }

    for (var j = 0; j < columns; j++) {
        var div = document.createElement('div');
        div.innerHTML = '<label>Demand for Column ' + (j + 1) + ':</label><input type="number" class="demandInput" placeholder="Enter demand">';
        document.getElementById('demandInputs').appendChild(div);
    }
}

function calculateSolution() {
    let grid = [];
    let supply = [];
    let demand = [];
    let startR = 0;
    let startC = 0;
    let ans = 0;

    var rows = parseInt(document.getElementById('rows').value);
    var columns = parseInt(document.getElementById('columns').value);
    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < columns; j++) {
            grid[i].push(parseInt(document.getElementById('cell_' + i + '_' + j).value));
        }
    }

    var supplyInputs = document.querySelectorAll('.supplyInput');
    supplyInputs.forEach(function(input) {
        supply.push(parseInt(input.value));
    });

    var demandInputs = document.querySelectorAll('.demandInput');
    demandInputs.forEach(function(input) {
        demand.push(parseInt(input.value));
    });

    while (startR !== grid.length && startC !== grid[0].length) {
        if (supply[startR] <= demand[startC]) {
            ans += supply[startR] * grid[startR][startC];
            demand[startC] -= supply[startR];
            startR += 1;
        } else {
            ans += demand[startC] * grid[startR][startC];
            supply[startR] -= demand[startC];
            startC += 1;
        }
    }

    document.getElementById('solution').innerHTML = "The initial feasible basic solution is " + ans;
}
