import * as fs from "node:fs"

interface OpenAPIOperation {
  operationId: string
  tags: string[]
}

interface OpenAPIPathItem {
  [method: string]: OpenAPIOperation
}

interface OpenAPIContent {
  paths: {
    [pathKey: string]: OpenAPIPathItem
  }
}

async function modifyOpenAPIFile(filePath: string): Promise<void> {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8")
    const openapiContent: OpenAPIContent = JSON.parse(data)

    for (const pathItem of Object.values(openapiContent.paths)) {
      for (const operation of Object.values(pathItem)) {
        const [tag] = operation.tags || []
        if (tag && operation.operationId.startsWith(`${tag}-`)) {
          operation.operationId = operation.operationId.substring(
            tag.length + 1,
          )
        }
      }
    }

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(openapiContent, null, 2),
    )
    console.log("File successfully modified")
  } catch (err) {
    console.error("Error:", err)
  }
}

const filePath = "./openapi.json"
modifyOpenAPIFile(filePath)
