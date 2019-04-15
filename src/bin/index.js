#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../genDiff';

commander
  .version('0.2.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig);
    console.log(diff);
  })
  .parse(process.argv);
