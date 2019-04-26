import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test.each([
  [
    path.join(__dirname, './__fixtures__/before.json'),
    path.join(__dirname, './__fixtures__/after.json'),
    path.join(__dirname, './__fixtures__/expectedDiff.txt'),
  ],
  [
    path.join(__dirname, './__fixtures__/before.yml'),
    path.join(__dirname, './__fixtures__/after.yml'),
    path.join(__dirname, './__fixtures__/expectedDiff.txt'),
  ],
  [
    path.join(__dirname, './__fixtures__/before.ini'),
    path.join(__dirname, './__fixtures__/after.ini'),
    path.join(__dirname, './__fixtures__/expectedDiff.txt'),
  ],
])(
  'returns expected difference for JSON, YAML, INI.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'tree')).toBe(fs.readFileSync(expected, 'utf-8'));
  },
);

test.each([
  [
    path.join(__dirname, './__fixtures__/before.json'),
    path.join(__dirname, './__fixtures__/after.json'),
    path.join(__dirname, './__fixtures__/expectedPlainDiff.txt'),
  ],
  [
    path.join(__dirname, './__fixtures__/before.yml'),
    path.join(__dirname, './__fixtures__/after.yml'),
    path.join(__dirname, './__fixtures__/expectedPlainDiff.txt'),
  ],
  [
    path.join(__dirname, './__fixtures__/before.ini'),
    path.join(__dirname, './__fixtures__/after.ini'),
    path.join(__dirname, './__fixtures__/expectedPlainDiff.txt'),
  ],
])(
  'support plain format.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'plain')).toBe(fs.readFileSync(expected, 'utf-8'));
  },
);

test.each([
  [
    path.join(__dirname, './__fixtures__/before.json'),
    path.join(__dirname, './__fixtures__/after.json'),
    path.join(__dirname, './__fixtures__/expectedJSONDiff.json'),
  ],
  [
    path.join(__dirname, './__fixtures__/before.yml'),
    path.join(__dirname, './__fixtures__/after.yml'),
    path.join(__dirname, '../__tests__/__fixtures__/expectedJSONDiff.json'),
  ],
  [
    path.join(__dirname, './__fixtures__/before.ini'),
    path.join(__dirname, './__fixtures__/after.ini'),
    path.join(__dirname, './__fixtures__/expectedJSONDiff.json'),
  ],
])(
  'support JSON output format.',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath, 'json')).toBe(fs.readFileSync(expected, 'utf-8'));
  },
);
