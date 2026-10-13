import nextConfig from "@protos/config/eslint/next";

/** @type {import("typescript-eslint").Config} */
export default [
  ...nextConfig,
  {
    ignores: [".next/**", "node_modules/**", ".turbo/**", "next-env.d.ts"],
  },
];
