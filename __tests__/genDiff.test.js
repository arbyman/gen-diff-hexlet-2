import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

const diffPath = path.join(__dirname, '../__tests__/__fixtures__/expectedDiff.txt');
const diffConfig = fs.readFileSync(diffPath, 'utf-8');

test('finds the difference', () => {
  const firstPath = path.join(__dirname, '../__tests__/__fixtures__/before.json');
  const secondPath = path.join(__dirname, '../__tests__/__fixtures__/after.json');
  expect(genDiff(firstPath, secondPath)).toBe(diffConfig);
});

test('works with YAML', () => {
  const firstPath = path.join(__dirname, '../__tests__/__fixtures__/before.yml');
  const secondPath = path.join(__dirname, '../__tests__/__fixtures__/after.yml');
  expect(genDiff(firstPath, secondPath)).toBe(diffConfig);
});
