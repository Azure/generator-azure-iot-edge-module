"user strict";

var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var path = require('path');

describe('generator-azure-iot-edge-module: app', function () {
    it('should generate all custom module files', function () {
        return helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                moduleType: 'custom module',
                name: 'TestModule',
                architectures: ['linux-x64'],
                restore: false,
                test: false
            })
            .then(() => {
                assert.file(['TestModule/app.js', 'TestModule/package.json', 'TestModule/package-lock.json', 'TestModule/.gitignore', 'TestModule/.npmrc', 'TestModule/Docker/linux-x64/Dockerfile']);
                assert.noFile('TestModule//Test/test.js');
                assert.noFile('TestModule/deployment.json');
                assert.noFile('TestModule/routes.json');
            });
    });

    it('should generate test files', function () {
        return helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                moduleType: 'custom module',
                name: 'TestModule',
                architectures: ['linux-x64'],
                restore: false,
                test: true
            })
            .then(() => {
                assert.file(['TestModule/app.js', 'TestModule/package.json', 'TestModule/package-lock.json', 'TestModule/.gitignore', 'TestModule/.npmrc', 'TestModule/Docker/linux-x64/Dockerfile', 'TestModule//Test/test.js']);
                assert.noFile('TestModule/deployment.json');
                assert.noFile('TestModule/routes.json');
            });
    });

    it('should generate deployment.json file when select the module type', function () {
        return helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                moduleType: 'deployment file'
            })
            .then(() => {
                assert.file('deployment.json');
            });
    });
});
