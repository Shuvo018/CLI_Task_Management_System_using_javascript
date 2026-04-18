# Show menu

<pre>
  ========= TASK MANAGER =========
  1. Add Task
  2. View Tasks
  3. Search Task
  4. Update Task Status
  5. Delete Task
  6. Exit
  ================================
</pre>

# 1. Add Task
<pre>
    Enter your choice: 1

  -- Add New Task --
  Enter Title       : c
  Enter Description : test c
  Enter Priority (Low / Medium / High): High
  Enter Due Date (YYYY-MM-DD)         : 2026-04-18

    Task added successfully! (ID: 105)
</pre>

# 2. View Tasks

<pre>
    Enter your choice: 2

  -- All Tasks --

  MEDIUM PRIORITY
--------------------------------------------------
   2. [104] b | Pending     | Due: 2026-09-22
       Description: test b

  LOW PRIORITY
--------------------------------------------------
   3. [101] a | Pending     | Due: 2026-09-12
       Description: test a
   4. [102] a | Pending     | Due: 2020-01-21
       Description: a
   5. [103] a | Pending     | Due: 2020-03-12
       Description: test a
</pre>
# 3. Search Task
<pre>
    Enter your choice: 3

  -- Search Tasks --
  (Leave blank to skip a filter)

  Search by Title (partial match)               : 
  Filter by Status (Pending/In Progress/Completed): 
  Filter by Priority (Low / Medium / High)       : Medium

  Found 1 task(s):

  MEDIUM PRIORITY
--------------------------------------------------
   1. [104] b | Pending     | Due: 2026-09-22
       Description: test b
</pre>

# 4. Update Task
<pre>
    Enter your choice: 4

  -- Update Task Status --
  Enter Task ID: 104

  Current status: "Pending"
  Options: Pending | In Progress | Completed
  Enter new Status: In Progress

    Task [104] status updated to "In Progress".
</pre>

# 5. Delete Task
<pre>
   Enter your choice: 5

  -- Delete Task --
  Enter Task ID: 103

  Task: [103] "a" | Low | Pending | Due: 2020-03-12
  Are you sure? (y/n): y

  Task deleted successfully.
</pre>
