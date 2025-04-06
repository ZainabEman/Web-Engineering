# CommonJS Modules

## What are CommonJS Modules?

CommonJS is a module format specification for JavaScript that was originally designed for server-side use in environments like Node.js. It allows you to organize code into reusable pieces with proper encapsulation and dependency management.

## Why Use CommonJS Modules?

- **Code Organization**: Split code into smaller, focused files
- **Encapsulation**: Keep variables and functions private within modules
- **Dependency Management**: Explicitly declare and load dependencies
- **Reusability**: Share code between different parts of an application

## How CommonJS Modules Work

Each file in CommonJS is treated as a separate module with its own scope. Code in a file cannot directly access variables or functions in another file without explicitly importing them.

### Module Scope

Variables and functions defined in a module are private by default:

```javascript
// math.js
const PI = 3.14159; // Private to this module

function square(x) {
  return x * x;
}

function add(a, b) {
  return a + b;
}

// Only square is exported, add and PI remain private
module.exports = square;
```

```javascript
// app.js
const square = require('./math');

console.log(square(5)); // 25
console.log(PI); // ReferenceError: PI is not defined
console.log(add(2, 3)); // ReferenceError: add is not defined
```

## Exporting from Modules

### Single Export

```javascript
// logger.js
function log(message) {
  console.log(`[LOG] ${message}`);
}

// Export a single function
module.exports = log;
```

### Multiple Named Exports

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

// Export multiple functions as an object
module.exports = {
  add,
  subtract,
  multiply,
  divide
};
```

### Extending Exports

```javascript
// utils.js
exports.formatDate = function(date) {
  return date.toISOString().split('T')[0];
};

exports.capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// CAUTION: This won't work!
// exports = { newFunction: function() {} };  // Breaks the reference to module.exports

// Instead, use:
module.exports.newFunction = function() {
  console.log('This is a new function');
};

// Or replace the entire exports object:
module.exports = {
  formatDate: function(date) { /* ... */ },
  capitalize: function(str) { /* ... */ },
  newFunction: function() { /* ... */ }
};
```

## Importing Modules

### Importing Local Modules

```javascript
// Relative paths for your own modules
const math = require('./math');
const utils = require('./utils');
const log = require('./logger');
const config = require('../config');
```

### Importing Core Modules

```javascript
// Core Node.js modules (no path needed)
const fs = require('fs');
const path = require('path');
const http = require('http');
```

### Importing npm Packages

```javascript
// Third-party modules from node_modules
const lodash = require('lodash');
const express = require('express');
const moment = require('moment');
```

## Using Imported Modules

### Single Export

```javascript
// Importing a single function
const log = require('./logger');

log('Hello World!'); // [LOG] Hello World!
```

### Multiple Exports

```javascript
// Importing an object with multiple exports
const math = require('./math');

console.log(math.add(2, 3)); // 5
console.log(math.multiply(4, 5)); // 20

// Using destructuring to import specific functions
const { add, subtract } = require('./math');

console.log(add(10, 5)); // 15
console.log(subtract(10, 5)); // 5
```

## Module Caching

Node.js caches modules after they are loaded for the first time. This means that if you require the same module multiple times, you'll get the same instance:

```javascript
// counter.js
let count = 0;

module.exports = {
  increment: function() {
    return ++count;
  },
  getCount: function() {
    return count;
  }
};
```

```javascript
// app.js
const counter1 = require('./counter');
const counter2 = require('./counter');

console.log(counter1.increment()); // 1
console.log(counter2.increment()); // 2
console.log(counter1.getCount()); // 2
console.log(counter2.getCount()); // 2

// counter1 and counter2 reference the same module instance
console.log(counter1 === counter2); // true
```

To get a fresh instance, you would need to export a constructor or factory function:

```javascript
// counter-factory.js
module.exports = function createCounter() {
  let count = 0;
  return {
    increment: function() {
      return ++count;
    },
    getCount: function() {
      return count;
    }
  };
};
```

```javascript
// app.js
const createCounter = require('./counter-factory');

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1.increment()); // 1
console.log(counter2.increment()); // 1
console.log(counter1.getCount()); // 1
console.log(counter2.getCount()); // 1

// counter1 and counter2 are different instances
console.log(counter1 === counter2); // false
```

## Module Resolution

Node.js uses a specific algorithm to find modules:

1. **Core modules**: If the name has no path (e.g., `require('fs')`), Node first checks if it's a built-in module
2. **File or directory in node_modules**:
   - If not a core module, Node looks in the current directory's `node_modules` folder
   - If not found, it moves up to the parent directory's `node_modules`, and so on
3. **Local file**:
   - If the require name starts with `./`, `../`, or `/`, Node treats it as a file path
   - It tries the exact filename, then adds extensions (`.js`, `.json`, `.node`)
   - If the path points to a directory, Node looks for `package.json` with a `main` field, or `index.js`

```javascript
// Module resolution examples

// Core module
const fs = require('fs');

// npm package in node_modules
const lodash = require('lodash');

// Local files (relative paths)
const myModule = require('./my-module');          // ./my-module.js
const config = require('./config');               // ./config.js
const utils = require('./utils');                 // ./utils/index.js
const helper = require('../helpers/formatter');   // ../helpers/formatter.js

// Local files (absolute paths)
const routes = require('/app/routes');            // /app/routes.js
```

## Circular Dependencies

CommonJS allows circular dependencies, but they can create unexpected behavior:

```javascript
// a.js
console.log('a.js is loading');
const b = require('./b');
console.log('in a.js, b.loaded =', b.loaded);
module.exports = {
  loaded: true
};
```

```javascript
// b.js
console.log('b.js is loading');
const a = require('./a');
console.log('in b.js, a.loaded =', a.loaded);
module.exports = {
  loaded: true
};
```

```javascript
// main.js
require('./a');
```

Output:
```
a.js is loading
b.js is loading
in b.js, a.loaded = undefined
in a.js, b.loaded = true
```

When a circular dependency occurs, one module will receive an incomplete (partially filled) export from the other.

## Creating a Package with index.js

In CommonJS, a directory can be treated as a module if it contains an `index.js` file:

```
my-package/
├── index.js
├── lib/
│   ├── math.js
│   └── utils.js
└── ...
```

```javascript
// my-package/lib/math.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
```

```javascript
// my-package/lib/utils.js
exports.formatNumber = (num) => num.toFixed(2);
```

```javascript
// my-package/index.js
// Re-export components from submodules
const math = require('./lib/math');
const utils = require('./lib/utils');

module.exports = {
  ...math,
  ...utils,
  version: '1.0.0'
};
```

```javascript
// app.js
const myPackage = require('./my-package');

console.log(myPackage.add(2, 3)); // 5
console.log(myPackage.formatNumber(3.14159)); // "3.14"
console.log(myPackage.version); // "1.0.0"
```

## Conditional Exports

For more sophisticated modules, you can conditionally export different functionality:

```javascript
// logger.js
let logger;

if (process.env.NODE_ENV === 'production') {
  logger = function(message) {
    // Write to file, send to monitoring service, etc.
    console.log(`[PROD] ${new Date().toISOString()}: ${message}`);
  };
} else {
  logger = function(message) {
    // Simple development logging
    console.log(`[DEV] ${message}`);
  };
}

module.exports = logger;
```

## JSON Modules

Node.js can import JSON files directly with `require()`:

```javascript
// config.json
{
  "port": 3000,
  "database": {
    "host": "localhost",
    "user": "admin",
    "password": "secret"
  }
}
```

```javascript
// app.js
const config = require('./config.json');

console.log(`Server will run on port ${config.port}`);
console.log(`Database host: ${config.database.host}`);
```

## When to Use CommonJS vs ES Modules

Use CommonJS modules when:

1. You're working with an older Node.js project (pre-v12)
2. You need compatibility with various Node.js environments
3. You're using packages that only support CommonJS
4. You need dynamic imports (`require()` can be called conditionally)
5. You want simpler configuration (ES modules need file extensions and package.json setup)

ES modules (covered in another document) offer advantages like:
- Static analysis and tree-shaking
- Top-level await
- Native browser support
- Asynchronous module loading

## Common Mistakes and Pitfalls

1. **Forgetting to export**: If nothing is assigned to `module.exports` or `exports`, the module will export an empty object

2. **Breaking the exports reference**:
   ```javascript
   // This doesn't work!
   exports = { myFunction: function() {} }; // Breaks the reference to module.exports
   
   // Instead use:
   module.exports = { myFunction: function() {} };
   // or
   exports.myFunction = function() {};
   ```

3. **Importing a file without .js extension that doesn't exist**:
   ```javascript
   // If utils.js doesn't exist but utils/index.js does:
   const utils = require('./utils'); // Works - looks for index.js
   
   // But:
   const utils = require('./utils.js'); // Error - specifically looking for utils.js
   ```

4. **Path resolution confusion**:
   ```javascript
   // Wrong - looks in node_modules
   const myModule = require('my-module');
   
   // Correct - looks for a local file
   const myModule = require('./my-module');
   ```

5. **Circular dependency issues**: Be careful with modules that import each other 