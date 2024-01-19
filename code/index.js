const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

// function for team member info
function ask () {
  inquirer
    .prompt ([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the managers name',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter the managers employee ID',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter the managers email',
      },
      {
        type: 'input',
        name: 'office',
        message: 'Enter the managers office number',
      },
      {
        type: 'list',
        name: 'role',
        message: 'Add another employee:',
        choices: ['Engineer', 'Intern', 'Finish building the team'],
      },
    ])
    .then ((answers) => {
      if (answers.role === 'Engineer') {
        promptEngineer(answers);
      } else if (answers.role === 'Intern') {
        promptIntern(answers);
      } else if (answers.role === 'Finish building the team') {
        finishBuildingTeam();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
}

function finishBuildingTeam () {
  console.log('Team has been completed!');
  console.log('Team members: ', teamMembers);

  // team members added to html
  render(teamMembers);
}

function promptEngineer (answers) {
  const engineerQuestions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is the engineers name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the engineers ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the engineers email?'
    },
    {
      type: 'input',
      name: 'githubUsername',
      message: 'What is the engineers Github username?'
    },
  ];
  inquirer.prompt(engineerQuestions).then((engineerAnswers) => {
    const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.githubUsername);
    // adding the new engineer to the team members array
    teamMembers.push(engineer);
    
    // calling the function again if more engineers need to be added
    ask();
  });
};

function promptIntern (answers) {
  const internQuestions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is the interns name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the interns ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the interns email?'
    },
    {
      type: 'input',
      name: 'school',
      message: 'What is the interns school??'
    },
  ];
  inquirer.prompt(internQuestions).then((internAnswers) => {
    const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
    // adding the new intern to the team members array
    teamMembers.push(intern);
    
    // calling the function again if more interns need to be added
    ask();
  });
};

