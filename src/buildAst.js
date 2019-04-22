import _ from 'lodash';

const buildAst = (firstConfig, secondConfig) => {
  const keysBefore = Object.keys(firstConfig);
  const keysAfter = Object.keys(secondConfig);
  const keysAll = _.union(keysBefore, keysAfter);
  return keysAll.reduce((acc, key) => {
    if (_.has(secondConfig, key) && _.has(firstConfig, key)) {
      if (_.isObject(firstConfig[key]) && _.isObject(secondConfig[key])) {
        return [...acc, {
          key,
          type: 'nested',
          children: buildAst(firstConfig[key], secondConfig[key]),
        }];
      }
      if (firstConfig[key] === secondConfig[key]) {
        return [...acc, {
          key,
          value: firstConfig[key],
          type: 'unchanged',
        }];
      }
      return [...acc, {
        key,
        oldValue: firstConfig[key],
        newValue: secondConfig[key],
        type: 'changed',
      }];
    }
    if (!_.has(firstConfig, key)) {
      return [...acc, {
        key,
        value: secondConfig[key],
        type: 'added',
      }];
    }
    return [...acc, {
      key,
      value: firstConfig[key],
      type: 'deleted',
    }];
  }, []);
};
export default buildAst;
