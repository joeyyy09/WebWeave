import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath: string): string[] => {
  let results: string[] = [];
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    // Construct the full path to the current file by joining the folder path and file name using the 'path.join' method
    const filePath = path.join(folderPath, file);

    // Retrieve information about the current file using 'fs.statSync' which returns an instance of 'fs.Stats'
    const stat = fs.statSync(filePath);

    // Check if the current file is a directory
    if (stat.isDirectory()) {
      // If it's a directory, recursively call the 'getAllFiles' function on it and concatenate the result with the 'results' array
      results = results.concat(getAllFiles(filePath));
    } else {
      // If it's not a directory, push the file path to the 'results' array
      results.push(filePath);
    }
  });

  // Return the array containing paths to all files within the specified folder and its subfolders
  return results;
};
