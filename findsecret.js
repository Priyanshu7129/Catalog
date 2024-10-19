const fs = require('fs');

// Function to parse JSON file
function parseInput(file) {
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
}

// Function to convert a number from a given base to decimal
function convertBase(value, base) {
    return parseInt(value, base);
}

// Lagrange Interpolation function
function lagrangeInterpolation(points) {
    let constantTerm = 0;

    for (let i = 0; i < points.length; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let productTerm = yi;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let xj = points[j][0];
                productTerm *= (0 - xj) / (xi - xj);
            }
        }

        constantTerm += productTerm;
    }

    return Math.round(constantTerm); // Return the rounded constant term
}

// Main function to find the constant term 'c'
function findConstantTerm(input) {
    const { n, k } = input.keys;
    let points = [];

    // Collect all the x, y points
    for (let i = 1; i <= n; i++) {
        const key = i.toString();
        if (input[key]) { // Check if the key exists
            const base = parseInt(input[key]["base"]);
            const value = input[key]["value"];
            const x = i;
            const y = convertBase(value, base);
            points.push([x, y]);
        }
    }

    // Find constant term using Lagrange Interpolation
    return lagrangeInterpolation(points.slice(0, k));  // Use the first k points
}

// Load and process the input JSON files
const input1 = parseInput('input1.json');
const input2 = parseInput('input2.json');

// Calculate the constants for both test cases
const secret1 = findConstantTerm(input1);
const secret2 = findConstantTerm(input2);

// Print the results
console.log("Secret for Test Case 1:", secret1);
console.log("Secret for Test Case 2:", secret2);
