import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renderers';
import astBuilder from './astBuilder';

export default (firstPath, secondPath, format) => {
  const firstConfigData = fs.readFileSync(firstPath, 'utf-8');
  const secondConfigData = fs.readFileSync(secondPath, 'utf-8');
  const firstConfigExt = path.extname(firstPath);
  const secondConfigExt = path.extname(secondPath);
  const firstConfig = parse(firstConfigData, firstConfigExt);
  const secondConfig = parse(secondConfigData, secondConfigExt);
  const ast = astBuilder(firstConfig, secondConfig);
  return render(ast, format);
};
