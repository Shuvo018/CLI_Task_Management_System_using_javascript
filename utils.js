
function capitlise(str) {
  if (!str) return '';
  var s = str.trim();
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function normaliseStatus(str) {
  if (!str) return '';
  var s = str.trim().toLowerCase();
  if (s === 'in progress') return 'In Progress';
  if (s === 'pending')     return 'Pending';
  if (s === 'completed')   return 'Completed';
  return capitlise(str);
}

// Validation helpers 

function validateTitle(title) {
  if (!title || title.trim() === '') return 'Title cannot be empty.';
  return null;
}

function validatePriority(priority) {
  var p = capitlise(priority);
  if (p !== 'Low' && p !== 'Medium' && p !== 'High') {
    return 'Priority must be Low, Medium, or High.';
  }
  return null;
}

function validateDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'Due date must be YYYY-MM-DD format.';
  if (isNaN(new Date(date).getTime())) return 'Not a real date.';
  return null;
}

function validateStatus(status) {
  var s = normaliseStatus(status);
  if (s !== 'Pending' && s !== 'In Progress' && s !== 'Completed') {
    return 'Status must be: Pending, In Progress, or Completed.';
  }
  return null;
}

function validateId(id) {
  if (!id || id.trim() === '') return 'ID cannot be empty.';
  var n = Number(id);
  if (isNaN(n) || n <= 0 || Math.floor(n) !== n) return 'ID must be a positive number.';
  return null;
}

// Display helpers 

function line(ch, n) {
  var out = '';
  ch = ch || '-';
  n  = n  || 50;
  for (var i = 0; i < n; i++) out += ch;
  console.log(out);
}

function colourPriority(priority) {
  if (priority === 'High')   return '\x1b[31m' + 'HIGH'   + '\x1b[0m';
  if (priority === 'Medium') return '\x1b[33m' + 'MEDIUM' + '\x1b[0m';
  if (priority === 'Low')    return '\x1b[32m' + 'LOW'    + '\x1b[0m';
  return priority.toUpperCase();
}

function padEnd(str, len) {
  str = String(str);
  while (str.length < len) str += ' ';
  return str;
}

function padStart(str, len) {
  str = String(str);
  while (str.length < len) str = ' ' + str;
  return str;
}

function printTask(index, task) {
  console.log('  ' + padStart(index, 2) + '. [' + task.id + '] ' + task.title +
    ' | ' + padEnd(task.status, 11) + ' | Due: ' + task.dueDate);
  if (task.description) {
    console.log('       Description: ' + task.description);
  }
}

function printTaskList(list) {
  if (list.length === 0) {
    console.log('\n  No tasks found.\n');
    return;
  }
  var groups = ['High', 'Medium', 'Low'];
  var index = 1;
  console.log('');
  for (var g = 0; g < groups.length; g++) {
    var priority = groups[g];
    var group = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].priority === priority) group.push(list[i]);
    }
    if (group.length === 0) continue;
    console.log('  ' + colourPriority(priority) + ' PRIORITY');
    line('-', 50);
    for (var j = 0; j < group.length; j++) {
      printTask(index++, group[j]);
    }
    console.log('');
  }
}

module.exports = {
  capitlise,
  normaliseStatus,
  validateTitle,
  validatePriority,
  validateDate,
  validateStatus,
  validateId,
  line,
  colourPriority,
  padEnd,
  padStart,
  printTask,
  printTaskList
};