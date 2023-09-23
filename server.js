const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

//Connect to the database
// const db = `mysql://root:root@localhost:3306/employeetracker`;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employeetracker',
    password: 'root'
});

connection.connect(
    (error) => {
        if(error) {
            console.log(error)
        } else {
            menu();
        }
    }
)

//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
            console.log()
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
        
    });
}

const viewAllEmployees = () => {
    connection.query(
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary FROM employee e LEFT JOIN role r on r.id = e.role_id LEFT JOIN department d on d.id = r.department_id`,
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


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

// menu();