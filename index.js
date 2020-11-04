#!/usr/bin/env node
const copy = require('copy-template-dir');
const path = require('path');
const { Input } = require('enquirer');
const chalk = require('chalk');
const symbol = require('log-symbols');

const prompt = new Input({
  name: 'cli',
  message: 'Name cli project',
});

prompt
  .run()
  .then((answer) => {
    const vars = { name: answer, version: '1.0.0', description: 'Create cli boilerplate tutorial' };
    const inDir = path.join(process.cwd(), 'templates');
    const outDir = path.join(process.cwd(), vars.name);

    return copy(inDir, outDir, vars, (err, createdFiles) => {
      if (err) throw err;
      createdFiles.forEach((filePath) => {
        const fileName = path.basename(filePath);

        console.log(`${symbol.success} ${chalk.green('Created')} ${fileName}`);
      });
    });
  })
  .catch(console.error);
