import type { Config } from "jest";

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleNameMapper:{
    "@/(.*)$": "<rootDir>/src/$1"
  },
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          module: "esnext",
          target: "ES2022"
        }
      }
    ]
  },
  transformIgnorePatterns: [
    "node_modules/(?!(dotenv)/)"
  ]
};

export default config;
