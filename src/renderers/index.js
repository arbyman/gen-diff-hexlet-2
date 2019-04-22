import tree from './tree';
import plain from './plain';

const renders = {
  tree,
  plain,
  json: JSON.stringify,
};

export default (ast, format) => renders[format](ast);
