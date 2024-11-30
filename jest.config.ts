// jest.config.ts
import { type JestConfigWithTsJest, createDefaultPreset } from 'ts-jest'

const defaultPreset = createDefaultPreset()

const jestConfig: JestConfigWithTsJest = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  ...defaultPreset,
  testEnvironment: 'jsdom', // Set the test environment to jsdom
  moduleNameMapper: {
    "d3": "<rootDir>/node_modules/d3/dist/d3.min.js",
    "^d3-(.*)$": "<rootDir>/node_modules/d3-$1/dist/d3-$1.min.js"
  }
}

export default jestConfig
