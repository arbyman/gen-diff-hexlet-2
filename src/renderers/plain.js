import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  return '[complex value]';
};
const plain = (ast, path = []) => ast.reduce((acc, item) => {
  const {
    key, value, children, type, oldValue, newValue,
  } = item;
  switch (type) {
    case 'added':
      return [...acc, `Property '${[...path, key].join('.')}' was added with value: ${stringify(value)}`];
    case 'unchangedButHasChildren':
      return [...acc, ...plain(children, [...path, key])];
    case 'deleted':
      return [...acc, `Property '${[...path, key].join('.')}' was removed`];
    case 'changed':
      return [...acc, `Property '${[...path, key].join('.')}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`];
    default:
      return acc;
  }
}, []);
export default ast => plain(ast).join('\n');
