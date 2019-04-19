install:
	npm install

help:
	npx babel-node src/bin/index.js --help

start:
	npx babel-node src/bin/index.js ../before.ini ../after.ini --format json

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test