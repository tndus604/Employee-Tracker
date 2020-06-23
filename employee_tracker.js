var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

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
            "View employees by manager",
            "View total budget by department",
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

        case "View employees by manager":
            viewByManager();
            break;

        case "View total budget by department":
            viewBudget();
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
    console.log("Selecting from department...\n");
    connection.query("SELECT * FROM department",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        mainApp();
    }
)};

function viewRole() {
    console.log("Selecting all roles....\n");
    connection.query("SELECT * FROM role",
    function(err, res) {
        if(err) throw err;
        console.table(res);
        mainApp();
    }
)};

function viewEmployee() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee",
    function(err, res) {
        if(err) throw err;
        console.table(res);
        mainApp();
    }
)};

function viewByManager() {
    inquirer.prompt(
        {
            name: "managerID",
            type: "input",
            message: "View employees by manager: What is the manager's ID?"
        }
    ).then (function(answer) {
        connection.query("SELECT * FROM employee WHERE ?", 
        {
            manager_id: answer.managerID
        },
        function(err, res) {
            if (err) throw err;
            console.table(res);
            mainApp();
        })
    })
}

function updateEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name you want to update?"
        },
        {
            name: "roleID",
            type: "input",
            message: "What is the ID of the role you wish to update?"
        }
    ]).then(function(answer) {
        connection.query("UPDATE employee SET ? WHERE ?",
        [
            {
                role_id: answer.roleID
            },
            {
                first_name: answer.firstName
            }
        ],
        function(err,res) {
            if(err) throw err;
            console.log(res.affectedRows + " employee's role has been updated!\n");
            mainApp();
        }
        );
    });
};

function updateManager() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name you wish to update?"
        },
        {
            name: "managerID",
            type: "input",
            message: "What is the updated manager's ID?"
        }
    ]).then(function(answer) {
        connection.query("UPDATE employee SET ? WHERE ?",
        [
            {
                manager_id: answer.managerID
            },
            {
                first_name: answer.firstName
            }
        ],
        function(err,res) {
            if(err) throw err;
            console.log(res.affectedRows + " employee's manager has been updated!\n");
            mainApp();
        }
        );
    });
}

function deleteDepartment() {
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;
        inquirer.prompt(
            {
                name: "departmentName",
                type: "list",
                message: "Which department you wish to delete?",
                choices: function() {
                    var departArray = [];
                    for (var i=0; i<results.length; i++) {
                        departArray.push(results[i].name);
                    }
                    return departArray;
                }
            }
        ).then (function(answer) {
            console.log("Deleting department....\n");
            connection.query("DELETE FROM department WHERE ?", 
            {
                name: answer.departmentName
            },function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department has been deleted!\n");
                mainApp();
            })
        })
    })
}

function deleteRole() {
    connection.query("SELECT * FROM role", function(err, results) {
        if (err) throw err;
        inquirer.prompt(
            {
                name: "title",
                type: "list",
                message: "Which role you wish to delete?",
                choices: function() {
                    var roleArray = [];
                    for (var i=0; i<results.length; i++) {
                        roleArray.push(results[i].title);
                    }
                    return roleArray;
                }
            }
        ).then (function(answer) {
            console.log("Deleting role....\n");
            connection.query("DELETE FROM role WHERE ?", 
            {
                title: answer.title
            },function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role has been deleted!\n");
                mainApp();
            })
        })
    })
}

function deleteEmployee () {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee",
    function(err, res) {
        if(err) throw err;
        console.table(res);
        inquirer.prompt(
            {
                name: "employeeID",
                type: "input",
                message: "What is the id of employee you want to delete?"
            }
        ).then (function(answer) {
            console.log("Deleting role....\n");
            connection.query("DELETE FROM employee WHERE ?", 
            {
                id: answer.employeeID
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee has been deleted!\n");
                mainApp();
        })
    })
    })
};

function viewBudget() {
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;
        console.table(results);
        inquirer.prompt(
            {
                name: "departmentID",
                type: "input",
                message: "Enter the department's ID to see its budget"
            }
        ).then (function(answer) {
            connection.query("SELECT * FROM role WHERE ?", 
            {
                department_id: answer.departmentID
            },function (err, res) {
                if (err) throw err;
                let total = 0;
                for (var i=0; i<res.length; i++) {
                    total += res[i].salary;
                }
                console.log(total)
                mainApp();
            })
        })
    })
}