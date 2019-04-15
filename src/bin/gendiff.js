#!/usr/bin/env node

import commander from 'commander';

commander
  .version('0.1.6')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
