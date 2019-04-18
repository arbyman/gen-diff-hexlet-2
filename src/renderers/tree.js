import _ from 'lodash';

const tab = 2;
const currentTab = depth => ' '.repeat(tab * depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const line = Object.keys(value)
    .reduce((acc, key) => `${acc}${currentTab(depth)}${key}: ${value[key]}`, '');
  return `{\n${line}\n${currentTab(depth - tab)}}`;
};

const render = (ast, depth = 1) => ast.reduce((acc, item) => {
  const {
    key, value, state, children,
  } = item;
  if (state === 'added') {
    return `${acc}${currentTab(depth)}+ ${key}: ${stringify(value, depth + tab + 1)}\n`;
  }
  if (state === 'unchanged' && children.length > 0) {
    return `${acc}${currentTab(depth)}  ${key}: {\n${render(children, depth + tab)}${currentTab(depth)}  }\n`;
  }
  if (state === 'unchanged') {
    return `${acc}${currentTab(depth)}  ${key}: ${stringify(value, depth + tab + 1)}\n`;
  }
  if (state === 'deleted') {
    return `${acc}${currentTab(depth)}- ${key}: ${stringify(value, depth + tab + 1)}\n`;
  }
  if (state === 'changed') {
    return `${acc}${currentTab(depth)}- ${key}: ${stringify(value[0], depth + tab + 1)}\n${currentTab(depth)}+ ${key}: ${stringify(value[1], depth + tab + 1)}\n`;
  }
  return acc;
}, '');
export default ast => `{\n${render(ast)}}`;
