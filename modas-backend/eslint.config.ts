import type { Linter } from "eslint";
const eslint = require("@eslint/js");

const config: Linter.Config[] = [
  eslint.configs.recommended,
  {
    rules: {
      "no-console": [0],
    },
  },
];

module.exports = config;