#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../genDiff';
import { version } from '../../package.json';

commander
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig);
    console.log(diff);
  })
  .parse(process.argv);
