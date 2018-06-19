'use strict';

var Generator = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      desc: 'Module name',
      alias: 'n',
      type: String
    });
    this.option('repository', {
      desc: 'Docker image repository for your module',
      alias: 'r',
      type: String
    });
  }

  prompting() {
    this.log(yosay('Hey You\r\nWelcome to Azure IoT Edge module generator'));

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the name of your module?',
        default: 'SampleModule',
        when: () => {
          return !this.options.name; // skip the prompt when the value is already passed as a command option
        },
        validate: (name) => {
          if (!name) {
            return 'Module name could not be empty';
          }
          if (name.startsWith('_') || name.endsWith('_')) {
            return 'Module name must not start or end with the symbol _';
          }
          if (name.match(/[^a-zA-Z0-9\_]/)) {
            return 'Module name must contain only alphanumeric characters or the symbol _';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'repository',
        message: 'What\'s the Docker image repository for your module?',
        when: () => {
          return !this.options.repository; // skip the prompt when the value is already passed as a command option
        },
        default: (answers) => {
          const name = this.options.name || answers.name;
          return `localhost:5000/${name.toLowerCase()}`;
        }
      }
    ]).then((answers) => {
      this.name = (this.options.name || answers.name).trim();
      this.repository = (this.options.repository || answers.repository).trim().toLowerCase();
    });
  }

  writing() {
    this.log(`Creating ${this.name} module at ${this.repository} ...`);

    this._copyStatic('gitignore', '.gitignore');
    this._copyStatic('app.js');
    this._copyStatic('Dockerfile');
    this._copyStatic('Dockerfile.windows-amd64');

    this._copyTemplate('module.json', { repository: this.repository });
    this._copyTemplate('package.json', { name: this.name })
  }

  _copyStatic(from, to = undefined) {
    if (to === undefined) {
      to = from;
    }
    this.fs.copy(this.templatePath(from), path.join(this.destinationPath(this.name), to));
  }

  _copyTemplate(file, context) {
    this.fs.copyTpl(this.templatePath(file), path.join(this.destinationPath(this.name), file), context);
  }
}
