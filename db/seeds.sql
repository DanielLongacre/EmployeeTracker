INSERT INTO department (name) 
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


INSERT INTO role (title, salary, department_id) 
VALUES
    ('Sales Lead', 100000, 1),
    ('Sales Person', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
    ('Stanley', 'Lewis', 3, null),
    ('Daniel', 'Longacre', 4, 1),
    ('Christopher', 'DeHaan', 4, 1),
    ('Yehudah', 'Christan', 6, null);