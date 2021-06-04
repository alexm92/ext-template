const path = require('path');

module.exports = {
  // Global options:
  verbose: true,

  // Command options:
  artifactsDir: 'artifacts',
  sourceDir: 'dist',
  build: {
    overwriteDest: true,
  },
};
