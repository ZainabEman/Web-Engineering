/**
 * ES6 String Utilities Module
 * Demonstrates ES6 module syntax with exported functions for string manipulation.
 */

// Regular expressions for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - The input string
 * @returns {string} The title-cased string
 */
export function titleCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param {string} str - The input string
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} The truncated string
 */
export function truncate(str, maxLength) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  if (typeof maxLength !== 'number' || maxLength <= 0) {
    throw new TypeError('Max length must be a positive number');
  }
  
  if (str.length <= maxLength) {
    return str;
  }
  
  return str.slice(0, maxLength) + '...';
}

/**
 * Reverses a string
 * @param {string} str - The input string
 * @returns {string} The reversed string
 */
export function reverse(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  return str.split('').reverse().join('');
}

/**
 * Counts the occurrences of a substring within a string
 * @param {string} str - The input string
 * @param {string} substring - The substring to count
 * @returns {number} The number of occurrences
 */
export function countOccurrences(str, substring) {
  if (typeof str !== 'string' || typeof substring !== 'string') {
    throw new TypeError('Both inputs must be strings');
  }
  
  if (substring.length === 0) {
    return 0;
  }
  
  let count = 0;
  let position = str.indexOf(substring);
  
  while (position !== -1) {
    count++;
    position = str.indexOf(substring, position + 1);
  }
  
  return count;
}

/**
 * Removes all HTML tags from a string
 * @param {string} html - The HTML string
 * @returns {string} The plain text string
 */
export function stripHtml(html) {
  if (typeof html !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Validation utility class with various string validation methods
 */
export class Validator {
  /**
   * Checks if a string is a valid email
   * @param {string} email - The email to validate
   * @returns {boolean} Whether the email is valid
   */
  static isValidEmail(email) {
    if (typeof email !== 'string') {
      return false;
    }
    return EMAIL_REGEX.test(email);
  }
  
  /**
   * Checks if a string is a valid URL
   * @param {string} url - The URL to validate
   * @returns {boolean} Whether the URL is valid
   */
  static isValidUrl(url) {
    if (typeof url !== 'string') {
      return false;
    }
    return URL_REGEX.test(url);
  }
  
  /**
   * Checks if a password meets security requirements
   * @param {string} password - The password to validate
   * @returns {boolean} Whether the password is valid
   */
  static isStrongPassword(password) {
    if (typeof password !== 'string') {
      return false;
    }
    return PASSWORD_REGEX.test(password);
  }
  
  /**
   * Checks if a string contains only alphanumeric characters
   * @param {string} str - The string to validate
   * @returns {boolean} Whether the string is alphanumeric
   */
  static isAlphanumeric(str) {
    if (typeof str !== 'string') {
      return false;
    }
    return /^[a-zA-Z0-9]+$/.test(str);
  }
}

/**
 * Formatter class for common string formatting tasks
 */
export class Formatter {
  /**
   * Formats a number as currency
   * @param {number} amount - The amount to format
   * @param {string} currencyCode - The currency code (e.g., 'USD')
   * @param {string} locale - The locale (e.g., 'en-US')
   * @returns {string} The formatted currency string
   */
  static formatCurrency(amount, currencyCode = 'USD', locale = 'en-US') {
    if (typeof amount !== 'number') {
      throw new TypeError('Amount must be a number');
    }
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode
    }).format(amount);
  }
  
  /**
   * Formats a date as a string
   * @param {Date} date - The date to format
   * @param {string} format - The format string ('short', 'medium', 'long', or 'full')
   * @param {string} locale - The locale (e.g., 'en-US')
   * @returns {string} The formatted date string
   */
  static formatDate(date, format = 'medium', locale = 'en-US') {
    if (!(date instanceof Date)) {
      throw new TypeError('Date must be a Date object');
    }
    
    return new Intl.DateTimeFormat(locale, { dateStyle: format }).format(date);
  }
  
  /**
   * Converts newlines to HTML <br> tags
   * @param {string} str - The input string
   * @returns {string} The string with <br> tags
   */
  static nl2br(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
    }
    
    return str.replace(/\n/g, '<br>');
  }
}

/**
 * Text analysis utilities
 */
const TextAnalyzer = {
  /**
   * Calculates the reading time in minutes
   * @param {string} text - The text to analyze
   * @param {number} wordsPerMinute - Average reading speed (default: 200)
   * @returns {number} Estimated reading time in minutes
   */
  getReadingTime(text, wordsPerMinute = 200) {
    if (typeof text !== 'string') {
      throw new TypeError('Text must be a string');
    }
    
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  },
  
  /**
   * Counts words in a text
   * @param {string} text - The text to analyze
   * @returns {number} The word count
   */
  countWords(text) {
    if (typeof text !== 'string') {
      throw new TypeError('Text must be a string');
    }
    
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  },
  
  /**
   * Returns the most frequent words in a text
   * @param {string} text - The text to analyze
   * @param {number} limit - Maximum number of words to return
   * @returns {Array} Array of [word, count] pairs
   */
  getFrequentWords(text, limit = 5) {
    if (typeof text !== 'string') {
      throw new TypeError('Text must be a string');
    }
    
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCounts = {};
    
    for (const word of words) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
    
    return Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  }
};

// Default export
export default {
  titleCase,
  truncate,
  reverse,
  countOccurrences,
  stripHtml,
  Validator,
  Formatter,
  TextAnalyzer
}; 