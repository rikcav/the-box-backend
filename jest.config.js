module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testRegex: ".*\\.test\\.ts$",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
