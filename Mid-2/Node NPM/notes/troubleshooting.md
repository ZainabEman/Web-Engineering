# Node.js and NPM Troubleshooting Guide

This guide covers common issues and their solutions when working with Node.js and NPM.

## Module Resolution Issues

### Module Not Found Errors

**Problem**: `Error: Cannot find module 'some-module'`

**Possible Causes and Solutions**:

1. **Module not installed**
   ```bash
   npm install some-module
   ```

2. **Typo in module name**
   ```javascript
   // Wrong
   const module = require('scome-module');
   // Correct
   const module = require('some-module');
   ```

3. **Wrong path for local modules**
   ```javascript
   // Wrong - looks in node_modules
   const myModule = require('my-module');
   
   // Correct - looks for a local file
   const myModule = require('./my-module');
   ```

4. **Missing file extension (ES modules)**
   ```javascript
   // Wrong (for ES Modules)
   import utils from './utils';
   
   // Correct (for ES Modules)
   import utils from './utils.js';
   ```

5. **Case sensitivity issues**
   ```javascript
   // Wrong (if file is actually Utils.js)
   const utils = require('./utils.js');
   
   // Correct
   const utils = require('./Utils.js');
   ```

### ES Module vs CommonJS Confusion

**Problem**: `SyntaxError: Cannot use import statement outside a module`

**Solutions**:

1. **Add type module to package.json**
   ```json
   {
     "type": "module"
   }
   ```

2. **Use .mjs extension**
   ```bash
   # Rename file
   mv script.js script.mjs
   ```

3. **Use CommonJS syntax instead**
   ```javascript
   // Replace
   import express from 'express';
   // With
   const express = require('express');
   ```

**Problem**: `Error [ERR_REQUIRE_ESM]: require() of ES Module not supported`

**Solutions**:

1. **Use import instead of require**
   ```javascript
   // Replace
   const pkg = require('es-module-package');
   // With
   import pkg from 'es-module-package';
   ```

2. **Find a CommonJS alternative package**

3. **Create a wrapper module**
   ```javascript
   // wrapper.mjs
   import originalModule from 'es-module-package';
   export default originalModule;
   
   // Then in your CommonJS file
   const { createRequire } = require('module');
   const require = createRequire(import.meta.url);
   const pkg = require('./wrapper.cjs');
   ```

## NPM Issues

### Installation Problems

**Problem**: Failed npm install

**Solutions**:

1. **Clear npm cache**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and package-lock.json**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check for Node.js version compatibility**
   ```bash
   node -v
   # Make sure it matches the requirements in package.json
   ```

4. **Network issues - try with a different registry**
   ```bash
   npm set registry https://registry.npmjs.org/
   ```

5. **Permission issues (Linux/Mac)**
   ```bash
   sudo npm install -g some-package
   # Or better:
   npm install -g some-package --unsafe-perm=true --allow-root
   ```

### Version Conflicts

**Problem**: Dependency version conflicts

**Solutions**:

1. **Use npm outdated to see conflicts**
   ```bash
   npm outdated
   ```

2. **Update dependencies**
   ```bash
   npm update
   ```

3. **Use npm-check for interactive updates**
   ```bash
   npx npm-check -u
   ```

4. **Force a specific version**
   ```bash
   npm install some-package@specific-version
   ```

5. **Check for peer dependency issues**
   ```bash
   npm ls
   ```

## Runtime Errors

### Uncaught Exceptions

**Problem**: Unhandled exceptions crashing the application

**Solutions**:

1. **Use try/catch for synchronous code**
   ```javascript
   try {
     riskyOperation();
   } catch (err) {
     console.error('Error in risky operation:', err);
   }
   ```

2. **Handle promise rejections**
   ```javascript
   asyncFunction()
     .then(result => {
       // Handle result
     })
     .catch(err => {
       console.error('Async error:', err);
     });
   ```

3. **Global exception handler (last resort)**
   ```javascript
   process.on('uncaughtException', (err) => {
     console.error('Uncaught exception:', err);
     // Perform cleanup
     process.exit(1);
   });
   
   process.on('unhandledRejection', (reason, promise) => {
     console.error('Unhandled rejection at:', promise, 'reason:', reason);
     // Perform cleanup
     process.exit(1);
   });
   ```

### Memory Leaks

**Problem**: Application using increasingly more memory

**Solutions**:

1. **Find the leak with Node.js inspector**
   ```bash
   node --inspect app.js
   ```

2. **Take heap snapshots**
   ```javascript
   const heapdump = require('heapdump');
   heapdump.writeSnapshot('./heap-' + Date.now() + '.heapsnapshot');
   ```

3. **Common leak sources to check**:
   - Event listeners not being removed
   - Caches without size limits
   - Closures holding references to large objects
   - Timers/intervals not being cleared

## Dependency Issues

### Vulnerable Dependencies

**Problem**: Security vulnerabilities in dependencies

**Solutions**:

1. **Run security audit**
   ```bash
   npm audit
   ```

2. **Fix vulnerabilities**
   ```bash
   npm audit fix
   # For major version updates
   npm audit fix --force
   ```

3. **Update specific package**
   ```bash
   npm update vulnerable-package
   # Or install specific version
   npm install vulnerable-package@safe-version
   ```

### Breaking Changes in Dependencies

**Problem**: Updated dependency breaks your code

**Solutions**:

1. **Lock dependencies in package.json**
   ```json
   "dependencies": {
     "critical-package": "1.2.3"  // Exact version
   }
   ```

2. **Use package-lock.json**
   - Commit package-lock.json to version control
   - Run `npm ci` instead of `npm install` in CI/CD environments

3. **Temporarily downgrade**
   ```bash
   npm install critical-package@previous-version
   ```

## Environment Configuration Issues

### Missing Environment Variables

**Problem**: Application fails due to missing environment variables

**Solutions**:

1. **Create .env file**
   ```
   # .env
   DATABASE_URL=mongodb://localhost:27017/myapp
   API_KEY=your-secret-key
   ```

2. **Load with dotenv**
   ```javascript
   require('dotenv').config();
   // Now process.env.DATABASE_URL is available
   ```

3. **Provide defaults**
   ```javascript
   const apiKey = process.env.API_KEY || 'default-dev-key';
   ```

4. **Check existence at startup**
   ```javascript
   const requiredEnvVars = ['DATABASE_URL', 'API_KEY'];
   for (const envVar of requiredEnvVars) {
     if (!process.env[envVar]) {
       console.error(`Error: ${envVar} environment variable is required`);
       process.exit(1);
     }
   }
   ```

### Cross-Platform Issues

**Problem**: Code works on one OS but not another

**Solutions**:

1. **Use path module for file paths**
   ```javascript
   const path = require('path');
   const filePath = path.join(__dirname, 'data', 'config.json');
   ```

2. **Use cross-env for environment variables**
   ```json
   "scripts": {
     "start": "cross-env NODE_ENV=production node server.js"
   }
   ```

3. **Check for platform-specific code**
   ```javascript
   if (process.platform === 'win32') {
     // Windows-specific logic
   } else {
     // Unix-specific logic
   }
   ```

## Debugging Techniques

### Using Node Debugger

**Basic Debugging**:

```bash
# Start debugger
node --inspect app.js

# Break on first line
node --inspect-brk app.js
```

Then open Chrome at `chrome://inspect`

### Adding Debug Statements

**Using console**:

```javascript
console.log('Debug:', variable);
console.table(arrayOfObjects);
console.time('operation');
// ... operation
console.timeEnd('operation');
```

**Using debug package**:

```javascript
const debug = require('debug')('app:main');

debug('Server starting...');
debug('Config loaded:', config);

// Run with DEBUG=app:main node app.js
```

### Inspecting Network Issues

```javascript
// Log all HTTP requests in Express
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Log axios requests and responses
axios.interceptors.request.use(request => {
  console.log('Request:', request.method, request.url);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response.status, response.data);
  return response;
});
```

## Performance Issues

### Slow Application

**Solutions**:

1. **Profile with Node.js built-in profiler**
   ```bash
   node --prof app.js
   # After generating log file
   node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
   ```

2. **Use async/await properly**
   ```javascript
   // Bad - Sequential
   const resultA = await operationA();
   const resultB = await operationB();
   
   // Good - Parallel
   const [resultA, resultB] = await Promise.all([
     operationA(),
     operationB()
   ]);
   ```

3. **Check for blocking operations**
   ```javascript
   // Move to worker thread
   const { Worker } = require('worker_threads');
   
   const worker = new Worker('./worker.js');
   worker.on('message', (result) => {
     console.log('Worker result:', result);
   });
   ```

4. **Proper error handling**
   ```javascript
   // Avoid try-catch in hot paths
   function hotFunction() {
     // Critical path code
   }
   
   try {
     hotFunction();
   } catch (err) {
     console.error(err);
   }
   ```

## Common Specific Errors

### EADDRINUSE

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions**:

```javascript
// Find and kill the process
// On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

// On Unix
lsof -i :3000
kill -9 <PID>

// Or use a different port
const port = process.env.PORT || 3001;
```

### EACCES

**Problem**: `Error: EACCES: permission denied`

**Solutions**:

```bash
# Fix permissions
chmod 755 directory_name
chmod 644 file_name

# Use sudo (not recommended for npm)
sudo node script.js

# Use a port number above 1024
```

### ENOENT

**Problem**: `Error: ENOENT: no such file or directory`

**Solutions**:

```javascript
const fs = require('fs');
const path = require('path');

// Check file exists before reading
const filePath = path.join(__dirname, 'data.json');
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf8');
} else {
  console.error(`File not found: ${filePath}`);
}

// Create directory if it doesn't exist
const dirPath = path.join(__dirname, 'logs');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}
```

## Advanced Debugging

### Debugging Async Code

```javascript
async function complexOperation() {
  console.log('Starting complex operation');
  
  // Set a label for the debugger
  debugger;
  
  try {
    const result1 = await firstAsyncOperation();
    console.log('First operation result:', result1);
    
    // Another labeled breakpoint
    debugger;
    
    const result2 = await secondAsyncOperation(result1);
    console.log('Second operation result:', result2);
    
    return result2;
  } catch (err) {
    console.error('Error in complex operation:', err);
    throw err;
  }
}
```

### Debugging Memory Issues

```javascript
// Track memory usage
const memoryUsage = () => {
  const formatMem = (bytes) => (bytes / 1024 / 1024).toFixed(2) + ' MB';
  const memoryData = process.memoryUsage();
  
  return {
    rss: formatMem(memoryData.rss), // Resident Set Size
    heapTotal: formatMem(memoryData.heapTotal),
    heapUsed: formatMem(memoryData.heapUsed),
    external: formatMem(memoryData.external)
  };
};

console.log('Memory usage:', memoryUsage());

// Check memory at intervals
setInterval(() => {
  console.log('Memory usage:', memoryUsage());
}, 60000); // Every minute
```

## Testing and Validation

### Validating Package.json

```bash
npm ls --depth=0
```

### Testing Module Loading

```javascript
try {
  require.resolve('some-module');
  console.log('Module is installed');
} catch (err) {
  console.error('Module is not installed:', err.message);
}
```

### Checking for Circular Dependencies

```javascript
// Install circular-dependency-plugin if using webpack
// Or use madge
npx madge --circular --extensions js .
```

## Deployment Issues

### Process Exits Unexpectedly

**Solutions**:

1. **Use a process manager**
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start application with PM2
   pm2 start app.js --name "myapp"
   
   # Monitor
   pm2 monit
   
   # View logs
   pm2 logs
   ```

2. **Implement proper graceful shutdown**
   ```javascript
   const server = app.listen(3000);
   
   process.on('SIGTERM', () => {
     console.log('SIGTERM signal received: closing HTTP server');
     server.close(() => {
       console.log('HTTP server closed');
       // Close database connections
       // Clean up other resources
       process.exit(0);
     });
   });
   ```

### Invalid package.json

**Problem**: Malformed package.json causing npm errors

**Solution**:

```bash
# Validate package.json
npx package-json-validator package.json

# Fix basic issues
npm init -y
```

## Fixing Specific NPM Errors

### npm ERR! code ELIFECYCLE

**Problem**: Script exited with error code

**Solutions**:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Check for errors in your scripts
```

### npm ERR! code EPERM

**Problem**: Permission errors on Windows

**Solutions**:

```bash
# Close applications that might be using the files
# Run Command Prompt as Administrator
# Try using a different directory
```

### npm ERR! code EINTEGRITY

**Problem**: Checksum mismatch

**Solution**:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
``` 