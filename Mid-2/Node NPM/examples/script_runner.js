/**
 * Script Runner Example
 * 
 * This file demonstrates how to use NPM scripts and access information from package.json.
 * It also shows how to create a script that could be executed via NPM scripts.
 */

// Import required modules
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');
const { promisify } = require('util');

// Promisify the exec function for easier async/await usage
const execAsync = promisify(exec);

// Colorful console output helpers
const log = {
  info: (message) => console.log(chalk.blue(`[INFO] ${message}`)),
  success: (message) => console.log(chalk.green(`[SUCCESS] ${message}`)),
  warning: (message) => console.log(chalk.yellow(`[WARNING] ${message}`)),
  error: (message) => console.log(chalk.red(`[ERROR] ${message}`)),
  title: (message) => console.log(chalk.magenta.bold(`\n--- ${message} ---`))
};

/**
 * Load and parse package.json
 * @param {string} packagePath - Path to package.json file
 * @returns {Object} Parsed package.json content
 */
function loadPackageJson(packagePath) {
  try {
    const packageData = fs.readFileSync(packagePath, 'utf8');
    return JSON.parse(packageData);
  } catch (err) {
    log.error(`Failed to load package.json: ${err.message}`);
    process.exit(1);
  }
}

/**
 * Execute an NPM script programmatically
 * @param {string} scriptName - The name of the script to run
 * @returns {Promise<string>} The command output
 */
async function runNpmScript(scriptName) {
  try {
    log.info(`Running npm script: ${scriptName}`);
    const { stdout, stderr } = await execAsync(`npm run ${scriptName}`);
    
    if (stderr && !stderr.includes('npm')) {
      log.warning(`Script produced warnings/errors: ${stderr}`);
    }
    
    return stdout;
  } catch (err) {
    log.error(`Failed to run script ${scriptName}: ${err.message}`);
    throw err;
  }
}

/**
 * Check if Node.js version meets package.json engines requirement
 * @param {Object} packageJson - The package.json content
 * @returns {boolean} Whether the version requirement is met
 */
function checkNodeVersion(packageJson) {
  if (!packageJson.engines || !packageJson.engines.node) {
    log.warning('No Node.js version requirement specified in package.json');
    return true;
  }
  
  const requiredVersion = packageJson.engines.node;
  const currentVersion = process.version;
  
  log.info(`Required Node.js version: ${requiredVersion}`);
  log.info(`Current Node.js version: ${currentVersion}`);
  
  // This is a simplified version check that just compares the major version
  // A real implementation would use semver package for proper comparison
  const requiredMajor = parseInt(requiredVersion.replace(/[^0-9]/g, ''), 10);
  const currentMajor = parseInt(currentVersion.replace(/[^0-9]/g, ''), 10);
  
  return currentMajor >= requiredMajor;
}

/**
 * List all available npm scripts in the package.json
 * @param {Object} packageJson - The package.json content
 */
function listAvailableScripts(packageJson) {
  if (!packageJson.scripts || Object.keys(packageJson.scripts).length === 0) {
    log.warning('No scripts defined in package.json');
    return;
  }
  
  log.info('Available npm scripts:');
  
  Object.entries(packageJson.scripts).forEach(([name, command]) => {
    console.log(`  ${chalk.cyan(name)}: ${command}`);
  });
}

/**
 * List project dependencies
 * @param {Object} packageJson - The package.json content
 */
function listDependencies(packageJson) {
  log.title('Dependencies');
  
  if (!packageJson.dependencies || Object.keys(packageJson.dependencies).length === 0) {
    log.warning('No dependencies defined in package.json');
  } else {
    log.info('Production dependencies:');
    Object.entries(packageJson.dependencies).forEach(([name, version]) => {
      console.log(`  ${chalk.cyan(name)}: ${version}`);
    });
  }
  
  if (!packageJson.devDependencies || Object.keys(packageJson.devDependencies).length === 0) {
    log.warning('No dev dependencies defined in package.json');
  } else {
    log.info('\nDevelopment dependencies:');
    Object.entries(packageJson.devDependencies).forEach(([name, version]) => {
      console.log(`  ${chalk.yellow(name)}: ${version}`);
    });
  }
}

/**
 * Create a shell script that could be used in an npm script
 * @param {string} scriptPath - Path to save the script
 * @param {string} scriptContent - Content of the script
 */
function createScript(scriptPath, scriptContent) {
  try {
    fs.writeFileSync(scriptPath, scriptContent, { mode: 0o755 }); // Make executable on Unix
    log.success(`Script created at: ${scriptPath}`);
  } catch (err) {
    log.error(`Failed to create script: ${err.message}`);
  }
}

/**
 * Demonstrate how to create and use a custom build script
 * @param {string} outputDir - Directory to output the build script
 */
function createBuildScript(outputDir) {
  const isWindows = process.platform === 'win32';
  const scriptExt = isWindows ? '.bat' : '.sh';
  const scriptPath = path.join(outputDir, `build${scriptExt}`);
  
  let scriptContent;
  
  if (isWindows) {
    scriptContent = `@echo off
echo Building project...
echo Creating directories...
mkdir dist 2>nul
mkdir dist\\js 2>nul
mkdir dist\\css 2>nul

echo Copying files...
copy src\\index.html dist\\index.html
copy src\\js\\*.js dist\\js\\
copy src\\css\\*.css dist\\css\\

echo Build completed!
`;
  } else {
    scriptContent = `#!/bin/bash
echo "Building project..."
echo "Creating directories..."
mkdir -p dist/js dist/css

echo "Copying files..."
cp src/index.html dist/index.html
cp src/js/*.js dist/js/
cp src/css/*.css dist/css/

echo "Build completed!"
`;
  }
  
  createScript(scriptPath, scriptContent);
  
  // Log how to use this script in package.json
  log.info(`To use this script in package.json, add the following to your scripts section:`);
  console.log(chalk.cyan(`  "build": "${scriptPath.replace(/\\/g, '/')}"`));
}

/**
 * Main function to demonstrate script runner functionality
 */
async function main() {
  try {
    log.title('NPM Script Runner Example');
    
    // Find the package.json in the parent directory
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = loadPackageJson(packagePath);
    
    log.info(`Project: ${packageJson.name} v${packageJson.version}`);
    log.info(`Description: ${packageJson.description}`);
    
    // Check if Node version meets requirements
    if (checkNodeVersion(packageJson)) {
      log.success('Node.js version requirement met');
    } else {
      log.warning('Current Node.js version does not meet the requirement in package.json');
    }
    
    // List available scripts
    log.title('NPM Scripts');
    listAvailableScripts(packageJson);
    
    // List dependencies
    listDependencies(packageJson);
    
    // Display environment variables
    log.title('Environment Variables');
    log.info('NPM exposes package.json values as environment variables:');
    console.log(`  npm_package_name: ${process.env.npm_package_name || 'Not available (not running via npm)'}`);
    console.log(`  npm_package_version: ${process.env.npm_package_version || 'Not available (not running via npm)'}`);
    console.log(`  npm_lifecycle_event: ${process.env.npm_lifecycle_event || 'Not available (not running directly)'}`);
    
    // Demonstrate creating a build script that could be used in npm scripts
    log.title('Custom Build Script');
    const tempDir = path.join(__dirname, '..', 'temp');
    // Create the temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    createBuildScript(tempDir);
    
    // Get command line arguments
    const args = process.argv.slice(2);
    if (args.length > 0 && args[0] === '--run-script' && args[1]) {
      // Run a specified npm script if requested
      const scriptName = args[1];
      if (packageJson.scripts && packageJson.scripts[scriptName]) {
        log.title(`Running Script: ${scriptName}`);
        const output = await runNpmScript(scriptName);
        log.success(`Script ${scriptName} completed`);
        console.log(chalk.gray('\nOutput:'));
        console.log(output);
      } else {
        log.error(`Script "${scriptName}" not found in package.json`);
      }
    }
    
    log.success('Script runner example completed');
  } catch (err) {
    log.error(`An error occurred: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

// Run the main function
main(); 