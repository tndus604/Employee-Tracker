DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(19,2) NOT NULL,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name) VALUES ("Production");
INSERT INTO department (name) VALUES ("Research and Development");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Human Resource Management");
INSERT INTO department (name) VALUES ("Accounting and Finance");
INSERT INTO department (name) VALUES ("Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Manager", 160000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Executive", 89000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Administrator ", 50000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Intern", 20000, 1);

INSERT INTO role (title, salary, department_id) VALUES ("Director", 89000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Coordinator", 55000, 2);

INSERT INTO role (title, salary, department_id) VALUES ("Assistant Manager", 120000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Administrator", 45000, 3);

INSERT INTO role (title, salary, department_id) VALUES ("HR Manager", 89000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Coordinator", 55000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Intern", 20000, 4);

INSERT INTO role (title, salary, department_id) VALUES ("Accountig Manager", 79000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Accountant", 45000, 5);

INSERT INTO role (title, salary, department_id) VALUES ("Senior Lawyer", 200000, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Lawyer", 140000, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Assistant", 60000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Haley","Jeon",1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Anna","Jeon",2,1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Edmund","Wong",3,1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John","Doe",4,1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James","Lee",5,2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Fil","Joe",6, 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Joe","Mama",7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marcel","Cooke",8,3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Martin","Doe",9,3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Chris","Kim",10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christine","Clementine",11,4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve","Jobs",12,4);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Julie","Park",13);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cheese","Fries",14,5);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Elliot","Song",15);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emma","Watson",16,6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Johnathan","Deboer",17,6);

