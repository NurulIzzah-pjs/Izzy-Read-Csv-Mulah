window.onload = function() {
    loadCsvData("Table_Input.csv", function(csv) {
        var table1Data = parseCsv(csv);
        displayTable(table1Data, "table1-container");
        var table2Data = calculateTable2(table1Data);
        displayTable2(table2Data, "table2-container");
    });
}

function loadCsvData(filePath, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status == 0) {
                callback(xhr.responseText);
            }
        }
    }
    xhr.open("GET", filePath, true);
    xhr.send(null);
}

function parseCsv(csv) {
    var lines = csv.trim().split("\n");
    var result = [];
    var headers = lines[0].split(",").map(function(h) { return h.trim(); }); // Trim header cells

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",").map(function(cell) { return cell.trim(); }); // Trim data cells

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result; // Returns array of objects
}

function displayTable(data, containerId) {
    var html = "<table>";
    // Headers
    html += "<tr>";
    Object.keys(data[0]).forEach(function(key) {
        html += "<th>" + key + "</th>";
    });
    html += "</tr>";
    // Data
    data.forEach(function(row) {
        html += "<tr>";
        Object.keys(row).forEach(function(key) {
            html += "<td>" + row[key] + "</td>";
        });
        html += "</tr>";
    });
    html += "</table>";
    document.getElementById(containerId).innerHTML = html;
}

function calculateTable2(table1Data) {
    // Log the values that will be used in calculations to verify they are correct
    console.log('A5:', table1Data[4]["A"]);
    console.log('A20:', table1Data[19]["A"]);
    console.log('A15:', table1Data[14]["A"]);
    console.log('A7:', table1Data[6]["A"]);
    console.log('A13:', table1Data[12]["A"]);
    console.log('A12:', table1Data[11]["A"]);

    // Attempt to parse the CSV values as integers
    var columnToAccess = "Value"; // This should be the name of the column containing the values you need.

    var a5 = parseInt(table1Data[4][columnToAccess], 10);
    var a20 = parseInt(table1Data[19][columnToAccess], 10);
    var a15 = parseInt(table1Data[14][columnToAccess], 10);
    var a7 = parseInt(table1Data[6][columnToAccess], 10);
    var a13 = parseInt(table1Data[12][columnToAccess], 10);
    var a12 = parseInt(table1Data[11][columnToAccess], 10);

    // Check if any of the parsed values are NaN
    if (isNaN(a5) || isNaN(a20) || isNaN(a15) || isNaN(a7) || isNaN(a13) || isNaN(a12)) {
        console.error('One of the calculations involves a non-numeric value.');
    }

    var table2 = {
        "Alpha": a5 + a20,
        "Beta": Math.floor(a15 / a7), // Use Math.floor to ensure an integer result
        "Charlie": a13 * a12
    };

    return table2;
}

function displayTable2(data, containerId) {
    var html = "<table>";
    for (var key in data) {
        html += "<tr><td>" + key + "</td><td>" + data[key] + "</td></tr>";
    }
    html += "</table>";
    document.getElementById(containerId).innerHTML = html;
}
