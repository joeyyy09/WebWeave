"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadS3Folder = void 0;
const aws_sdk_1 = require("aws-sdk"); // Importing S3 module from aws-sdk
const fs_1 = __importDefault(require("fs")); // Importing file system module
const path_1 = __importDefault(require("path")); // Importing path module
// Creating a new instance of S3 with access credentials and endpoint
const s3 = new aws_sdk_1.S3({
    accessKeyId: "7ea9c3f8c7f0f26f0d21c5ce99d1ad6a",
    secretAccessKey: "b4df203781dd711223ce931a2d7ca269cdbf81bb530de4548474584951b798be",
    endpoint: "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com",
});
// Function to download files from an S3 folder
function downloadS3Folder(prefix) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Listing all objects in the specified S3 bucket with the given prefix
        const allFiles = yield s3
            .listObjectsV2({
            Bucket: "WebWeave",
            Prefix: prefix,
        })
            .promise();
        // Mapping each object to a download promise
        const allPromises = ((_a = allFiles.Contents) === null || _a === void 0 ? void 0 : _a.map((_b) => __awaiter(this, [_b], void 0, function* ({ Key }) {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                // If Key is undefined, resolve the promise with an empty string
                if (!Key) {
                    resolve("");
                    return;
                }
                // Constructing the final output path for the downloaded file
                const finalOutputPath = path_1.default.join(__dirname, Key);
                // Creating a write stream for the output file
                const outputFile = fs_1.default.createWriteStream(finalOutputPath);
                // Creating directory if it doesn't exist
                const dirName = path_1.default.dirname(finalOutputPath);
                if (!fs_1.default.existsSync(dirName)) {
                    fs_1.default.mkdirSync(dirName, { recursive: true });
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
            }));
        }))) || [];
        console.log("awaiting");
        // Waiting for all download promises to resolve
        yield Promise.all(allPromises === null || allPromises === void 0 ? void 0 : allPromises.filter((x) => x !== undefined));
    });
}
exports.downloadS3Folder = downloadS3Folder;
