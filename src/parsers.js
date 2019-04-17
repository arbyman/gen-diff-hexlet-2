import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
};

export default (filePath) => {
  const ext = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  const parser = parsers[ext];
  return parser(data);
};
