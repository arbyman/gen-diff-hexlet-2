import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

const diffPath = path.join(__dirname, '../__tests__/__fixtures__/expectedDiff.txt');
const diffConfig = fs.readFileSync(diffPath, 'utf-8');

test('finds the difference', () => {
  const firstAbsolutePath = path.join(__dirname, '../__tests__/__fixtures__/before.json');
  const secondAbsolutePath = path.join(__dirname, '../__tests__/__fixtures__/after.json');
  expect(genDiff(firstAbsolutePath, secondAbsolutePath)).toBe(diffConfig);
});
