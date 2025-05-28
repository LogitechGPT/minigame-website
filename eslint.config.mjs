import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Your config
export default [
  // Next.js recommended config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: ["@typescript-eslint"],
    rules: {
      "no-unused-vars": "off", // Disable JS rule
      "@typescript-eslint/no-unused-vars": ["error"], // Enable TS rule
      "@typescript-eslint/no-unused-expressions": "off", // Turn off noisy rule
    },
  },
];
