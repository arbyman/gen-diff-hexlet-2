import fs from 'fs';
import _ from 'lodash';

const getData = filePath => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const getDifferenceConfigs = (firstConfig, secondConfig) => Object.keys(firstConfig)
  .reduce((acc, key) => {
    if (_.has(secondConfig, key)) {
      if (firstConfig[key] === secondConfig[key]) {
        return [...acc, `${key}: ${firstConfig[key]}`];
      }
      return [...acc, `+ ${key}: ${secondConfig[key]}`, `- ${key}: ${firstConfig[key]}`];
    }
    return [...acc, `- ${key}: ${firstConfig[key]}`];
  }, []);

const format = (difference) => {
  const formatted = difference.slice().map(item => `  ${item}`).join('\n');
  return `{\n${formatted}\n}`;
};

const addNewKeys = (firstConfig, secondConfig, differenceConfig) => Object.keys(secondConfig)
  .reduce((result, key) => {
    if (_.has(firstConfig, key)) {
      return result;
    }
    return [...result, `+ ${key}: ${secondConfig[key]}`];
  }, differenceConfig);

export default (firstPath, secondPath) => {
  const firstConfig = getData(firstPath);
  const secondConfig = getData(secondPath);
  const differenceConfig = getDifferenceConfigs(firstConfig, secondConfig);
  const differenceWithNewKeys = addNewKeys(firstConfig, secondConfig, differenceConfig);
  return format(differenceWithNewKeys);
};
