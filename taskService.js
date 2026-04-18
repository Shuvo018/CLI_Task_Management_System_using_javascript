var fileHandler = require('./fileHandler');
var utils = require('./utils');

var tasks = [];
var nextId = 101;


function init() {
  tasks = fileHandler.loadTasks();
  if (tasks.length > 0) {
    var maxId = 0;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id > maxId) maxId = tasks[i].id;
    }
    nextId = maxId + 1;
  }
}

// Add Task 

function addTask(title, description, priority, dueDate) {
  // Duplicate check
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].title.toLowerCase() === title.trim().toLowerCase() &&
        tasks[i].dueDate === dueDate.trim()) {
      return { success: false, message: 'Error: Task with same title and due date already exists.' };
    }
  }

  var task = {
    id:          nextId++,
    title:       title.trim(),
    description: description.trim(),
    priority:    utils.capitlise(priority),
    dueDate:     dueDate.trim(),
    status:      'Pending',
    createdAt:   new Date().toISOString()
  };

  tasks.push(task);
  fileHandler.saveTasks(tasks);
  return { success: true, message: 'Task added successfully! (ID: ' + task.id + ')' };
}

// View Tasks

function viewTasks() {
  utils.printTaskList(tasks);
}

// Find task by ID 

function findById(id) {
  var num = Number(id);
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === num) return tasks[i];
  }
  return null;
}

// Update Status

function updateStatus(id, status) {
  var task = findById(id);
  if (!task) return { success: false, message: 'No task found with ID ' + id + '.' };

  task.status = utils.normaliseStatus(status);
  fileHandler.saveTasks(tasks);
  return { success: true, message: 'Task [' + id + '] status updated to "' + task.status + '".' };
}

// Delete Task

function deleteTask(id) {
  var num = Number(id);
  var newTasks = [];
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== num) newTasks.push(tasks[i]);
  }
  if (newTasks.length === tasks.length) {
    return { success: false, message: 'No task found with ID ' + id + '.' };
  }
  tasks = newTasks;
  fileHandler.saveTasks(tasks);
  return { success: true, message: 'Task deleted successfully.' };
}

// Search Tasks 

function searchTasks(titleQuery, statusRaw, priorityRaw) {
  var results = [];
  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i];
    var matchTitle    = titleQuery   === '' || t.title.toLowerCase().indexOf(titleQuery.toLowerCase()) !== -1;
    var matchStatus   = statusRaw    === '' || t.status.toLowerCase()   === utils.normaliseStatus(statusRaw).toLowerCase();
    var matchPriority = priorityRaw  === '' || t.priority.toLowerCase() === utils.capitlise(priorityRaw).toLowerCase();

    if (matchTitle && matchStatus && matchPriority) {
      results.push(t);
    }
  }
  return results;
}

module.exports = { init, addTask, viewTasks, findById, updateStatus, deleteTask, searchTasks };