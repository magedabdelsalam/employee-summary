const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employee = [];

function createEmployee() {
  inquirer
    .prompt({
		type: "list",
		name: "role",
		message: "what is your role?",
		choices: ["Manager", "Engineer", "Intern", "Quit"]
    })
    .then(function ({role}) {
      	switch (role) {
			case "Manager":
			createManager();
			break;

			case "Engineer":
			createEngineer();
			break;

			case "Intern":
			createIntern();
			break;

			default:
			createTeam();
      	}
    });
}

function createManager() {
  inquirer
    .prompt([
		{
			type: "input",
			name: "name",
			message: "What is your name?"
		},
		{
			type: "input",
			name: "id",
			message: "What is your company ID?"
		},
		{
			type: "input",
			name: "email",
			message: "What is your email?"
		},
		{
			type: "input",
			name: "office",
			message: "What is your office number?"
		}
    ])
    .then((response) => {
		const manager = new Manager(
			response.name,
			response.id,
			response.email,
			response.office
		);
		console.log(manager);
		employee.push(manager);
		createEmployee();
    });
}

function createIntern() {
  inquirer
    .prompt([
		{
			type: "input",
			name: "name",
			message: "What is your name?"
		},
		{
			type: "input",
			name: "id",
			message: "What is your company ID?"
		},
		{
			type: "input",
			name: "email",
			message: "What is your email?"
		},
		{
			type: "input",
			name: "school",
			message: "Where did you go to school?"
		}
    ])
    .then((response) => {
      const intern = new Intern(
			response.name,
			response.id,
			response.email,
			response.school
		);
		console.log(intern);
		employeeArr.push(intern);
		createEmployee();
    });
}

function createEngineer() {
  inquirer
    .prompt([
		{
			type: "input",
			name: "name",
			message: "What is your name?"
		},
		{
			type: "input",
			name: "id",
			message: "What is your company ID?"
		},
		{
			type: "input",
			name: "email",
			message: "What is your email?"
		},
		{
			type: "input",
			name: "github",
			message: "What is your Github?"
		}
    ])
    .then((response) => {
		const engineer = new Engineer(
			response.name,
			response.id,
			response.email,
			response.github
		);
		console.log(engineer);
		employeeArr.push(engineer);
		createEmployee();
    });
}

function createTeam() {
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR);
	}
	fs.writeFileSync(outputPath, render(employee), "utf-8");
}

createEmployee();