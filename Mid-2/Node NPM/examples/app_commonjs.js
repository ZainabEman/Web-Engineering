/**
 * CommonJS Module Application Example
 * Demonstrates how to use CommonJS modules in a Node.js application.
 */

// Import core Node.js modules
const fs = require('fs');
const path = require('path');
const os = require('os');

// Import third-party packages from node_modules
const _ = require('lodash');
const moment = require('moment');
const chalk = require('chalk');

// Import our local CommonJS module
const math = require('./commonjs_math');

// Create a log function to show colored output
const log = {
  info: (message) => console.log(chalk.blue(`[INFO] ${message}`)),
  success: (message) => console.log(chalk.green(`[SUCCESS] ${message}`)),
  warning: (message) => console.log(chalk.yellow(`[WARNING] ${message}`)),
  error: (message) => console.log(chalk.red(`[ERROR] ${message}`))
};

/**
 * Main application function
 */
function runApplication() {
  log.info('Starting CommonJS module application example');
  log.info(`Current time: ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
  log.info(`Running on Node.js ${process.version}`);
  log.info(`Platform: ${os.platform()} ${os.release()}`);
  
  // --------------------------------
  // Demonstrate using the math module
  // --------------------------------
  
  log.info('\nDemonstrating math module usage:');
  
  // Basic arithmetic
  try {
    const sum = math.add(10, 5);
    const difference = math.subtract(10, 5);
    const product = math.multiply(10, 5);
    const quotient = math.divide(10, 5);
    
    log.success(`Addition: 10 + 5 = ${sum}`);
    log.success(`Subtraction: 10 - 5 = ${difference}`);
    log.success(`Multiplication: 10 * 5 = ${product}`);
    log.success(`Division: 10 / 5 = ${quotient}`);
  } catch (err) {
    log.error(`Error in basic arithmetic: ${err.message}`);
  }
  
  // Advanced math
  try {
    const powerResult = math.power(2, 8);
    const sqrtResult = math.squareRoot(64);
    
    log.success(`Power: 2^8 = ${powerResult}`);
    log.success(`Square root: √64 = ${sqrtResult}`);
  } catch (err) {
    log.error(`Error in advanced math: ${err.message}`);
  }
  
  // Geometry calculations
  try {
    const radius = 5;
    const circleArea = math.geometry.circleArea(radius);
    
    const width = 10;
    const height = 6;
    const rectangleArea = math.geometry.rectangleArea(width, height);
    
    log.success(`Circle area (r=${radius}): ${circleArea.toFixed(2)}`);
    log.success(`Rectangle area (${width}x${height}): ${rectangleArea}`);
  } catch (err) {
    log.error(`Error in geometry calculations: ${err.message}`);
  }
  
  // Statistics
  try {
    const numbers = [12, 5, 8, 16, 3, 9, 21];
    const avg = math.statistics.average(numbers);
    const maximum = math.statistics.max(numbers);
    const minimum = math.statistics.min(numbers);
    
    log.success(`Numbers: ${numbers.join(', ')}`);
    log.success(`Average: ${avg.toFixed(2)}`);
    log.success(`Maximum: ${maximum}`);
    log.success(`Minimum: ${minimum}`);
  } catch (err) {
    log.error(`Error in statistics: ${err.message}`);
  }
  
  // Using the Calculator object
  try {
    const calculator = math.Calculator;
    
    calculator.perform('add', 7, 3);
    calculator.perform('multiply', 5, 5);
    calculator.perform('power', 2, 4);
    
    log.success('Calculator operations performed:');
    calculator.getHistory().forEach((entry, index) => {
      log.info(`  ${index + 1}. ${entry.operation}(${entry.args.join(', ')}) = ${entry.result}`);
    });
  } catch (err) {
    log.error(`Error using Calculator: ${err.message}`);
  }
  
  // --------------------------------
  // Demonstrate using lodash
  // --------------------------------
  
  log.info('\nDemonstrating lodash usage:');
  
  // Array operations
  const numbers = [1, 2, 3, 4, 5];
  const doubled = _.map(numbers, n => n * 2);
  const sum = _.sum(numbers);
  const evens = _.filter(numbers, n => n % 2 === 0);
  
  log.success(`Original array: ${numbers.join(', ')}`);
  log.success(`Doubled with _.map: ${doubled.join(', ')}`);
  log.success(`Sum with _.sum: ${sum}`);
  log.success(`Even numbers with _.filter: ${evens.join(', ')}`);
  
  // Object operations
  const person = {
    name: 'Alice',
    age: 30,
    occupation: 'Engineer'
  };
  
  log.success(`Person object: ${JSON.stringify(person)}`);
  log.success(`Keys with _.keys: ${_.keys(person).join(', ')}`);
  log.success(`Values with _.values: ${_.values(person).join(', ')}`);
  
  // Using _.pick to create a new object with selected properties
  const picked = _.pick(person, ['name', 'occupation']);
  log.success(`Picked properties with _.pick: ${JSON.stringify(picked)}`);
  
  // --------------------------------
  // Demonstrate file system operations
  // --------------------------------
  
  log.info('\nDemonstrating file system operations:');
  
  // Create a temporary file
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, 'commonjs-demo.txt');
  
  try {
    // Write to a file synchronously (blocking)
    fs.writeFileSync(
      tempFilePath, 
      `CommonJS Demo File\nCreated at: ${moment().format('YYYY-MM-DD HH:mm:ss')}\n`
    );
    log.success(`File created: ${tempFilePath}`);
    
    // Append to the file asynchronously (non-blocking)
    fs.appendFile(
      tempFilePath,
      'This content was added asynchronously.\n',
      (err) => {
        if (err) {
          log.error(`Error appending to file: ${err.message}`);
          return;
        }
        
        log.success('Content appended to file');
        
        // Read the file after appending
        fs.readFile(tempFilePath, 'utf8', (err, data) => {
          if (err) {
            log.error(`Error reading file: ${err.message}`);
            return;
          }
          
          log.success('File contents:');
          console.log(chalk.gray('-'.repeat(40)));
          console.log(chalk.white(data));
          console.log(chalk.gray('-'.repeat(40)));
          
          // Cleanup - Delete the file
          fs.unlink(tempFilePath, (err) => {
            if (err) {
              log.error(`Error deleting file: ${err.message}`);
              return;
            }
            
            log.success('Temporary file deleted');
          });
        });
      }
    );
  } catch (err) {
    log.error(`File system error: ${err.message}`);
  }
}

// Run the application
runApplication(); 