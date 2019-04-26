install:
	npm install

help:
	npx babel-node src/bin/index.js --help

start:
	npx babel-node src/bin/index.js ./__tests__/__fixtures__/before.yml ./__tests__/__fixtures__/after.yml --format tree

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage