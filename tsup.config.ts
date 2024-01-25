import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm", "cjs"],
  entry: {
    index: "./_build/default/dist/src/index.ts",
  },
  outDir: "dist",
  sourcemap: true,
  clean: true,
  dts: true,
});
