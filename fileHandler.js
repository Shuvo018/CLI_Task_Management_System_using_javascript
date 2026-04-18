var fs = require('fs');

var FILE = 'tasks.json';

function loadTasks() {
  try {
    if (!fs.existsSync(FILE)) {
      return [];
    }
    var raw = fs.readFileSync(FILE, 'utf-8').trim();
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.log('Warning: Could not load tasks. Starting fresh.');
    return [];
  }
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (e) {
    console.log('Error: Could not save tasks.');
  }
}

module.exports = { loadTasks, saveTasks };