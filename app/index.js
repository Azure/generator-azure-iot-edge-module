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
        "custom module", "deployment file", "routes file"
      ],
      message: "Which one would you like to create?"
    }]).then((answers) => {
      this.moduleType = answers.moduleType;
      if (this.moduleType === 'custom module') {
        this.prompt([{
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
                name: "linux-arm32"
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
        ]).then((props) => {
          this.log('Creating custom module...');
          if (props.test) {
            fs.mkdir(this.destinationPath(props.name + 'Test'));
          }
          this.fs.copyTpl(this.templatePath('app.js'), this.destinationPath(props.name + '/app.js'));
          this.fs.copyTpl(this.templatePath('.npmrc'), this.destinationPath(props.name + '/.npmrc'));
          this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath(props.name + '/package.json'), {
            ModuleName: props.name
          });
          this.fs.copyTpl(this.templatePath('package-lock.json'), this.destinationPath(props.name + '/package-lock.json'), {
            ModuleName: props.name
          });
          props.architectures.forEach((architecture, index) => {
            this.fs.copyTpl(this.templatePath('Dockerfile'), this.destinationPath(props.name + '/Docker/' + architecture + '/Dockerfile'));
          });
        });
      } else if (this.moduleType === 'deployment file') {
        this.log('Creating deployment file...');
        this.fs.copyTpl(this.templatePath('deployment.json'), this.destinationPath('deployment.json'));
      } else if (this.moduleType === 'routes file') {
        this.log('Creating routes file...');
        this.fs.copyTpl(this.templatePath('routes.json'), this.destinationPath('routes.json'));
      }
    });
  }
};