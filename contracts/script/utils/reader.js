const fs = require('fs');

// Path from contracts folder (where script runs) to the folder containing the function code
const baseFunctionCodeFilePath = '../functions/services/function-code-flat/';

function readFileAndStringify(functionFileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${baseFunctionCodeFilePath}${functionFileName}`, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                // Stringify the contents
                const jsonString = JSON.stringify(data);
                resolve(jsonString);
            }
        });
    });
}

// Get the filename from command line arguments 
const args = process.argv.slice(2); // Exclude the first two elements (node and script name)
const functionFileName = args[0];

if (!functionFileName) {
    console.error('Please provide a filename as a command line argument.');
} else {
    readFileAndStringify(functionFileName)
        .then((result) => {
            console.log('File contents as a string:', result);
        })
        .catch((error) => {
            console.error('Error reading file:', error);
        });
}
