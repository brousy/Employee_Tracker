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
  
  
  
  // Function to update an employee's role
  

// TODO function to view all roles
// TODO add role
// TODO view all employees
// TODO add an employee
// TODO update an employee role  ALL OF THESE ARE FUNCTIONS
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
