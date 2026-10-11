/** @type {import("@commitlint/types").UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "perf", "ci"],
    ],
    "scope-enum": [
      2,
      "always",
      [
        "auth",
        "plan",
        "activities",
        "goals",
        "habits",
        "finance",
        "stats",
        "settings",
        "ui",
        "db",
        "deps",
        "ci",
        "monorepo",
        "eslint",
        "typescript",
        "prettier",
        "husky",
        "commitlint",
      ],
    ],
    "scope-empty": [1, "never"],
    "header-max-length": [2, "always", 72],
    "subject-case": [2, "always", "lower-case"],
  },
};
