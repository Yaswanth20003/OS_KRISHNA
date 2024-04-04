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

    while (startR < rows && startC < columns) {
        let minCost = Number.MAX_SAFE_INTEGER;
        let minR = -1;
        let minC = -1;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (supply[i] > 0 && demand[j] > 0 && grid[i][j] < minCost) {
                    minCost = grid[i][j];
                    minR = i;
                    minC = j;
                }
            }
        }

        let units = Math.min(supply[minR], demand[minC]);
        ans += units * minCost;
        supply[minR] -= units;
        demand[minC] -= units;

        if (supply[minR] === 0) startR++;
        if (demand[minC] === 0) startC++;
    }

    document.getElementById('solution').innerHTML = "The initial feasible basic solution using Least Cost Method is " + ans;
}
