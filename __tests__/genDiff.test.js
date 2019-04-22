import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

test.each([
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.json'),
    path.join(__dirname, '../__tests__/__fixtures__/after.json'),
    fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expectedDiff.txt'), 'utf-8'),
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.yml'),
    path.join(__dirname, '../__tests__/__fixtures__/after.yml'),
    fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expectedDiff.txt'), 'utf-8'),
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.ini'),
    path.join(__dirname, '../__tests__/__fixtures__/after.ini'),
    fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expectedDiff.txt'), 'utf-8'),
  ],
])(
  'returns expected difference for JSON, YAML, INI.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'tree')).toBe(expected);
  },
);

test.each([
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.json'),
    path.join(__dirname, '../__tests__/__fixtures__/after.json'),
    fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expectedPlainDiff.txt'), 'utf-8'),
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.yml'),
    path.join(__dirname, '../__tests__/__fixtures__/after.yml'),
    fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expectedPlainDiff.txt'), 'utf-8'),
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.ini'),
    path.join(__dirname, '../__tests__/__fixtures__/after.ini'),
    fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expectedPlainDiff.txt'), 'utf-8'),
  ],
])(
  'support plain format.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'plain')).toBe(expected);
  },
);

test.each([
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.json'),
    path.join(__dirname, '../__tests__/__fixtures__/after.json'),
    fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expectedJSONDiff.json'), 'utf-8'),
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.yml'),
    path.join(__dirname, '../__tests__/__fixtures__/after.yml'),
    fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expectedJSONDiff.json'), 'utf-8'),
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/before.ini'),
    path.join(__dirname, '../__tests__/__fixtures__/after.ini'),
    fs.readFileSync(path.join(__dirname, '../__tests__/__fixtures__/expectedJSONDiff.json'), 'utf-8'),
  ],
])(
  'support JSON output format.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected);
  },
);
