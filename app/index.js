var Generator = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.on('end', function() {
      process.chdir(this.moduleName);
      this.spawnCommand('dotnet', ['restore']).on('close', () => {
        this.log('\r\nAll Set!\r\n');
      });
    });
  }

  prompting() {
    this.log(yosay('Hey You\r\nWelcome to Azure IoT Edge Modudle Generator'));
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
            name: "Windows-x64"
          },
          {
            name: "Linux-x64"
          },
          {
            name: "Windows-x86"
          },
          {
            name: "Linux-x86"
          },
          {
            name: "ARM-x86"
          },
        ],
        validate: function(answer) {
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
      this.moduleName = answers.name;
      if (answers.test) {
        fs.mkdir(this.destinationPath(answers.name + 'Test'));
      }
      this.fs.copyTpl(this.templatePath('Project.csproj'), this.destinationPath(answers.name + '/' + answers.name + '.csproj'));
      this.fs.copyTpl(this.templatePath('Program.cs'), this.destinationPath(answers.name + '/Program.cs'), {
        ModuleName: answers.name
      });
      answers.architectures.forEach((architecture, index) => {
        this.fs.copyTpl(this.templatePath('DockerFile'), this.destinationPath(answers.name + '/Docker/' + architecture + '/DockerFile'), {
          DLLName: answers.name + '.dll'
        });
      });
    });
  }
};