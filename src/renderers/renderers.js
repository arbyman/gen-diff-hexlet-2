import tree from './tree';
import plain from './plain';

const renders = {
  tree,
  plain,
};

export default (ast, format) => renders[format](ast);
