import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./openapi.json",
  output: {
    path: "./src/client",
    format: "biome",
    lint: "biome",
  },
  client: "axios",
  debug: true,
});
