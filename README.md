[![Build Status](https://travis-ci.org/arbyman/gen-diff-hexlet-2.svg?branch=master)](https://travis-ci.org/arbyman/gen-diff-hexlet-2)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8af5e4230282c93bd335/test_coverage)](https://codeclimate.com/github/arbyman/gen-diff-hexlet-2/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/8af5e4230282c93bd335/maintainability)](https://codeclimate.com/github/arbyman/gen-diff-hexlet-2/maintainability)
# Welcome to the Gendiff!
## Installation
```$ npm install -g gendiff_arbyman```
### Use '-h' flag for help
```$ gendiff -h```

GenDiff compares two configuration files and shows a difference. Supports INI, YAML, JSON format. Works with nested structures.
Output formats: JSON, plain text, tree structure.

## Examples

### before.json
```{
  "common": {
    "setting1": "Value 1",
    "setting2": "200",
    "setting3": true,
    "setting6": {
      "key": "value"
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": "12345"
  }
}
```
### after.json
```{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },

  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },

  "group3": {
    "fee": "100500"
  }
}
```
## Look Asciinema
[![asciicast](https://asciinema.org/a/GAJH4WfCM3iyozg1nZTbvkROJ.svg)](https://asciinema.org/a/GAJH4WfCM3iyozg1nZTbvkROJ)
