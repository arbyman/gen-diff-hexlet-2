install:
	npm install

start:
	npx babel-node src/bin/index.js /home/arbyman/Документы/projects/before.json ../after.json

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test