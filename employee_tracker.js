var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "hyomi1338",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if(err) throw err;
    mainApp();
});

function mainApp() {
    inquirer.prompt(
    {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: 
        [
            new inquirer.Separator(),
            "Add departments",
            "Add roles",
            "Add employees",
            new inquirer.Separator(),
            "View departments",
            "View roles",
            "View employees",
            new inquirer.Separator(),
            "Update employee roles",
            "Update employee manager",
            new inquirer.Separator(),
            "Delete departments",
            "Delete roles",
            "Delete employees",
            new inquirer.Separator(),
            "Exit"
        ]
    }).then(function(answer) {
        switch (answer.action) {
        case "Add departments":
            addDepartment();
            break;

        case "Add roles":
            addRole();
            break;
        
        case "Add employees":
            addEmployee();
            break;

        case "View departments":
            viewDepartment();
            break;

        case "View roles":
            viewRole();
            break;

        case "View employees":
            viewEmployee();
            break;

        case "Update employee roles":
            updateEmployee();
            break;

        case "Update employee manager":
            updateManager();
            break;
        
        case "Delete departments":
            deleteDepartment();
            break;

        case "Delete roles":
            deleteRole();
            break;
        
        case "Delete employees":
            deleteEmployee();
            break;

        case "Exit":
            connection.end();
            break;
        }
    })
}

function addDepartment() {
    inquirer.prompt(
    {
        name: "departmentName",
        type: "input",
        message: "What is the name of the deparment?"
    }
    ).then (function(answer){
        connection.query("INSERT INTO department SET ?",
        { 
            name: answer.departmentName
        }, 
        function(err) {
            if(err) throw err;
            console.log("The deparment " + answer.departmentName + " was created!");
            mainApp();
        })
    });
};

function addRole() {
    inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: "What is the title of the job?"
    },
    {
        name: "salary",
        type: "input",
        message: "How much salary does he/she get?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: "departmentID",
        type: "input",
        message: "What is the department's ID?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }
    ]).then(function(answer) {
        connection.query("INSERT INTO role SET ?",
        {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentID
        },
        function(err) {
            if (err) throw err;
            console.log(`The job title data was successfully created!`)
            mainApp();
        });
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee?"
        },
        {
            name: "roleID",
            type: "input",
            message: "What is the role ID of the employee?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "managerID",
            type: "input",
            message: "What is the manager's ID?"
        }
    ]).then (function(answer) {
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleID,
            manager_id: answer.managerID
        }, 
        function (err) {
            if(err) throw err;
            console.log("Employee's data was successfully created!");
            mainApp();
        }
        );
    });
};

function viewDepartment() {
    console.log("Selecting from department...\n")
}
