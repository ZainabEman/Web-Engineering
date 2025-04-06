# Node.js Basics

## What is Node.js?

Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server-side, outside of a browser environment.

Key characteristics:
- **Event-driven**: Uses an event loop for non-blocking I/O operations
- **Single-threaded**: Uses a single thread with asynchronous programming
- **Cross-platform**: Runs on Windows, macOS, Linux, and more
- **Open-source**: Free to use and modify

## Why Use Node.js?

1. **JavaScript Everywhere**: Use the same language for frontend and backend
2. **Non-blocking I/O**: Efficiently handle many concurrent connections
3. **Large Ecosystem**: Access to thousands of packages via npm
4. **Fast Execution**: Built on the high-performance V8 engine
5. **Scalability**: Well-suited for microservices and real-time applications

## Node.js Architecture

```
┌────────────────────────────┐
│       Node.js Application  │
├────────────────────────────┤
│      Node.js Bindings      │
├────────┬──────────┬────────┤
│   V8   │  libuv   │  Other │
│ Engine │(Event Loop)│ C/C++ │
│        │          │ Libraries│
└────────┴──────────┴────────┘
```

- **V8 Engine**: Compiles JavaScript to machine code
- **libuv**: Provides the event loop and asynchronous I/O
- **Bindings**: Connect JavaScript to C/C++ libraries
- **Core Modules**: Built-in modules like `fs`, `http`, `path`

## The Event Loop

Node.js operates on a single-threaded event loop model:

1. Events are queued as they occur
2. The event loop processes events one at a time
3. Non-blocking I/O operations continue in the background
4. Callbacks are executed when operations complete

```javascript
// Example of non-blocking I/O
const fs = require('fs');

console.log('Start reading file...');

// This doesn't block execution
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File data:', data);
});

console.log('Continue executing while file is being read...');
```

## Core Modules

Node.js comes with several built-in modules:

### File System (`fs`)

```javascript
const fs = require('fs');

// Synchronous (blocking)
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error('Error reading file:', err);
}

// Asynchronous (non-blocking)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(data);
});

// Promise-based with fs/promises (Node.js 14+)
const fsPromises = require('fs/promises');

async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}
```

### HTTP/HTTPS

```javascript
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set status code and headers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Send response body
  res.end('Hello World\n');
});

// Listen on port 3000
server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000/');
});
```

### Path

```javascript
const path = require('path');

// Platform-specific separator
console.log(`Path separator: ${path.sep}`);

// Join path segments
const filePath = path.join('folder', 'subfolder', 'file.txt');
console.log(filePath); // folder/subfolder/file.txt (Unix) or folder\subfolder\file.txt (Windows)

// Get file information
console.log(path.basename(filePath)); // file.txt
console.log(path.dirname(filePath));  // folder/subfolder
console.log(path.extname(filePath));  // .txt

// Resolve absolute path
console.log(path.resolve('folder', 'file.txt')); // /current/working/dir/folder/file.txt
```

### URL

```javascript
const url = require('url');

// Parse URL
const myUrl = new URL('https://example.com:8080/path?query=value#fragment');

console.log(myUrl.hostname);  // example.com
console.log(myUrl.pathname);  // /path
console.log(myUrl.searchParams.get('query')); // value
console.log(myUrl.hash);      // #fragment
```

### Events

```javascript
const EventEmitter = require('events');

// Create custom event emitter
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Register event listener
myEmitter.on('event', (arg1, arg2) => {
  console.log('Event occurred with arguments:', arg1, arg2);
});

// Emit event
myEmitter.emit('event', 'arg1 value', 'arg2 value');
```

## Working with JSON

```javascript
// Parse JSON string to object
const jsonString = '{"name":"John","age":30,"city":"New York"}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // John

// Convert object to JSON string
const person = {
  name: 'Jane',
  age: 25,
  address: {
    city: 'Boston',
    state: 'MA'
  }
};
const personJson = JSON.stringify(person, null, 2); // Pretty-printed with 2 spaces
console.log(personJson);
```

## Asynchronous Programming in Node.js

### Callbacks

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'product' };
    callback(null, data);
  }, 1000);
}

fetchData((err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Data:', data);
});
```

### Promises

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'product' };
      resolve(data);
      // If error: reject(new Error('Something went wrong'));
    }, 1000);
  });
}

fetchData()
  .then(data => console.log('Data:', data))
  .catch(err => console.error('Error:', err));
```

### Async/Await

```javascript
async function getData() {
  try {
    const data = await fetchData(); // fetchData returns a Promise
    console.log('Data:', data);
    return data;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

// Call the async function
getData().then(result => {
  console.log('Result:', result);
});
```

## Process and Environment Variables

```javascript
// Access command-line arguments
console.log(process.argv); // [node path, script path, arg1, arg2, ...]

// Current working directory
console.log(process.cwd());

// Environment variables
console.log(process.env.NODE_ENV);

// Set environment variables
process.env.MY_VARIABLE = 'my value';

// Exit the process
process.exit(0); // 0 indicates success, non-zero indicates error
```

## Error Handling

```javascript
// Try/catch (for synchronous code)
try {
  // Code that might throw an error
  const data = JSON.parse('invalid json');
} catch (err) {
  console.error('Error parsing JSON:', err.message);
}

// Error handling in callbacks
fs.readFile('nonexistent.txt', (err, data) => {
  if (err) {
    console.error('File read error:', err.message);
    return;
  }
  // Process data...
});

// Error handling with promises
fetchData()
  .then(data => {
    // Process data...
  })
  .catch(err => {
    console.error('Fetch error:', err.message);
  });

// Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  // Perform cleanup
  process.exit(1);
});
```

## Global Objects

- `global`: The global namespace object (similar to `window` in browsers)
- `process`: Information about the current Node.js process
- `console`: Output to stdout and stderr
- `Buffer`: For handling binary data
- `__dirname`: Directory name of the current module
- `__filename`: File name of the current module
- `require()`: Function to include modules
- `module`: Reference to the current module
- `exports`: Shorthand for `module.exports`

## Debugging Node.js Applications

### Using console

```javascript
console.log('Informational message');
console.error('Error message');
console.warn('Warning message');
console.time('timer');
// Code to measure...
console.timeEnd('timer'); // Outputs elapsed time
console.table([{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]);
```

### Using Node.js Debugger

```bash
# Start with inspector
node --inspect app.js

# Break on first line
node --inspect-brk app.js
```

Then open Chrome at `chrome://inspect` to access the debugger. 