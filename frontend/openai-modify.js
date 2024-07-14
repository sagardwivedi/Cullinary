import * as fs from "node:fs";
import fetch from "node-fetch";

async function fetchAndModifyOpenAPIFile(url, filePath) {
  try {
    // Fetch the JSON file from the URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the file. HTTP error! Status: ${response.status}`,
      );
    }
    const openapiContent = await response.json();

    // Modify the content
    let modified = false;
    for (const [pathKey, pathData] of Object.entries(openapiContent.paths)) {
      for (const [method, operation] of Object.entries(pathData)) {
        if (operation.tags && operation.tags.length > 0) {
          const [tag] = operation.tags;
          const { operationId } = operation;
          const toRemove = `${tag}-`;
          if (operationId.startsWith(toRemove)) {
            operation.operationId = operationId.substring(toRemove.length);
            modified = true;
          }
        }
      }
    }

    // Save the modified content to a file if any modifications were made
    if (modified) {
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(openapiContent, null, 2),
      );
      console.log("File successfully modified and saved");
    } else {
      console.log("No modifications were necessary");
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

const url = "http://localhost:8000/api/v1/openapi.json";
const filePath = "./openapi.json";
fetchAndModifyOpenAPIFile(url, filePath);
