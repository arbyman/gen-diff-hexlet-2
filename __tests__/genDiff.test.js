import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

const diffPath = path.join(__dirname, '../__tests__/__fixtures__/expectedDiff.txt');
const diffConfig = fs.readFileSync(diffPath, 'utf-8');

test.each([
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.json'),
    path.join(__dirname, '../__tests__/__fixtures__/after.json'),
    diffConfig,
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.yml'),
    path.join(__dirname, '../__tests__/__fixtures__/after.yml'),
    diffConfig,
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.ini'),
    path.join(__dirname, '../__tests__/__fixtures__/after.ini'),
    diffConfig,
  ],
])(
  'returns expected difference for JSON, YAML, INI',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath)).toBe(expected);
  },
);
