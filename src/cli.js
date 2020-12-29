import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--template": String,
      "-t": "--template",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    projectName: args._[0],
    template: args["--template"],
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = "react-base";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Please specify a project's name:",
      validate: (userInput) => {
        if (userInput === "" || !userInput.trim()) {
          console.error(
            "\n%s Project name cannot be empty",
            chalk.red.bold("ERROR")
          );

          return false;
        } else return true;
      },
      transformer: (userInput) => userInput.trim(),
    });
  }

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use:",
      choices: ["react-base", "react-extended", "storybook"],
      default: defaultTemplate,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
    projectName: options.projectName || answers.projectName.trim(),
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
