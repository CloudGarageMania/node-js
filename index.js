#!/usr/bin/env node

const program = require('commander');

program
  .version('0.1.0')
  .command('token', 'Create token file')
  .command('images', 'Retribute every images');

program.parse(process.argv);
