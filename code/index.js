// const Employee = require("./lib/Employee");
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

console.log('Hello World!')

// function for team member info
function ask() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the manager\'s name',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter the manager\'s employee ID',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter the manager\'s email',
      },
      {
        type: 'input',
        name: 'office',
        message: 'Enter the manager\'s office number',
      },
      {
        type: 'list',
        name: 'role',
        message: 'Add another employee:',
        choices: ['Engineer', 'Intern', 'Finish building the team'],
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.office,
      )
  
      teamMembers.push(manager);

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
    });
}

function finishBuildingTeam() {
  console.log('Team has been completed!');
  console.log('Team members: ', teamMembers);

  // team members added to html
  const htmlContent = render(teamMembers);

  fs.writeFileSync(outputPath, htmlContent);
  console.log(`HTML file generated at ${outputPath}`);

  teamMembers.forEach(member => {
    writeToFile(member);
  });
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
    {
      type: 'list',
      name: 'role',
      message: 'Add another employee:',
      choices: ['Engineer', 'Intern', 'Finish building the team'],
    },
  ];

  inquirer.prompt(engineerQuestions)
  .then((engineerAnswers) => {
    const engineer = new Engineer(
      engineerAnswers.name,
      engineerAnswers.id,
      engineerAnswers.email,
      engineerAnswers.githubUsername
    )

    teamMembers.push(engineer);

    if (engineerAnswers.role === 'Engineer') {
      promptEngineer(engineerAnswers);
    } else if (engineerAnswers.role === 'Intern') {
      promptIntern(engineerAnswers);
    } else if (engineerAnswers.role === 'Finish building the team') {
      finishBuildingTeam();
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
    {
      type: 'list',
      name: 'role',
      message: 'Add another employee:',
      choices: ['Engineer', 'Intern', 'Finish building the team'],
    },
  ];
  inquirer.prompt(internQuestions)
  .then((internAnswers) => {
    const intern = new Intern(
      internAnswers.name,
      internAnswers.id,
      internAnswers.email,
      internAnswers.school
    )

    teamMembers.push(intern);

      if (internAnswers.role === 'Engineer') {
        promptEngineer(internAnswers);
      } else if (internAnswers.role === 'Intern') {
        promptIntern(internAnswers);
      } else if (internAnswers.role === 'Finish building the team') {
        finishBuildingTeam();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  };

function writeToFile(employee) {
  fs.appendFileSync(outputPath, content);
  console.log(`HTML file updated at ${outputPath}`);
}

ask();

