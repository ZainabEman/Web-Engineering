/**
 * Advanced Package Usage Example
 * Demonstrates advanced features of npm packages and Node.js.
 */

// Import required packages
const _ = require('lodash');
const moment = require('moment');
const chalk = require('chalk');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

// Create colorful logging
const logger = {
  info: (msg) => console.log(chalk.blue(`[INFO] ${msg}`)),
  success: (msg) => console.log(chalk.green(`[SUCCESS] ${msg}`)),
  warning: (msg) => console.log(chalk.yellow(`[WARNING] ${msg}`)),
  error: (msg) => console.log(chalk.red(`[ERROR] ${msg}`)),
  debug: (msg) => console.log(chalk.gray(`[DEBUG] ${msg}`))
};

// Promisify some callback-based functions
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);
const accessAsync = promisify(fs.access);

/**
 * Generates a UUID
 * Utility function to demonstrate using lodash for advanced operations
 */
function generateUUID() {
  return _.times(4, () => _.random(0, 0xffff).toString(16).padStart(4, '0')).join('-');
}

/**
 * A more complex data structure for demonstration
 */
class DataStore extends EventEmitter {
  constructor() {
    super();
    this.data = new Map();
    logger.debug('DataStore initialized');
  }

  /**
   * Set a key-value pair in the store
   * @param {string} key - The key
   * @param {any} value - The value
   * @param {number} ttl - Time to live in milliseconds (optional)
   * @returns {boolean} Success indicator
   */
  set(key, value, ttl = null) {
    // Generate a timestamp for this record
    const timestamp = moment().valueOf();
    
    // Store the data with metadata
    this.data.set(key, {
      value,
      timestamp,
      ttl,
      expiresAt: ttl ? timestamp + ttl : null
    });
    
    logger.debug(`Set data for key: ${key}`);
    this.emit('set', key, value);
    
    // Set up expiration if TTL is provided
    if (ttl) {
      setTimeout(() => {
        this.delete(key);
      }, ttl);
    }
    
    return true;
  }

  /**
   * Get a value from the store
   * @param {string} key - The key
   * @returns {any} The stored value or undefined
   */
  get(key) {
    const item = this.data.get(key);
    
    if (!item) {
      logger.debug(`No data found for key: ${key}`);
      return undefined;
    }
    
    // Check if the item has expired
    if (item.expiresAt && moment().valueOf() > item.expiresAt) {
      logger.debug(`Data for key ${key} has expired`);
      this.delete(key);
      return undefined;
    }
    
    logger.debug(`Retrieved data for key: ${key}`);
    this.emit('get', key, item.value);
    return item.value;
  }

  /**
   * Delete a key from the store
   * @param {string} key - The key
   * @returns {boolean} Success indicator
   */
  delete(key) {
    const deleted = this.data.delete(key);
    if (deleted) {
      logger.debug(`Deleted data for key: ${key}`);
      this.emit('delete', key);
    }
    return deleted;
  }

  /**
   * Get all keys in the store
   * @returns {Array} Array of keys
   */
  keys() {
    return Array.from(this.data.keys());
  }

  /**
   * Save the data store to a file
   * @param {string} filePath - The path to save to
   * @returns {Promise<boolean>} Success indicator
   */
  async save(filePath) {
    try {
      // Create the directory if it doesn't exist
      const dir = path.dirname(filePath);
      try {
        await accessAsync(dir);
      } catch (err) {
        await mkdirAsync(dir, { recursive: true });
      }
      
      // Filter out expired items
      const currentTime = moment().valueOf();
      const persistData = Array.from(this.data.entries())
        .filter(([_, item]) => !item.expiresAt || item.expiresAt > currentTime)
        .reduce((acc, [key, item]) => {
          acc[key] = item;
          return acc;
        }, {});
      
      // Save to file
      await writeFileAsync(
        filePath,
        JSON.stringify(persistData, null, 2),
        'utf8'
      );
      
      logger.debug(`Saved data store to ${filePath}`);
      this.emit('save', filePath);
      return true;
    } catch (err) {
      logger.error(`Error saving data store: ${err.message}`);
      this.emit('error', err);
      return false;
    }
  }

  /**
   * Load the data store from a file
   * @param {string} filePath - The path to load from
   * @returns {Promise<boolean>} Success indicator
   */
  async load(filePath) {
    try {
      const data = await readFileAsync(filePath, 'utf8');
      const loadedData = JSON.parse(data);
      
      // Clear current data
      this.data.clear();
      
      // Load data and filter expired items
      const currentTime = moment().valueOf();
      for (const [key, item] of Object.entries(loadedData)) {
        if (!item.expiresAt || item.expiresAt > currentTime) {
          this.data.set(key, item);
          
          // Re-establish expiration timers for TTL items
          if (item.expiresAt) {
            const remainingTime = item.expiresAt - currentTime;
            if (remainingTime > 0) {
              setTimeout(() => {
                this.delete(key);
              }, remainingTime);
            }
          }
        }
      }
      
      logger.debug(`Loaded data store from ${filePath}`);
      this.emit('load', filePath);
      return true;
    } catch (err) {
      if (err.code === 'ENOENT') {
        logger.warning(`No data store file found at ${filePath}`);
        return false;
      }
      
      logger.error(`Error loading data store: ${err.message}`);
      this.emit('error', err);
      return false;
    }
  }
}

/**
 * A Task model that demonstrates using moment and lodash
 */
class Task {
  constructor(title, description = '', dueDate = null, tags = []) {
    this.id = generateUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate ? moment(dueDate) : null;
    this.tags = _.uniq(tags);
    this.completed = false;
    this.createdAt = moment();
    this.updatedAt = moment();
  }
  
  /**
   * Check if the task is overdue
   * @returns {boolean} Whether the task is overdue
   */
  isOverdue() {
    return this.dueDate && !this.completed && moment().isAfter(this.dueDate);
  }
  
  /**
   * Get the formatted due date
   * @returns {string} Formatted due date or 'No due date'
   */
  getFormattedDueDate() {
    return this.dueDate ? this.dueDate.format('YYYY-MM-DD HH:mm') : 'No due date';
  }
  
  /**
   * Mark the task as completed
   */
  complete() {
    this.completed = true;
    this.updatedAt = moment();
  }
  
  /**
   * Mark the task as incomplete
   */
  reopen() {
    this.completed = false;
    this.updatedAt = moment();
  }
  
  /**
   * Add tags to the task
   * @param {Array} newTags - Tags to add
   */
  addTags(newTags) {
    this.tags = _.uniq([...this.tags, ...newTags]);
    this.updatedAt = moment();
  }
  
  /**
   * Remove tags from the task
   * @param {Array} tagsToRemove - Tags to remove
   */
  removeTags(tagsToRemove) {
    this.tags = this.tags.filter(tag => !tagsToRemove.includes(tag));
    this.updatedAt = moment();
  }
  
  /**
   * Get a formatted summary of the task
   * @returns {string} Task summary
   */
  getSummary() {
    const status = this.completed ? 'Completed' : this.isOverdue() ? 'Overdue' : 'Pending';
    const dueInfo = this.dueDate ? `Due: ${this.getFormattedDueDate()}` : 'No due date';
    
    return `${this.title} [${status}] - ${dueInfo} - Tags: ${this.tags.join(', ') || 'none'}`;
  }
  
  /**
   * Convert the task to a JSON-friendly object
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate ? this.dueDate.toISOString() : null,
      tags: this.tags,
      completed: this.completed,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
  
  /**
   * Create a Task from a plain object
   * @param {Object} data - Data to create the task from
   * @returns {Task} A new Task instance
   */
  static fromJSON(data) {
    const task = new Task(
      data.title,
      data.description,
      data.dueDate,
      data.tags
    );
    
    task.id = data.id;
    task.completed = data.completed;
    task.createdAt = moment(data.createdAt);
    task.updatedAt = moment(data.updatedAt);
    
    return task;
  }
}

/**
 * TaskManager class to demonstrate complex event handling
 */
class TaskManager extends EventEmitter {
  constructor() {
    super();
    this.store = new DataStore();
    this.setupEventHandlers();
  }
  
  /**
   * Set up event handlers for the data store
   */
  setupEventHandlers() {
    this.store.on('set', (key) => {
      logger.debug(`DataStore event: set ${key}`);
    });
    
    this.store.on('delete', (key) => {
      logger.debug(`DataStore event: delete ${key}`);
      this.emit('taskDeleted', key);
    });
    
    this.store.on('error', (err) => {
      logger.error(`DataStore error: ${err.message}`);
      this.emit('error', err);
    });
  }
  
  /**
   * Add a new task
   * @param {string} title - Task title
   * @param {string} description - Task description
   * @param {string|Date} dueDate - Task due date
   * @param {Array} tags - Task tags
   * @returns {Task} The created task
   */
  addTask(title, description = '', dueDate = null, tags = []) {
    const task = new Task(title, description, dueDate, tags);
    this.store.set(task.id, task);
    this.emit('taskAdded', task);
    return task;
  }
  
  /**
   * Get a task by ID
   * @param {string} id - Task ID
   * @returns {Task|undefined} The task or undefined
   */
  getTask(id) {
    const taskData = this.store.get(id);
    if (!taskData) return undefined;
    
    // Convert plain object back to Task instance if needed
    return taskData instanceof Task ? taskData : Task.fromJSON(taskData);
  }
  
  /**
   * Update a task
   * @param {string} id - Task ID
   * @param {Object} updates - Updates to apply
   * @returns {Task|undefined} The updated task or undefined
   */
  updateTask(id, updates) {
    const task = this.getTask(id);
    if (!task) return undefined;
    
    // Apply updates
    if (updates.title !== undefined) task.title = updates.title;
    if (updates.description !== undefined) task.description = updates.description;
    if (updates.dueDate !== undefined) task.dueDate = updates.dueDate ? moment(updates.dueDate) : null;
    if (updates.tags !== undefined) task.tags = _.uniq(updates.tags);
    if (updates.completed !== undefined) {
      if (updates.completed && !task.completed) {
        task.complete();
      } else if (!updates.completed && task.completed) {
        task.reopen();
      }
    }
    
    task.updatedAt = moment();
    this.store.set(id, task);
    this.emit('taskUpdated', task);
    return task;
  }
  
  /**
   * Delete a task
   * @param {string} id - Task ID
   * @returns {boolean} Success indicator
   */
  deleteTask(id) {
    const deleted = this.store.delete(id);
    if (deleted) {
      this.emit('taskDeleted', id);
    }
    return deleted;
  }
  
  /**
   * Get all tasks
   * @returns {Array} Array of tasks
   */
  getAllTasks() {
    return this.store.keys().map(id => this.getTask(id));
  }
  
  /**
   * Get tasks filtered by status
   * @param {boolean} completed - Whether to get completed tasks
   * @returns {Array} Filtered tasks
   */
  getTasksByStatus(completed) {
    return this.getAllTasks().filter(task => task.completed === completed);
  }
  
  /**
   * Get tasks filtered by tag
   * @param {string} tag - Tag to filter by
   * @returns {Array} Filtered tasks
   */
  getTasksByTag(tag) {
    return this.getAllTasks().filter(task => task.tags.includes(tag));
  }
  
  /**
   * Get overdue tasks
   * @returns {Array} Overdue tasks
   */
  getOverdueTasks() {
    return this.getAllTasks().filter(task => task.isOverdue());
  }
  
  /**
   * Save tasks to a file
   * @param {string} filePath - Path to save to
   * @returns {Promise<boolean>} Success indicator
   */
  async saveTasks(filePath) {
    return this.store.save(filePath);
  }
  
  /**
   * Load tasks from a file
   * @param {string} filePath - Path to load from
   * @returns {Promise<boolean>} Success indicator
   */
  async loadTasks(filePath) {
    return this.store.load(filePath);
  }
}

/**
 * Main function that demonstrates the usage of these advanced features
 */
async function runDemo() {
  logger.info('Starting advanced package usage demonstration');
  logger.info(`Current time: ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
  
  // Create a task manager
  const taskManager = new TaskManager();
  
  // Listen for events
  taskManager.on('taskAdded', (task) => {
    logger.success(`Task added: ${task.title}`);
  });
  
  taskManager.on('taskUpdated', (task) => {
    logger.info(`Task updated: ${task.title}`);
  });
  
  taskManager.on('taskDeleted', (id) => {
    logger.warning(`Task deleted: ${id}`);
  });
  
  // Add some tasks
  logger.info('\nAdding tasks:');
  taskManager.addTask(
    'Learn Node.js modules', 
    'Study CommonJS and ES modules',
    moment().add(2, 'days'),
    ['study', 'node']
  );
  
  taskManager.addTask(
    'Complete project',
    'Finish the Node.js demo project',
    moment().add(1, 'week'),
    ['project', 'node']
  );
  
  const overdueTask = taskManager.addTask(
    'Overdue task',
    'This task is already overdue',
    moment().subtract(2, 'days'),
    ['urgent']
  );
  
  // Display all tasks
  logger.info('\nAll tasks:');
  taskManager.getAllTasks().forEach(task => {
    console.log(chalk.cyan(`- ${task.getSummary()}`));
  });
  
  // Update a task
  logger.info('\nUpdating a task:');
  taskManager.updateTask(overdueTask.id, {
    title: 'Completed overdue task',
    completed: true
  });
  
  console.log(chalk.cyan(`- ${taskManager.getTask(overdueTask.id).getSummary()}`));
  
  // Filter tasks
  logger.info('\nFiltering tasks:');
  
  const nodeTaggedTasks = taskManager.getTasksByTag('node');
  logger.info('Tasks with "node" tag:');
  nodeTaggedTasks.forEach(task => {
    console.log(chalk.cyan(`- ${task.getSummary()}`));
  });
  
  const pendingTasks = taskManager.getTasksByStatus(false);
  logger.info('Pending tasks:');
  pendingTasks.forEach(task => {
    console.log(chalk.cyan(`- ${task.getSummary()}`));
  });
  
  // Save tasks to a file
  logger.info('\nSaving tasks to a file:');
  const saveDir = path.join(__dirname, '..', 'temp');
  const saveFile = path.join(saveDir, 'tasks.json');
  
  const saved = await taskManager.saveTasks(saveFile);
  if (saved) {
    logger.success(`Tasks saved to ${saveFile}`);
  }
  
  // Delete a task
  logger.info('\nDeleting a task:');
  const taskToDelete = pendingTasks[0];
  if (taskToDelete) {
    taskManager.deleteTask(taskToDelete.id);
    logger.info(`Deleted task: ${taskToDelete.title}`);
  }
  
  // Create a new task manager and load tasks
  logger.info('\nLoading tasks from file:');
  const newTaskManager = new TaskManager();
  const loaded = await newTaskManager.loadTasks(saveFile);
  
  if (loaded) {
    logger.success('Tasks loaded successfully');
    logger.info('Loaded tasks:');
    newTaskManager.getAllTasks().forEach(task => {
      console.log(chalk.cyan(`- ${task.getSummary()}`));
    });
  }
  
  // Demonstrate advanced lodash features
  logger.info('\nAdvanced lodash features:');
  
  const tasks = newTaskManager.getAllTasks();
  
  // Group tasks by tags
  const tasksByTag = _.groupBy(tasks, task => {
    return task.tags.length > 0 ? task.tags[0] : 'untagged';
  });
  
  logger.info('Tasks grouped by primary tag:');
  for (const [tag, tagTasks] of Object.entries(tasksByTag)) {
    console.log(chalk.yellow(`Tag: ${tag} (${tagTasks.length} tasks)`));
    tagTasks.forEach(task => {
      console.log(chalk.cyan(`  - ${task.title}`));
    });
  }
  
  // Sort tasks by due date
  const sortedTasks = _.sortBy(tasks, task => task.dueDate ? task.dueDate.valueOf() : Infinity);
  
  logger.info('Tasks sorted by due date:');
  sortedTasks.forEach(task => {
    console.log(chalk.cyan(`- ${task.title} (${task.getFormattedDueDate()})`));
  });
  
  logger.info('\nDemonstration completed!');
}

// Run the demo
runDemo().catch(err => {
  logger.error(`Demo failed: ${err.message}`);
  console.error(err);
}); 