export default {
  testEnvironment: "jest-environment-node",
  errorOnDeprecated: true,

  testMatch: [
    // match files in "__tests__" folders
    "**/__tests__/**/*.[jt]s?(x)",
    // match files in "tests" folders
    "**/tests/**/*.[jt]s?(x)",
    // match files that end in ".test.js"
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],

  transform: {
    "^.+\\.jsx?$": ["esbuild-jest"],
  },

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
