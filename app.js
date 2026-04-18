var readline = require('readline');
var taskService = require('./taskService');
var utils = require('./utils');

var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question, callback) {
  rl.question(question, function(answer) {
    callback(answer.trim());
  });
}

function askValid(question, validator, callback) {
  ask(question, function(answer) {
    var err = validator(answer);
    if (err) {
      console.log('  ✖  ' + err);
      askValid(question, validator, callback);
    } else {
      callback(answer);
    }
  });
}

function printMenu() {
  console.log('');
  console.log('  ========= TASK MANAGER =========');
  console.log('  1. Add Task');
  console.log('  2. View Tasks');
  console.log('  3. Search Task');
  console.log('  4. Update Task Status');
  console.log('  5. Delete Task');
  console.log('  6. Exit');
  console.log('  ================================');
  console.log('');
}

// 1. Add Task

function addTask() {
  console.log('\n  -- Add New Task --');

  askValid('  Enter Title       : ', utils.validateTitle, function(title) {
    ask('  Enter Description : ', function(description) {
      askValid('  Enter Priority (Low / Medium / High): ', utils.validatePriority, function(priority) {
        askValid('  Enter Due Date (YYYY-MM-DD)         : ', utils.validateDate, function(dueDate) {

          var result = taskService.addTask(title, description, priority, dueDate);
          if (result.success) {
            console.log('\n  ✔  ' + result.message + '\n');
          } else {
            console.log('\n  ✖  ' + result.message + '\n');
          }
          showMenu();

        });
      });
    });
  });
}

// 2. View Tasks

function viewTasks() {
  console.log('\n  -- All Tasks --');
  taskService.viewTasks();
  showMenu();
}

// 3. Search Task

function searchTask() {
  console.log('\n  -- Search Tasks --');
  console.log('  (Leave blank to skip a filter)\n');

  ask('  Search by Title (partial match)               : ', function(titleQuery) {
    ask('  Filter by Status (Pending/In Progress/Completed): ', function(statusRaw) {
      ask('  Filter by Priority (Low / Medium / High)       : ', function(priorityRaw) {

        if (statusRaw !== '') {
          var sErr = utils.validateStatus(statusRaw);
          if (sErr) { console.log('\n  ✖  ' + sErr + '\n'); return showMenu(); }
        }

        if (priorityRaw !== '') {
          var pErr = utils.validatePriority(priorityRaw);
          if (pErr) { console.log('\n  ✖  ' + pErr + '\n'); return showMenu(); }
        }

        if (titleQuery === '' && statusRaw === '' && priorityRaw === '') {
          console.log('\n  Please enter at least one search filter.\n');
          return showMenu();
        }

        var results = taskService.searchTasks(titleQuery, statusRaw, priorityRaw);
        if (results.length === 0) {
          console.log('\n  No matching tasks found.\n');
        } else {
          console.log('\n  Found ' + results.length + ' task(s):');
          utils.printTaskList(results);
        }

        showMenu();
      });
    });
  });
}

//4. Update Task Status 

function updateStatus() {
  console.log('\n  -- Update Task Status --');

  askValid('  Enter Task ID: ', utils.validateId, function(id) {
    var task = taskService.findById(id);
    if (!task) {
      console.log('\n  ✖  No task found with ID ' + id + '.\n');
      return showMenu();
    }

    console.log('\n  Current status: "' + task.status + '"');
    console.log('  Options: Pending | In Progress | Completed');

    askValid('  Enter new Status: ', utils.validateStatus, function(status) {
      var result = taskService.updateStatus(id, status);
      console.log('\n  ✔  ' + result.message + '\n');
      showMenu();
    });
  });
}

//5. Delete Task

function deleteTask() {
  console.log('\n  -- Delete Task --');

  askValid('  Enter Task ID: ', utils.validateId, function(id) {
    var task = taskService.findById(id);
    if (!task) {
      console.log('\n  ✖  No task found with ID ' + id + '.\n');
      return showMenu();
    }

    console.log('\n  Task: [' + task.id + '] "' + task.title + '" | ' +
      task.priority + ' | ' + task.status + ' | Due: ' + task.dueDate);

    ask('  Are you sure? (y/n): ', function(confirm) {
      if (confirm.toLowerCase() !== 'y') {
        console.log('\n  Deletion cancelled.\n');
        return showMenu();
      }
      var result = taskService.deleteTask(id);
      console.log('\n  ✔  ' + result.message + '\n');
      showMenu();
    });
  });
}

// Main menu loop

function showMenu() {
  printMenu();
  ask('  Enter your choice: ', function(choice) {
    if      (choice === '1') addTask();
    else if (choice === '2') viewTasks();
    else if (choice === '3') searchTask();
    else if (choice === '4') updateStatus();
    else if (choice === '5') deleteTask();
    else if (choice === '6') {
      console.log('\n  Goodbye!\n');
      rl.close();
      process.exit(0);
    } else {
      console.log('\n  ✖  Invalid choice. Enter 1 to 6.\n');
      showMenu();
    }
  });
}


taskService.init();
console.log('\n  Welcome to Task Manager!');
showMenu();