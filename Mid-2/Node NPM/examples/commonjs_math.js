/**
 * CommonJS Math Module
 * A complex example of a CommonJS module with multiple exports.
 */

// Private constants (not exported, only available within this file)
const PI = 3.14159265359;
const E = 2.71828182846;

/**
 * Basic arithmetic operations
 */
const add = (a, b) => {
  // Input validation
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a + b;
};

const subtract = (a, b) => {
  // Input validation
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a - b;
};

const multiply = (a, b) => {
  // Input validation
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a * b;
};

const divide = (a, b) => {
  // Input validation
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
};

/**
 * Advanced mathematical functions
 */
const power = (base, exponent) => {
  // Input validation
  if (typeof base !== 'number' || typeof exponent !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return Math.pow(base, exponent);
};

const squareRoot = (value) => {
  // Input validation
  if (typeof value !== 'number') {
    throw new TypeError('Argument must be a number');
  }
  if (value < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }
  return Math.sqrt(value);
};

/**
 * Geometry calculations
 */
const circleArea = (radius) => {
  // Input validation
  if (typeof radius !== 'number') {
    throw new TypeError('Radius must be a number');
  }
  if (radius < 0) {
    throw new Error('Radius cannot be negative');
  }
  return PI * radius * radius;
};

const rectangleArea = (width, height) => {
  // Input validation
  if (typeof width !== 'number' || typeof height !== 'number') {
    throw new TypeError('Width and height must be numbers');
  }
  if (width < 0 || height < 0) {
    throw new Error('Width and height cannot be negative');
  }
  return width * height;
};

/**
 * Statistical functions
 */
const average = (numbers) => {
  // Input validation
  if (!Array.isArray(numbers)) {
    throw new TypeError('Argument must be an array of numbers');
  }
  if (numbers.length === 0) {
    throw new Error('Cannot calculate average of empty array');
  }
  if (!numbers.every(num => typeof num === 'number')) {
    throw new TypeError('All array elements must be numbers');
  }
  
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
};

const max = (numbers) => {
  // Input validation
  if (!Array.isArray(numbers)) {
    throw new TypeError('Argument must be an array of numbers');
  }
  if (numbers.length === 0) {
    throw new Error('Cannot find maximum of empty array');
  }
  if (!numbers.every(num => typeof num === 'number')) {
    throw new TypeError('All array elements must be numbers');
  }
  
  return Math.max(...numbers);
};

const min = (numbers) => {
  // Input validation
  if (!Array.isArray(numbers)) {
    throw new TypeError('Argument must be an array of numbers');
  }
  if (numbers.length === 0) {
    throw new Error('Cannot find minimum of empty array');
  }
  if (!numbers.every(num => typeof num === 'number')) {
    throw new TypeError('All array elements must be numbers');
  }
  
  return Math.min(...numbers);
};

/**
 * Utility object with calculation history
 */
const Calculator = {
  history: [],
  
  perform: function(operation, ...args) {
    let result;
    
    switch (operation) {
      case 'add':
        result = add(...args);
        break;
      case 'subtract':
        result = subtract(...args);
        break;
      case 'multiply':
        result = multiply(...args);
        break;
      case 'divide':
        result = divide(...args);
        break;
      case 'power':
        result = power(...args);
        break;
      case 'squareRoot':
        result = squareRoot(...args);
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
    
    // Record the operation in history
    this.history.push({
      operation,
      args,
      result,
      timestamp: new Date()
    });
    
    return result;
  },
  
  getHistory: function() {
    return this.history;
  },
  
  clearHistory: function() {
    this.history = [];
    return true;
  }
};

/**
 * Constants used in calculations
 */
const Constants = {
  PI,
  E,
  GOLDEN_RATIO: 1.61803398875,
  SQRT2: Math.sqrt(2),
  SQRT3: Math.sqrt(3)
};

// Export individual functions
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.power = power;
exports.squareRoot = squareRoot;

// Export grouped functions as objects
exports.geometry = {
  circleArea,
  rectangleArea
};

exports.statistics = {
  average,
  max,
  min
};

// Export Calculator object
exports.Calculator = Calculator;

// Export constants
exports.Constants = Constants;

// You can also export with module.exports for a cleaner syntax
// This overwrites any previous exports
// module.exports = {
//   add, subtract, multiply, divide, power, squareRoot,
//   geometry: { circleArea, rectangleArea },
//   statistics: { average, max, min },
//   Calculator,
//   Constants
// }; 