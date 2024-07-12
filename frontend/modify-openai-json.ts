import fetch from "node-fetch"
import { promises as fs } from "node:fs"

async function downloadOpenAPIFile(
  url: string,
  filePath: string,
): Promise<void> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
    }
    const data = await response.text()
    await fs.writeFile(filePath, data)
    console.log("File downloaded successfully")
  } catch (err) {
    console.error("Error downloading file:", err)
  }
}

async function modifyOpenAPIFile(filePath: string): Promise<void> {
  try {
    const data = await fs.readFile(filePath, "utf-8")
    const openapiContent = JSON.parse(data)

    for (const pathKey in openapiContent.paths) {
      const pathData = openapiContent.paths[pathKey]
      for (const method in pathData) {
        const operation = pathData[method]
        if (operation.tags && operation.tags.length > 0) {
          const tag = operation.tags[0]
          const operationId = operation.operationId
          const toRemove = `${tag}-`
          if (operationId.startsWith(toRemove)) {
            const newOperationId = operationId.substring(toRemove.length)
            operation.operationId = newOperationId
          }
        }
      }
    }

    await fs.writeFile(filePath, JSON.stringify(openapiContent, null, 2))
    console.log("File successfully modified")
  } catch (err) {
    console.error("Error modifying file:", err)
  }
}

const url = "http://localhost:8000/api/v1/openapi.json"
const filePath = "./openapi.json"

async function main(): Promise<void> {
  await downloadOpenAPIFile(url, filePath)
  await modifyOpenAPIFile(filePath)
}

main()
