const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

// process.env.NODE_ENV = "development";
require("dotenv").config({ path: ".env.development" });

module.exports = jestConfig;
