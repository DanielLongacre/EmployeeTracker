const db = `mysql://root:root@localhost:3306/employeetracker`;

class DB {
    constructor(db) {
        this.connect = db;
    }

    findAllEmployees() {
        return this.connection.query(
            "SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary FROM employee e LEFT JOIN role r on r.id = e.role_id LEFT JOIN department d on d.id = r.department_id"
        );
    }

    findAllDepartments() {
        return this.connection.query("SELECT * FROM department;");
    }

    findAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;"
          );
    }

    addNewDepartment() {
        return this.connection.query(
            "INSERT INTO department (name) VALUES (?)",
            newDept,
            (err, result) => {
              if (err) throw error;
              else {
                console.log(`Added new department ${newDept}`);
                menu();
              }
            }
          );
    }

    addNewRole(roleInfo) {
        return this.connection.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          roleInfo,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Added new role ${roleInfo[0]}`);
              menu();
            }
          }
        );
      }

      updateRole(updateInfo) {
        return this.connection.query(
          "UPDATE employee SET role_id = (?) WHERE first_name = ? AND last_name = ?;",
          updateInfo,
          (err, result) => {
            if (err) throw err;
            else {
              console.log(
                `Updated ${updateInfo[1]} ${updateInfo[2]}'s role id to ${updateInfo[0]}`
              );
              menu();
            }
          }
        );
      }

      addNewEmployee(employeeInfo) {
        return this.connection.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          employeeInfo,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Added new employee ${employeeInfo[0]} ${employeeInfo[1]}`
              );
              menu();
            }
          }
        );
      }

      employeeNames() {
        return this.connection.query(
          "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name FROM employee;"
        );
      }

      departmentNames() {
        return this.connection.query(
          "SELECT department.name AS departments FROM department;"
        );
      }


      roleNames() {
        return this.connection.query("SELECT role.title AS roles FROM role;");
      }

      deleteEmployee(name) {
        return this.connection.query(
          "DELETE FROM employee WHERE first_name = ? AND last_name = ?;",
          name,
          (err, result) => {
            if (err) throw err;
            else {
              console.log(`Deleted ${name[0]} ${name[1]}`);
              menu();
            }
          }
        );
      }

      deleteDepartment(dept) {
        return this.connection.query(
          "DELETE FROM department WHERE name = ?;",
          dept,
          (err, result) => {
            if (err) throw err;
            else {
              console.log(`Deleted ${dept} department`);
              menu();
            }
          }
        );
      }

      deleteRoleDb(role) {
        return this.connection.query(
          "DELETE FROM role WHERE title = ?;",
          role,
          (err, result) => {
            if (err) throw err;
            else {
              console.log(`Deleted ${role} role`);
              menu();
            }
          }
        );
      }

}

module.exports = new DB(connection);