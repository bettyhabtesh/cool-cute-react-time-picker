import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isDemo = mode === "demo";

  if (isDemo) {
    return {
      plugins: [react()],
      root: ".",
      build: {
        outDir: "demo-dist",
        emptyOutDir: true,
      },
    };
  }

  return {
    plugins: [
      react(),
      dts({
        include: ["src"],
        exclude: ["src/demo", "src/__tests__", "**/*.test.ts", "**/*.test.tsx"],
        rollupTypes: true,
        tsconfigPath: "./tsconfig.build.json",
      }),
    ],
    build: {
      lib: {
        entry: resolve(rootDir, "src/index.ts"),
        name: "CoolCuteReactTimePicker",
        formats: ["es", "cjs"],
        fileName: (format) =>
          format === "es"
            ? "cool-cute-react-time-picker.js"
            : "cool-cute-react-time-picker.cjs",
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
          },
          assetFileNames: "cool-cute-react-time-picker.[ext]",
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
      emptyOutDir: true,
    },
  };
});