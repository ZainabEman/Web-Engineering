/**
 * Debug Example
 * 
 * This file is intentionally broken! It demonstrates a common issue with ES6 imports
 * in a Node.js environment that isn't configured for ES modules.
 * 
 * To fix this, you need to either:
 * 1. Add "type": "module" to package.json
 * 2. Rename this file to debug_example.mjs
 * 3. Use CommonJS require() instead of import
 */

// This import statement will fail because the project is not configured to use ES modules
import { titleCase, truncate } from './es6_stringUtils.js';
import path from 'path';
import fs from 'fs';

// Colorful console logging with chalk (imported using ES6 syntax)
import chalk from 'chalk';

/**
 * Process a text file, applying string transformations to each line
 * @param {string} filePath - Path to the text file
 * @returns {Promise<Array>} Array of processed lines
 */
async function processFile(filePath) {
  console.log(chalk.blue(`Processing file: ${filePath}`));
  
  try {
    // Read the file content
    const content = await fs.promises.readFile(filePath, 'utf8');
    
    // Process each line
    const lines = content.split('\n');
    const processedLines = lines.map((line, index) => {
      // Apply transformations
      const titleCased = titleCase(line);
      const truncated = truncate(titleCased, 50);
      
      console.log(chalk.green(`Processed line ${index + 1}`));
      return truncated;
    });
    
    console.log(chalk.blue(`Processed ${processedLines.length} lines`));
    return processedLines;
  } catch (err) {
    console.error(chalk.red(`Error processing file: ${err.message}`));
    throw err;
  }
}

/**
 * Main function to run the example
 */
async function main() {
  try {
    console.log(chalk.yellow('Starting debug example...'));
    
    // Create a sample text file
    const sampleFilePath = path.join(__dirname, '..', 'temp', 'sample.txt');
    const sampleContent = [
      'this is a sample line that will be title-cased and possibly truncated.',
      'another example of text that will undergo transformation using our utility functions.',
      'the goal is to demonstrate how to debug and fix module import errors in node.js.',
      'once you fix the issue, this script should process these lines correctly.'
    ].join('\n');
    
    // Ensure the directory exists
    const dir = path.dirname(sampleFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write the sample file
    await fs.promises.writeFile(sampleFilePath, sampleContent);
    console.log(chalk.green(`Created sample file at: ${sampleFilePath}`));
    
    // Process the file
    const processedLines = await processFile(sampleFilePath);
    
    // Output the results
    console.log(chalk.yellow('\nProcessed content:'));
    processedLines.forEach((line, index) => {
      console.log(chalk.cyan(`${index + 1}: ${line}`));
    });
    
    console.log(chalk.green('\nSuccessfully completed the example!'));
  } catch (err) {
    console.error(chalk.red(`\nAn error occurred: ${err.message}`));
    console.error(chalk.red('\nThis error is expected! The purpose of this example is to debug and fix it.'));
    console.error(chalk.yellow('\nHint: Look at the top comments in this file for potential solutions.'));
  }
}

// Run the main function
main(); 