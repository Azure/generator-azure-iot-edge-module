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
                test: false
            })
            .then(() => {
                assert.file(['TestModule/app.js', 'TestModule/package.json', 'TestModule/package-lock.json', 'TestModule/.npmrc', 'TestModule/Docker/linux-x64/Dockerfile']);
                assert.noFile('Test/test.js');
                assert.noFile('deployment.json');
                assert.noFile('routes.json');
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

    it('should generate routes.json file when select the module type', function () {
        return helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                moduleType: 'routes file'
            })
            .then(() => {
                assert.file('routes.json');
            });
    });
});
