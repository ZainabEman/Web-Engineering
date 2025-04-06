# ES6 Modules

## What are ES6 Modules?

ES6 Modules (also called ECMAScript Modules or ESM) are the standardized module system built into the JavaScript language specification. They provide a way to organize code into separate files with their own scope and explicit imports/exports.

## Why Use ES6 Modules?

- **Standard**: Native to JavaScript language, not just Node.js
- **Static Analysis**: Imports and exports are statically analyzable
- **Tree Shaking**: Dead code elimination during bundling
- **Top-level Await**: Supports await at the module level (in modern environments)
- **Browser Compatibility**: Can be used directly in modern browsers
- **Scope Isolation**: Each module has its own scope

## Enabling ES6 Modules in Node.js

There are several ways to use ES6 modules in Node.js:

1. **File Extension**: Use `.mjs` extension instead of `.js`
2. **package.json**: Add `"type": "module"` to your package.json
3. **--input-type=module**: Run Node with the `--input-type=module` flag

```json
// package.json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js"
}
```

## Export Syntax

### Named Exports

You can export individual variables, functions, or classes using the `export` keyword:

```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
}
```

You can also declare first and export later:

```javascript
// utils.js
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class StringFormatter {
  // Class implementation...
}

// Export list at the end
export { formatDate, capitalize, StringFormatter };
```

### Default Exports

Each module can have one default export, which is often used when a module exports a single main value:

```javascript
// logger.js
function log(message) {
  console.log(`[LOG] ${message}`);
}

export default log;
```

```javascript
// user.js
export default class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  getInfo() {
    return `${this.name} (${this.email})`;
  }
}
```

### Mixed Exports

You can combine default and named exports in the same module:

```javascript
// api.js
export const BASE_URL = 'https://api.example.com';
export const API_KEY = 'abc123';

function fetchData(endpoint) {
  return fetch(`${BASE_URL}/${endpoint}?key=${API_KEY}`);
}

export { fetchData as getData };  // Export with a different name

// The default export
export default {
  get: fetchData,
  post: (endpoint, data) => {
    // Implementation...
  },
  // Other methods...
};
```

### Re-exporting

You can re-export items from another module:

```javascript
// index.js
export { default as User } from './user.js';
export { formatDate, capitalize } from './utils.js';
export * from './constants.js';  // Re-export all named exports
export { default } from './api.js';  // Re-export the default as default
```

## Import Syntax

### Importing Named Exports

```javascript
// app.js
import { add, subtract, PI } from './math.js';

console.log(add(2, 3)); // 5
console.log(subtract(10, 4)); // 6
console.log(PI); // 3.14159
```

### Importing with Aliases

```javascript
// app.js
import { add as sum, subtract as minus } from './math.js';

console.log(sum(2, 3)); // 5
console.log(minus(10, 4)); // 6
```

### Importing Default Exports

```javascript
// app.js
import log from './logger.js';
import User from './user.js';

log('Hello world!');

const user = new User('John', 'john@example.com');
console.log(user.getInfo());
```

### Importing Both Default and Named Exports

```javascript
// app.js
import api, { BASE_URL, API_KEY } from './api.js';

console.log(BASE_URL); // https://api.example.com
api.get('users')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Importing Everything as a Namespace

```javascript
// app.js
import * as math from './math.js';

console.log(math.add(2, 3)); // 5
console.log(math.PI); // 3.14159
console.log(new math.Calculator().add(4, 5)); // 9
```

### Dynamic Imports

ES modules support dynamic imports using the `import()` function, which returns a Promise:

```javascript
// app.js
async function loadModule() {
  try {
    // Dynamic import
    const { default: User, validateEmail } = await import('./user.js');
    
    const user = new User('John', 'john@example.com');
    console.log(user.getInfo());
    
    if (validateEmail(user.email)) {
      console.log('Valid email!');
    }
  } catch (error) {
    console.error('Error loading module:', error);
  }
}

// You can conditionally import modules
if (process.env.NODE_ENV === 'development') {
  import('./dev-tools.js')
    .then(module => {
      module.setupDevEnvironment();
    });
}
```

## Key Differences from CommonJS

ES6 Modules differ from CommonJS in several important ways:

1. **Syntax**: Different import/export syntax
   ```javascript
   // CommonJS
   const module = require('./module');
   module.exports = { /* ... */ };
   
   // ES6
   import module from './module.js';
   export default { /* ... */ };
   ```

2. **Static Analysis**: ES6 imports/exports are statically analyzable
   ```javascript
   // CommonJS - dynamic, can be conditional
   if (condition) {
     const module = require('./module');
   }
   
   // ES6 - static, must be at top level
   import module from './module.js'; // Must be at top level
   if (condition) {
     module.doSomething();
   }
   ```

3. **File Extensions**: ES6 imports typically require file extensions
   ```javascript
   // CommonJS
   const utils = require('./utils');
   
   // ES6
   import utils from './utils.js'; // .js is required
   ```

4. **Asynchronous by Design**: ES6 modules are loaded asynchronously
   ```javascript
   // CommonJS loads synchronously
   const data = require('./data');
   console.log(data);
   
   // ES6 modules are evaluated in a second phase
   import { data } from './data.js';
   console.log(data);
   ```

5. **Top-level await**: Supported in ES6 modules (in Node.js 14+)
   ```javascript
   // ES6 module
   const response = await fetch('https://api.example.com/data');
   export const data = await response.json();
   ```

6. **Strict Mode**: ES6 modules are always in strict mode, while CommonJS isn't

## Using in the Browser

ES6 modules can be used directly in modern browsers:

```html
<!DOCTYPE html>
<html>
<head>
  <title>ES6 Modules Example</title>
</head>
<body>
  <script type="module">
    import { formatDate } from './utils.js';
    
    console.log(formatDate(new Date()));
  </script>
  
  <!-- Or from an external file -->
  <script type="module" src="app.js"></script>
</body>
</html>
```

## Top-Level Await

One of the powerful features of ES6 modules (in modern environments) is top-level await:

```javascript
// data.js - ES6 module with top-level await
const response = await fetch('https://api.example.com/data');
const data = await response.json();

export default data;
```

```javascript
// app.js
import data from './data.js';

// data is already resolved when the module is imported
console.log(data);
```

## Module Resolution

Node.js uses a different resolution algorithm for ES6 modules:

1. **File Extensions**: ES6 modules require file extensions (`.js`, `.mjs`)
2. **URL-based**: Import paths are treated as URLs
3. **No Index Resolution**: Auto-resolution of `index.js` doesn't work by default

```javascript
// Import with file extension (required in many cases)
import { add } from './math.js';

// Paths with no extensions work only in special cases
import config from './config'; // May not work, prefer './config.js'

// URLs are supported
import data from 'https://example.com/data.js';
```

## Package Exports

For more control over your package's public API, you can use the "exports" field in package.json:

```json
{
  "name": "my-package",
  "type": "module",
  "exports": {
    ".": "./index.js",
    "./utils": "./src/utils.js",
    "./math": "./src/math.js"
  }
}
```

This allows users to import specific parts of your package:

```javascript
import pkg from 'my-package';
import { formatDate } from 'my-package/utils';
import { add } from 'my-package/math';
```

## Dual Package Support (CommonJS and ES6)

To support both module formats, you can use conditional exports:

```json
{
  "name": "my-package",
  "type": "module",
  "exports": {
    ".": {
      "import": "./index.js",
      "require": "./commonjs/index.js"
    }
  }
}
```

## Best Practices

1. **File Extensions**: Always include file extensions (`.js`) in import paths
2. **Consistent Exports**: Choose a consistent export pattern (named or default)
3. **Barrel Files**: Use index files to re-export and simplify imports
4. **Explicit Imports**: Import only what you need to improve tree-shaking
5. **Proper Error Handling**: Wrap dynamic imports in try/catch
6. **Module Documentation**: Document your module's exports

## Common Issues and Solutions

1. **"SyntaxError: Cannot use import statement outside a module"**
   - Solution: Add `"type": "module"` to package.json or use `.mjs` extension

2. **"ERR_REQUIRE_ESM"**
   - Problem: Trying to require() an ES module
   - Solution: Use import instead of require

3. **"ERR_MODULE_NOT_FOUND"**
   - Problem: File not found, often due to missing extension
   - Solution: Ensure path includes the file extension (.js)

4. **"ERR_UNSUPPORTED_DIR_IMPORT"**
   - Problem: Importing a directory without a package.json with "exports" or "main"
   - Solution: Import the specific file or create a proper package.json

5. **Import maps for browser support**
   ```html
   <script type="importmap">
   {
     "imports": {
       "lodash": "/node_modules/lodash-es/lodash.js"
     }
   }
   </script>
   <script type="module">
     import _ from 'lodash';
   </script>
   ```

## Tools and Compatibility

- **Babel**: Transpile ES6 modules to CommonJS for older environments
- **Webpack/Rollup**: Bundle ES6 modules for browser usage
- **TypeScript**: Supports ES6 module syntax with static type checking
- **Node.js**: Full support in recent versions (12.x and later)
- **Browsers**: Support varies, use import maps or bundlers for compatibility 