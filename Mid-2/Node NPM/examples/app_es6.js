/**
 * ES6 Module Application Example
 * Demonstrates how to use ES6 modules in a Node.js application.
 * 
 * Note: To run this file, you need either:
 * 1. Add "type": "module" to package.json, or
 * 2. Rename this file to app_es6.mjs, or
 * 3. Run with: node --input-type=module app_es6.js
 */

// Import from core Node.js modules
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

// Import from third-party packages
// Note: Some packages may not support ES modules
// We're importing specific functions/methods from lodash-es (ES module version of lodash)
import { chunk, shuffle, uniq, sortBy } from 'lodash-es';

// Import from moment (using dynamic import because moment doesn't support ES modules natively)
let moment;
try {
  // Dynamic import returns a promise
  const momentModule = await import('moment');
  moment = momentModule.default;
} catch (err) {
  console.error('Error importing moment:', err);
  // Fallback implementation if moment fails to load
  moment = {
    format: () => new Date().toISOString()
  };
}

// Import chalk (using dynamic import for the same reason)
let chalk;
try {
  const chalkModule = await import('chalk');
  chalk = chalkModule.default;
} catch (err) {
  console.error('Error importing chalk:', err);
  // Fallback implementation if chalk fails to load
  chalk = {
    blue: text => text,
    green: text => text,
    yellow: text => text,
    red: text => text,
    gray: text => text,
    white: text => text
  };
}

// Import specific named exports from our ES6 module
import { 
  titleCase, 
  truncate, 
  reverse, 
  countOccurrences, 
  Validator, 
  Formatter 
} from './es6_stringUtils.js';

// Import the default export as 'stringUtils'
import stringUtils from './es6_stringUtils.js';

// Get the directory name (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
async function runApplication() {
  log.info('Starting ES6 module application example');
  log.info(`Current time: ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
  log.info(`Running on Node.js ${process.version}`);
  log.info(`Platform: ${os.platform()} ${os.release()}`);
  
  // --------------------------------
  // Demonstrate using named imports
  // --------------------------------
  
  log.info('\nDemonstrating named imports from es6_stringUtils.js:');
  
  try {
    const sampleText = "hello world from ES6 modules";
    const titled = titleCase(sampleText);
    const truncated = truncate(sampleText, 15);
    const reversed = reverse(sampleText);
    const occurrences = countOccurrences(sampleText, 'o');
    
    log.success(`Original text: "${sampleText}"`);
    log.success(`Title case: "${titled}"`);
    log.success(`Truncated: "${truncated}"`);
    log.success(`Reversed: "${reversed}"`);
    log.success(`Number of 'o' characters: ${occurrences}`);
  } catch (err) {
    log.error(`Error in string operations: ${err.message}`);
  }
  
  // --------------------------------
  // Demonstrate using imported classes
  // --------------------------------
  
  log.info('\nDemonstrating imported classes:');
  
  try {
    // Validator class
    const validEmail = 'user@example.com';
    const invalidEmail = 'not-an-email';
    
    log.success(`"${validEmail}" is a valid email: ${Validator.isValidEmail(validEmail)}`);
    log.success(`"${invalidEmail}" is a valid email: ${Validator.isValidEmail(invalidEmail)}`);
    
    // Formatter class
    const price = 1234.56;
    const formattedPrice = Formatter.formatCurrency(price);
    log.success(`Formatted currency: ${formattedPrice}`);
    
    const date = new Date();
    const formattedDate = Formatter.formatDate(date, 'long');
    log.success(`Formatted date: ${formattedDate}`);
  } catch (err) {
    log.error(`Error using imported classes: ${err.message}`);
  }
  
  // --------------------------------
  // Demonstrate using default import
  // --------------------------------
  
  log.info('\nDemonstrating default import (stringUtils):');
  
  try {
    const html = "<p>This is <strong>HTML</strong> content with <a href='#'>links</a>.</p>";
    const plainText = stringUtils.stripHtml(html);
    log.success(`Original HTML: "${html}"`);
    log.success(`Stripped HTML: "${plainText}"`);
    
    const text = "This is a fairly long piece of text that would take some time to read fully.";
    const readingTime = stringUtils.TextAnalyzer.getReadingTime(text);
    const wordCount = stringUtils.TextAnalyzer.countWords(text);
    
    log.success(`Text: "${text}"`);
    log.success(`Word count: ${wordCount}`);
    log.success(`Reading time: ${readingTime} minute(s)`);
  } catch (err) {
    log.error(`Error using default import: ${err.message}`);
  }
  
  // --------------------------------
  // Demonstrate lodash functions
  // --------------------------------
  
  log.info('\nDemonstrating lodash-es functions:');
  
  try {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // Chunk into groups of 3
    const chunked = chunk(numbers, 3);
    log.success(`Original array: [${numbers.join(', ')}]`);
    log.success(`Chunked into groups of 3: ${JSON.stringify(chunked)}`);
    
    // Shuffle the array
    const shuffled = shuffle([...numbers]); // Create a copy to shuffle
    log.success(`Shuffled: [${shuffled.join(', ')}]`);
    
    // Unique values
    const duplicates = [1, 1, 2, 3, 3, 3, 4, 5, 5];
    const unique = uniq(duplicates);
    log.success(`Array with duplicates: [${duplicates.join(', ')}]`);
    log.success(`Unique values: [${unique.join(', ')}]`);
    
    // Sort by property
    const people = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 }
    ];
    const sortedByAge = sortBy(people, ['age']);
    log.success('Sorted by age:');
    sortedByAge.forEach(person => {
      log.info(`  ${person.name}: ${person.age}`);
    });
  } catch (err) {
    log.error(`Error using lodash functions: ${err.message}`);
  }
  
  // --------------------------------
  // Demonstrate file system operations with Promises
  // --------------------------------
  
  log.info('\nDemonstrating file system operations with Promises:');
  
  // Create a temporary file
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, 'es6-demo.txt');
  
  try {
    // Write to a file
    await fs.writeFile(
      tempFilePath, 
      `ES6 Module Demo File\nCreated at: ${moment().format('YYYY-MM-DD HH:mm:ss')}\n`
    );
    log.success(`File created: ${tempFilePath}`);
    
    // Append to the file
    await fs.appendFile(
      tempFilePath,
      'This content was added with fs.promises.\n'
    );
    log.success('Content appended to file');
    
    // Read the file
    const data = await fs.readFile(tempFilePath, 'utf8');
    log.success('File contents:');
    console.log(chalk.gray('-'.repeat(40)));
    console.log(chalk.white(data));
    console.log(chalk.gray('-'.repeat(40)));
    
    // Get file stats
    const stats = await fs.stat(tempFilePath);
    log.success(`File size: ${stats.size} bytes`);
    log.success(`File created: ${stats.birthtime}`);
    log.success(`File modified: ${stats.mtime}`);
    
    // Delete the file
    await fs.unlink(tempFilePath);
    log.success('Temporary file deleted');
  } catch (err) {
    log.error(`File system error: ${err.message}`);
  }
  
  // --------------------------------
  // Demonstrate top-level await
  // --------------------------------
  
  log.info('\nDemonstrating top-level await:');
  
  try {
    // Simulate an asynchronous operation
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve('This data was fetched asynchronously');
      }, 1000);
    });
    
    log.success(`Async result: ${result}`);
  } catch (err) {
    log.error(`Async error: ${err.message}`);
  }
}

// Run the application
await runApplication(); 