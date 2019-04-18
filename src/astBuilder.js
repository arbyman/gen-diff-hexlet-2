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
export default buildAst;
