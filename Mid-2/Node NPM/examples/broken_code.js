/**
 * Broken Code Example
 * 
 * This file contains multiple intentional errors for you to fix.
 * Each error is marked with a comment indicating what type of issue it is.
 * 
 * Types of errors:
 * 1. Syntax errors
 * 2. Module import/require errors
 * 3. Undefined variable errors
 * 4. Logic errors
 * 5. Async/callback errors
 */

// ISSUE 1: Missing module error - lodash is misspelled
const lodsh = require('lodash');

// ISSUE 2: Incorrect path for local module (missing ./)
const math = require('commonjs_math');

// ISSUE 3: Syntax error in destructuring
const { readFile, writeFile, } = require('fs');

// ISSUE 4: No error, this is correct
const path = require('path');

// Helper function for logging
function log(message) {
  // ISSUE 5: Syntax error in template string (missing backtick)
  console.log("[LOG] ${message}");
}

// ISSUE 6: Async function definition missing 'async' keyword
function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

// ISSUE 7: Function declared with const but then used before declaration
processData({ name: 'John', age: 30 });

// ISSUE 8: Arrow function missing parentheses around parameter
const formatName = name => {
  // ISSUE 9: Undefined variable (should be name.toUpperCase())
  return NAME.toUpperCase();
};

// ISSUE 10: The function called in ISSUE 7
const processData = (data) => {
  // ISSUE 11: Object property access error (undefined.property)
  const formattedName = formatName(data.firstName);
  
  // ISSUE 12: Logic error in conditional (wrong comparison operator)
  if (data.age = 30) {
    log('Age is 30');
  } else {
    log('Age is not 30');
  }
  
  // ISSUE 13: Incorrectly accessing lodash methods (typo in variable name)
  const values = lodsh.values(data);
  
  return {
    name: formattedName,
    // ISSUE 14: Missing comma in object literal
    age: data.age
    values: values
  };
};

// ISSUE 15: Problems with Promise/async handling
function saveUserData(userData) {
  // ISSUE 16: Not returning the Promise
  writeFile('user.json', JSON.stringify(userData), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      // ISSUE 17: Missing return here
    }
    log('File written successfully');
  });
}

// ISSUE 18: Using .then() incorrectly (trying to use await outside async function)
const loadAndProcessFile = (filePath) => {
  // ISSUE 19: Trying to use await outside of an async function
  const data = await readFileAsync(filePath);
  const jsonData = JSON.parse(data);
  return processData(jsonData);
};

// Main function with multiple errors to fix
function main() {
  try {
    // ISSUE 20: Missing try/catch for async operation
    const filePath = path.join(__dirname, 'data', 'sample.json');
    log(`Reading file: ${filePath}`);
    
    // Create directory if it doesn't exist
    const dirPath = path.join(__dirname, 'data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    
    // Sample data to write to a file
    const sampleData = {
      name: 'John',
      age: 30,
      // ISSUE 21: Unclosed string literal
      email: 'john@example.com,
      hobbies: ['reading', 'swimming']
    };
    
    // ISSUE 22: fs is not defined (require missing)
    fs.writeFileSync(
      path.join(dirPath, 'sample.json'),
      JSON.stringify(sampleData, null, 2)
    );
    
    // ISSUE 23: Incorrect use of callback vs. Promise
    const result = loadAndProcessFile(filePath);
    console.log('Processed data:', result);
    
    // ISSUE 24: Using filter incorrectly with wrong number of arguments
    const numbers = [1, 2, 3, 4, 5];
    const evenNumbers = numbers.filter();
    console.log('Even numbers:', evenNumbers);
    
    // ISSUE 25: Logic error in calculation
    const sumOfNumbers = numbers.reduce((total, num) => total * num, 0);
    console.log('Sum of numbers:', sumOfNumbers);
    
    // ISSUE 26: This will always be true (=== vs !==)
    if (evenNumbers.length === 0) {
      console.log('No even numbers found');
    } else {
      console.log('Even numbers found');
    }
    
    log('All operations completed successfully');
  } catch (error) {
    // ISSUE 27: Incorrectly accessing error message
    console.error('An error occurred:', error.description);
  }
}

// ISSUE 28: Incorrect export syntax for CommonJS
export default main;

// ISSUE 29: This will cause reference error (variable used before declaration)
console.log(`The answer is: ${answer}`);
const answer = 42;

// ISSUE 30: Unreachable code after return
function unreachableDemo() {
  return 'This is reachable';
  console.log('This is not reachable');
}

// Run the main function
main(); 