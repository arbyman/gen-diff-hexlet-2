import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  return '[complex value]';
};
const plain = (ast, path = []) => ast.map((item) => {
  const {
    key, value, children, type, oldValue, newValue,
  } = item;
  switch (type) {
    case 'added':
      return `Property '${[...path, key].join('.')}' was added with value: ${stringify(value)}`;
    case 'nested':
      return plain(children, [...path, key]);
    case 'deleted':
      return `Property '${[...path, key].join('.')}' was removed`;
    case 'changed':
      return `Property '${[...path, key].join('.')}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
    default:
      return null;
  }
}, []);
export default ast => _.flattenDeep(plain(ast)).filter(_.identity).join('\n');
