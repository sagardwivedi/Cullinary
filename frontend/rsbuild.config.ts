import { defineConfig } from "@rsbuild/core"
import { pluginImageCompress } from "@rsbuild/plugin-image-compress"
import { pluginReact } from "@rsbuild/plugin-react"
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack"

export default defineConfig({
  plugins: [pluginReact(), pluginImageCompress()],
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack()],
    },
  },
})
