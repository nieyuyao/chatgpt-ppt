module.exports = {
  roots: ['<rootDir>'],
  testMatch: [
    '<rootDir>/test/*.+(ts|tsx|js)',
    '<rootDir>/test/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  testTimeout: 10 * 1000,
}
