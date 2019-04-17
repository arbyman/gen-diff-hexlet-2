install:
	npm install

help:
	npx babel-node src/bin/index.js --help

start:
	npx babel-node src/bin/index.js /home/arbyman/Документы/projects/before.yml ../after.yml

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test