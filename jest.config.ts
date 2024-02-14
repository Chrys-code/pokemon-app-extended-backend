import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    roots: ["<rootDir>/src"],
    testMatch: ["**/__tests__/**/*.test.ts"],
    preset: 'ts-jest',
};

export default config;