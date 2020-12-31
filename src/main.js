import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import execa from "execa";
import Listr from "listr";
import { promisify } from "util";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

async function setProjectName(options) {
  const result = await execa("npe", ["name", options.projectName], {
    cwd: options.targetDirectory,
    preferLocal: true,
    localDir: path.resolve(__dirname, "..", "node_modules", "npe"),
  });

  if (result.failed) {
    return Promise.reject(
      new Error(
        "Failed to set the project's name. You might want to do it manually."
      )
    );
  }
  return;
}

async function initializeProjectVersion(options) {
  const result = await execa("npe", ["version", "1.0.0"], {
    cwd: options.targetDirectory,
    preferLocal: true,
    localDir: path.resolve(__dirname, "..", "node_modules", "npe"),
  });

  if (result.failed) {
    return Promise.reject(
      new Error(
        "Failed to initialize the project's version. You might want to do it manually."
      )
    );
  }
  return;
}

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDirectory,
  });

  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

export async function createProject(options) {
  const projectName = options.projectName;
  const directory = options.targetDirectory;

  options = {
    ...options,
    targetDirectory: `${process.cwd()}/${projectName}`,
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error(`${chalk.red.bold("ERROR")} Invalid template name`);
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: `Set project's name: ${options.projectName}`,
      task: () => setProjectName(options),
    },
    {
      title: "Initialize version: 1.0.0",
      task: () => initializeProjectVersion(options),
    },
    {
      title: "Initialize git",
      task: () => initGit(options),
    },
  ]);

  await tasks.run();
  console.log(
    `\n${chalk.green.bold("DONE")} Project ${chalk.yellow(
      projectName
    )} is ready in ${chalk.yellow(options.targetDirectory)}`
  );
  return true;
}
