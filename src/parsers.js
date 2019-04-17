import yaml from 'js-yaml';
import fs from 'fs';
import ini from 'ini';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (filePath) => {
  const ext = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  const parser = parsers[ext];
  return parser(data);
};
