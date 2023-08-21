const mysql = require('mysql2');
const inquirer = require('inquirer');
// ask for explanation about cTABLE 
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL Username
      user: 'root',
      // TODO: Add MySQL Password
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

//   setting up function to prompt user with options use logo challenge

function promptUser() {
    inquirer 
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Please choose from the following:',
            choices: [
            'View All Departments',
          'Add Department',
          'View All Roles',
          'Add Role',
          'View All Employees',
          'Add an Employee',
          'Update Employee Role',
          'Quit'
            ]
        }
    ])
    .then((answers) => {
        switch(answers.action){
            case 'View All Departments':
            viewAllDepartments();
            break;
                case 'Add Department':
          addADepartment();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addARole();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add an Employee':
          addAnEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
          default:
            db.end();
        }
    })
}

// TODO function to view all departments
function viewAllDepartments() {
    db.query('SELECT * from department', (err, result) => {
        if (err) throw err;
        console.table(result);
        promptUser();
    }
    );
}

// Function to add a department
function addADepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'department_name',
          message: 'What is the new Department name?',
        }])
      .then(data => {
        db.query('INSERT INTO department SET ?', { name: data.department_name });
        console.log(`Department name ${data.department_name} added successfully.`);
        promptUser();
      });
  }
  
// TODO function to view all roles
function viewAllRoles() {
    db.query('SELECT * from role', (err, result) => {
        if (err) throw err;
        console.table(result);
        promptUser();
    })
};

// TODO add role 
// query department table to get existing IDs
function addARole() {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the role title?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary?',
            },
            {
                type: 'list',
                name: 'department_name',
                message: 'What department is the role in?',
                choices: result.map(department => department.name)

            }])

// find department ID that matches answer by department_name
            .then(data => {
                let department = result.find(department => department.name === data.department_name)
                db.query('INSERT INTO role SET ?', {
                    title: data.title, salary: data.salary, department_id: data.department_id})
                })
                promptUser();
            })
    };
// TODO view all employees
function viewAllEmployees() {
    db.query('SELECT * from employee', (err, result) => {
        if (err) throw err;
        console.table(result);
        promptUser();
    })
};

// TODO add an employee
function addAnEmployee () {
    db.query('SELECT * FROM role', (err, result) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'first_name',
            message: 'What is their FIRST name?',
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'What is their LAST name?',
          },
          // ROLE ID
          {
            type: 'list',
            name: 'role_id',
            message: 'What is the role title?',
            choices: result.map(role => role.title)
          },
          // MGR ID
          {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the Manager ID?',
            choices: [1,2,3]
          } ])
    
        // Find mgr ID that matches answer by mgr name
        .then(data => {
          let role = result.find(role => role.title === data.role_id)
          db.query('INSERT INTO employee SET ?', {
            first_name: data.first_name, 
            last_name: data.last_name,
            role_id: role.id,
            manager_id: data.manager_id
          })
         // TODO: add a .then to show manager NAME when adding a new employee & background would read as manager #
    
          promptUser();
        })
    })
    };
// TODO update employee role
function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee you want to update:'
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the ID of the new role:'
        }
      ])
      .then((answers) => {
        const { employeeId, roleId } = answers;
        db.query(
          `UPDATE employee SET role_id = ? WHERE id = ?`,
          [roleId, employeeId],
          (err, result) => {
            if (err) throw err;
            console.log(`Employee ${employeeId} role updated successfully.`);
            promptUser();
          }
        );
      });
  }

  promptUser();
