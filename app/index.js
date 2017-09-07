"use strict";

var Generator = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    this.log(yosay('Hey You\r\nWelcome to Azure IoT Edge Module Generator'));
    let registry = "http://edgenpm.southcentralus.cloudapp.azure.com/";
    return this.prompt([{
        type: 'list',
        name: 'moduleType',
        choices: [
          "all", "custom module", "deployment file", "routes file"
        ],
        message: "Which one would you like to create?"
      },
      {
        when: (props) => {
          return (props.moduleType === 'custom module' || props.moduleType === 'all');
        },
        type: 'input',
        name: 'name',
        default: 'AzureIoTEdgeModule',
        message: 'What\'s the name of your module',
        validate: function (folderName) {
          if (folderName.match(/^[a-z0-9_-\s]+$/gi) === null) {
            return 'Please input a valid module name';
          }
          return true;
        }
      },
      {
        when: (props) => {
          return (props.moduleType === 'custom module' || props.moduleType === 'all');
        },
        type: 'checkbox',
        name: 'architectures',
        message: 'Select the architecture(s) you want to support, your choice will help generate the corresponding dockerfile(s).',
        choices: [{
            name: "linux-x64"
          }
        ],
        validate: function (answer) {
          if (answer.length < 1) {
            return 'You must select at least one architecture.';
          }
          return true;
        }
      },
      {
        when: (props) => {
          return (props.moduleType === 'custom module' || props.moduleType === 'all');
        },
        type: 'confirm',
        name: 'test',
        message: 'Would you like to add unit test?'
      }
    ]).then((answers) => {
      if (answers.moduleType === 'custom module' || answers.moduleType === 'all') {
        this.log('Creating files...');
        if (answers.test) {
          fs.mkdir(this.destinationPath(answers.name + 'Test'));
          fs.writeFileSync('test.js', '')
        }
        this.fs.copyTpl(this.templatePath('app.js'), this.destinationPath(answers.name + '/app.js'));
        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath(answers.name + '/package.json'), {
          ModuleName: answers.name
        });
        this.fs.copyTpl(this.templatePath('package-lock.json'), this.destinationPath(answers.name + '/package-lock.json'), {
          ModuleName: answers.name
        });
        this.fs.write(this.destinationPath(answers.name + '/.npmrc'), registry);
        answers.architectures.forEach((architecture, index) => {
          this.fs.copyTpl(this.templatePath('Docker/' + architecture + '/Dockerfile'), this.destinationPath(answers.name + '/Docker/' + architecture + '/Dockerfile'));
        });
      }
      if (answers.moduleType === 'all') {
        this.fs.copyTpl(this.templatePath('deployment.json'), this.destinationPath(answers.name + '/deployment.json'), {
          ModuleName: answers.name
        });
        this.fs.copyTpl(this.templatePath('routes.json'), this.destinationPath(answers.name + '/routes.json'));
      }
      if (answers.moduleType === 'deployment file') {
        this.fs.copyTpl(this.templatePath('deployment.json'), this.destinationPath('deployment.json'));
      }
      if (answers.moduleType === 'routes file') {
        this.fs.copyTpl(this.templatePath('routes.json'), this.destinationPath('routes.json'));
      }
    });
  }
}