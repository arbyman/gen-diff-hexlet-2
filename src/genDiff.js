import parse from './parsers';
import render from './renderers/renderers';
import astBuilder from './astBuilder';

export default (firstPath, secondPath, format) => {
  const firstConfig = parse(firstPath);
  const secondConfig = parse(secondPath);
  const ast = astBuilder(firstConfig, secondConfig);
  return render(ast, format);
};
