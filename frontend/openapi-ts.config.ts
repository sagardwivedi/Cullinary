import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  client: "axios",
  input: "./openapi.json",
  output: {
    path: "src/client",
    format: "biome",
    lint: "biome",
  },
  types: {
    dates: "types+transform",
    enums: "javascript",
  },
})
