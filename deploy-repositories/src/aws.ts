import { S3 } from "aws-sdk"; // Importing S3 module from aws-sdk
import fs from "fs"; // Importing file system module
import path from "path"; // Importing path module

// Creating a new instance of S3 with access credentials and endpoint
const s3 = new S3({
  accessKeyId: "7ea9c3f8c7f0f26f0d21c5ce99d1ad6a",
  secretAccessKey:
    "b4df203781dd711223ce931a2d7ca269cdbf81bb530de4548474584951b798be",
  endpoint: "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com",
});

// Function to download files from an S3 folder
export async function downloadS3Folder(prefix: string) {
  // Listing all objects in the specified S3 bucket with the given prefix
  const allFiles = await s3
    .listObjectsV2({
      Bucket: "WebWeave",
      Prefix: prefix,
    })
    .promise();

  // Mapping each object to a download promise
  const allPromises =
    allFiles.Contents?.map(async ({ Key }) => {
      return new Promise(async (resolve) => {
        // If Key is undefined, resolve the promise with an empty string
        if (!Key) {
          resolve("");
          return;
        }
        // Constructing the final output path for the downloaded file
        const finalOutputPath = path.join(__dirname, Key);
        // Creating a write stream for the output file
        const outputFile = fs.createWriteStream(finalOutputPath);
        // Creating directory if it doesn't exist
        const dirName = path.dirname(finalOutputPath);
        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, { recursive: true });
        }
        // Fetching the object from S3 and piping it to the output file stream
        s3.getObject({
          Bucket: "WebWeave",
          Key,
        })
          .createReadStream()
          .pipe(outputFile)
          .on("finish", () => {
            resolve(""); // Resolving the promise once the download finishes
          });
      });
    }) || [];

  console.log("awaiting");

  // Waiting for all download promises to resolve
  await Promise.all(allPromises?.filter((x) => x !== undefined));
}
