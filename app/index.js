var Generator = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    this.log(yosay('Hey You\r\nWelcome to Azure IoT Edge Module Generator'));
    return this.prompt([{
        type: 'list',
        name: 'moduleType',
        choices: [
          "Custom Module", "Azure Functions", "Azure Stream Analytics", "Azure Machine Learning"
        ],
        message: "Which kind of IoT Edge Module would you like to create?"
      },
      {
        type: 'input',
        name: 'name',
        default: 'AzureIoTEdgeModule',
        message: 'What\'s the name of your module'
      },
      {
        type: 'checkbox',
        name: 'architectures',
        message: 'Select the architecture(s) you want to support, your choice will help generate the corresponding dockerfile(s).',
        choices: [{
            name: "windows-x64"
          },
          {
            name: "linux-x64"
          },
          {
            name: "windows-x86"
          },
          {
            name: "linux-x86"
          },
          {
            name: "arm-x86"
          },
        ],
        validate: function (answer) {
          if (answer.length < 1) {
            return 'You must select at least one architecture.';
          }
          return true;
        }
      },
      {
        type: 'confirm',
        name: 'test',
        message: 'Would you like to add unit test?'
      }
    ]).then((answers) => {
      this.log('Creating files...');
      if (answers.test) {
        fs.mkdir(this.destinationPath(answers.name + 'Test'));
      }
      this.fs.copyTpl(this.templatePath('app.js'), this.destinationPath(answers.name + '/app.js'));
      this.fs.copyTpl(this.templatePath('.npmrc'), this.destinationPath(answers.name + '/.npmrc'));
      this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath(answers.name + '/package.json'), {
        ModuleName: answers.name
      });
      this.fs.copyTpl(this.templatePath('deployment.json'), this.destinationPath(answers.name + '/deployment.json'), {
        ModuleName: answers.name,
        LowerCaseModuleName: answers.name.toLowerCase()
      });
      this.fs.copyTpl(this.templatePath('package-lock.json'), this.destinationPath(answers.name + '/package-lock.json'), {
        ModuleName: answers.name
      });
      answers.architectures.forEach((architecture, index) => {
        this.fs.copyTpl(this.templatePath('Dockerfile'), this.destinationPath(answers.name + '/Docker/' + architecture + '/Dockerfile'));
      });
    });
  }
};