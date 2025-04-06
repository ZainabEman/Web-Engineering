# Node.js and NPM Practice Materials

This repository contains study materials for Node.js and NPM concepts, including both documentation and practical examples.

## Getting Started

1. Clone or download this repository
2. Install dependencies:
   ```
   npm install
   ```

## Project Structure

- `notes/`: Detailed documentation on Node.js and NPM concepts
- `examples/`: Practical code examples demonstrating various concepts

## Running the Examples

### CommonJS Module Example
```
npm start
```
or
```
node examples/app_commonjs.js
```

### ES6 Module Example
```
npm run start:es6
```
or
```
node examples/app_es6.js
```

### Advanced Package Usage
```
npm run advanced
```
or
```
node examples/advanced_package_usage.js
```

### Script Runner Example
```
npm run script:run
```
or
```
node examples/script_runner.js
```

### Debug Example
This example is intentionally broken. Try to run it and fix the issues:
```
npm run debug
```
or
```
node examples/debug_example.js
```

### Broken Code Example
This file contains intentional errors for practice:
```
npm run fix
```
or
```
node examples/broken_code.js
```

## Study Notes

The `notes/` directory contains detailed information on:

- `npm_basics.md`: NPM fundamentals and usage
- `node_basics.md`: Node.js fundamentals
- `modules_commonjs.md`: CommonJS module system
- `modules_es6.md`: ES6 module system
- `troubleshooting.md`: Common issues and solutions

## Practice Exercises

1. Fix the `debug_example.js` file (hint: check package.json configuration)
2. Identify and fix issues in `broken_code.js`
3. Modify existing examples to add new functionality
4. Create a new module that combines both CommonJS and ES6 modules 