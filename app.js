var fs = require('fs');
var readline = require('readline');

var FILE = 'tasks.json';


// Readline setup 
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
      console.log( err);
      askValid(question, validator, callback);
    } else {
      callback(answer);
    }
  });
}


// Add Task 
function addTask() {
  console.log('\n  -- Add New Task --');

  askValid('  Enter Title       : ', validateTitle, function(title) {
    ask('  Enter Description : ', function(description) {
      askValid('  Enter Priority (Low / Medium / High): ', validatePriority, function(priority) {
        askValid('  Enter Due Date (YYYY-MM-DD)         : ', validateDate, function(dueDate) {

          // Duplicate check
          for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].title.toLowerCase() === title.trim().toLowerCase() &&
                tasks[i].dueDate === dueDate.trim()) {
              console.log('\n  ✖  Error: Task with same title and due date already exists.\n');
              return showMenu();
            }
          }

          var task = {
            id:          nextId++,
            title:       title.trim(),
            description: description.trim(),
            priority:    capitlise(priority),
            dueDate:     dueDate.trim(),
            status:      'Pending',
            createdAt:   new Date().toISOString()
          };

          tasks.push(task);
          saveTasks();
          console.log('\n  ✔  Task added successfully! (ID: ' + task.id + ')\n');
          showMenu();
        });
      });
    });
  });
}


// Menu 
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

function showMenu() {
  printMenu();
  ask('  Enter your choice: ', function(choice) {
    if (choice === '1') addTask();
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
// Start
loadTasks();
showMenu();