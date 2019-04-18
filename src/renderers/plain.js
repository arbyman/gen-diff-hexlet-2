import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  return '[complex value]';
};
const plain = (ast, path = []) => ast.reduce((acc, item) => {
  const {
    key, value, children, state,
  } = item;
  if (state === 'added') {
    return [...acc, `Property '${[...path, key].join('.')}' was added with value: ${stringify(value)}`];
  }
  if (state === 'unchanged' && children.length > 0) {
    return [...acc, plain(children, [...path, key])];
  }
  if (state === 'deleted') {
    return [...acc, `Property '${[...path, key].join('.')}' was removed`];
  }
  if (state === 'changed') {
    return [...acc, `Property '${[...path, key].join('.')}' was updated. From ${stringify(value[0])} to ${stringify(value[1])}`];
  }
  return acc;
}, []);
export default ast => _.flatten(plain(ast)).join('\n');
