const inquirer = require('inquirer');
const connection = require('./db/connection.js');
require('console.table');

connection.connect(
    (error) => {
        if (error) {
            console.log(error)
        } else {
            menu();
        }
    }
)


const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ])
    .then((answers) => {
        console.log(answers)
        if(answers.choice === 'View All Employees') {
            viewAllEmployees()
        }
        else if(answers.choice === 'Add Employee') {
            addEmployee()
        }
        else if(answers.choice === 'Update Employee Role') {
            updateEmployeeRole()
        }
        else if(answers.choice === 'View All Roles') {
            viewAllRoles()
        }
        else if(answers.choice === 'Add Role') {
            addRole()
        }
        else if(answers.choice === 'View All Departments') {
            viewAllDepartments()
        }
        else if(answers.choice === 'Add Department') {
            addDepartment()
        }
        else {
            process.exit()
        }     
        
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });
}

// ----------------------------------------------------------------------------------------------------------------------
//// FUNCTIONS USING SQL

const viewAllEmployees = () => {
    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.first_name AS managerFirstName, manager.last_name AS managerLastName FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON  role.department_id = department.id LEFT JOIN employee AS manager ON manager.id = employee.manager_id`,
        function(err, results) {
            console.log(err);
            console.table(results);
            menu()
        }
    );
}

// Add employee function
const addEmployee = () => {
    connection.query('select * from role', function(err, res) {
        const roleList = res.map(({ id, title }) => ({
            name: title,
            value: id
        }))

        inquirer.prompt([
            {
                type: input,
                name: firstName,
                message: "What is the employee's first name?"
            },
            {
                type: input,
                name: lastName,
                message: "What is the employee's last name?"
            },
            {
                type: input,
                name: role,
                message: "What is the employee's role?",
                choices: roleList
            }
        ])
        .then((answers) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${answers.firstName}', '${answers.lastName}', ${anaswers.role});`, function(err, res) {
                console.log(err);
                console.log(`Added ${res.firstName} ${res.lastName} to the database`);
                questions();
            })
        })
    })
}

const viewAllRoles = () => {
    connection.query(
            `SELECT * FROM role`,
            function(err, results) {
                console.log(err);
                console.table(results);
                menu()
            }
    );
}


const viewAllDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function(err, results) {
            console.log(err);
            console.table(results);
            menu()
        }
    );
}
