import reactConfig from "./react.js";
import tseslint from "typescript-eslint";

/** @type {import("typescript-eslint").Config} */
export default tseslint.config(...reactConfig, {
  rules: {
    // Next.js allows default exports for pages/layouts/routes
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
  },
});
