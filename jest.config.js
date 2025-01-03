/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "<rootDir>/__tests__/setup/jestSetup.ts",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/unit/**/*.test.ts?(x)"],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/api/(.*)$": "<rootDir>/api/$1",
  },
  collectCoverage: true,
  coverageDirectory: "./coverage",
  testEnvironment: "jsdom",
};
