install:
	npm install

help:
	npx babel-node src/bin/index.js --help

start:
	npx babel-node src/bin/index.js /home/arbyman/Документы/projects/before.ini ../after.ini

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test