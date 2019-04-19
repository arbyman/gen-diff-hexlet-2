import tree from './tree';
import plain from './plain';
import json from './json';

const renders = {
  tree,
  plain,
  json,
};

export default (ast, format) => renders[format](ast);
