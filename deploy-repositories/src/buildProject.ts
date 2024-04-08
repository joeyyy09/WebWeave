import { exec } from "child_process"; // Importing exec function from child_process module
import path from "path"; // Importing path module

// Function to build a project by running npm install and npm run build
export function buildProject(id: string) {
  return new Promise((resolve) => {
    // Executing shell commands to navigate to project directory, install dependencies, and run build script
    const child = exec(
      `cd ${path.join(
        __dirname,
        `output/${id}`
      )} && npm install && npm run build`
    );

    // Listening for stdout data
    child.stdout?.on("data", function (data) {
      console.log("stdout: " + data); // Logging stdout data
    });

    // Listening for stderr data
    child.stderr?.on("data", function (data) {
      console.log("stderr: " + data); // Logging stderr data
    });

    // Listening for close event
    child.on("close", function (code) {
      resolve(""); // Resolving the promise when the child process is closed
    });
  });
}
