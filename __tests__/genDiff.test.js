import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

const diffPath = path.join(__dirname, '../__tests__/__fixtures__/expectedDiff.txt');
const diffConfig = fs.readFileSync(diffPath, 'utf-8');
const diffNestedPath = path.join(__dirname, '../__tests__/__fixtures__/nested/expectedNestedDiff.txt');
const diffNestedConfig = fs.readFileSync(diffNestedPath, 'utf-8');
const diffPlainPath = path.join(__dirname, '../__tests__/__fixtures__/expectedPlainDiff.txt');
const diffPlainConfig = fs.readFileSync(diffPlainPath, 'utf-8');
const diffJSONPath = path.join(__dirname, '../__tests__/__fixtures__/expectedJSONDiff.json');
const diffJSONConfig = fs.readFileSync(diffJSONPath, 'utf-8');

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
  'returns expected difference for JSON, YAML, INI.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'tree')).toBe(expected);
  },
);

test.each([
  [
    path.join(__dirname, '../__tests__/__fixtures__/nested/before.json'),
    path.join(__dirname, '../__tests__/__fixtures__/nested/after.json'),
    diffNestedConfig,
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/nested/before.yml'),
    path.join(__dirname, '../__tests__/__fixtures__/nested/after.yml'),
    diffNestedConfig,
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/nested/before.ini'),
    path.join(__dirname, '../__tests__/__fixtures__/nested/after.ini'),
    diffNestedConfig,
  ],
])(
  'works with nested structures.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'tree')).toBe(expected);
  },
);

test.each([
  [
    path.join(__dirname, '../__tests__/__fixtures__/nested/before.json'),
    path.join(__dirname, '../__tests__/__fixtures__/nested/after.json'),
    diffPlainConfig,
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/nested/before.yml'),
    path.join(__dirname, '../__tests__/__fixtures__/nested/after.yml'),
    diffPlainConfig,
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/nested/before.ini'),
    path.join(__dirname, '../__tests__/__fixtures__/nested/after.ini'),
    diffPlainConfig,
  ],
])(
  'support plain format.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'plain')).toBe(expected);
  },
);

test.each([
  [
    path.join(__dirname, '../__tests__/__fixtures__/nested/before.json'),
    path.join(__dirname, '../__tests__/__fixtures__/nested/after.json'),
    diffJSONConfig,
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/nested/before.yml'),
    path.join(__dirname, '../__tests__/__fixtures__/nested/after.yml'),
    diffJSONConfig,
  ],
  [
    path.join(__dirname, '../__tests__/__fixtures__/nested/before.ini'),
    path.join(__dirname, '../__tests__/__fixtures__/nested/after.ini'),
    diffJSONConfig,
  ],
])(
  'support JSON output format.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected);
  },
);
