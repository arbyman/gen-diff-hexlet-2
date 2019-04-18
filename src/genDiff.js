import _ from 'lodash';
import parse from './parsers';

const buildAst = (firstConfig, secondConfig) => {
  const keysBefore = Object.keys(firstConfig);
  const keysAfter = Object.keys(secondConfig);
  const keysAll = _.union(keysBefore, keysAfter);
  return keysAll.reduce((acc, key) => {
    if (_.has(secondConfig, key) && _.has(firstConfig, key)) {
      if (_.isObject(firstConfig[key]) && _.isObject(secondConfig[key])) {
        return [...acc, {
          key,
          value: '',
          state: 'unchanged',
          children: buildAst(firstConfig[key], secondConfig[key]),
        }];
      }
      if (firstConfig[key] === secondConfig[key]) {
        return [...acc, {
          key,
          value: firstConfig[key],
          state: 'unchanged',
          children: [],
        }];
      }
      return [...acc, {
        key,
        value: [firstConfig[key], secondConfig[key]],
        state: 'changed',
        children: [],
      }];
    }
    if (!_.has(firstConfig, key)) {
      return [...acc, {
        key,
        value: secondConfig[key],
        state: 'added',
        children: [],
      }];
    }
    return [...acc, {
      key,
      value: firstConfig[key],
      state: 'deleted',
      children: [],
    }];
  }, []);
};
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
const format = ast => `{\n${render(ast)}}`;
export default (firstPath, secondPath) => {
  const firstConfig = parse(firstPath);
  const secondConfig = parse(secondPath);
  const ast = buildAst(firstConfig, secondConfig);
  return format(ast);
};
