import { createClient, commandOptions } from "redis"; // Importing createClient and commandOptions functions from the "redis" module
import { downloadS3Folder } from "./aws"; // Importing downloadS3Folder function from the local "./aws" module
import { buildProject } from "./buildProject"; // Importing buildProject function from the local "./buildProject" module

// Creating a Redis client
const subscriber = createClient();
subscriber.connect();

// Main function to handle processing tasks from the build queue
async function main() {
  while (1) {
    // Blocking pop operation on the "build-queue" list
    const res = await subscriber.brPop(
      commandOptions({ isolated: true }), // Setting isolated option for blocking pop
      "build-queue", // Key of the list to pop from
      0 // Timeout in seconds
    );

    // Logging the result of the pop operation
    console.log(res);

    // Extracting the id from the result
    // @ts-ignore (ignoring TypeScript error since res.element may be undefined)
    const id = res.element;

    // Downloading files from S3 folder
    await downloadS3Folder(`/output/${id}`);

    // Building the project
    await buildProject(id);
  }
}

// Invoking the main function to start processing tasks from the build queue
main();
