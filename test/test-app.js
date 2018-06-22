'use strict';

var assert = require('yeoman-assert');
var fs = require('fs');
var helpers = require('yeoman-test');
var path = require('path');

describe('generator-azure-iot-edge-module: app', function () {
    it('should generate module files with prompts', function () {
        return helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                name: 'TestModule',
                repository: 'localhost:5555/TestModule'
            })
            .then(() => {
                assert.file([
                    'TestModule/.gitignore',
                    'TestModule/app.js',
                    'TestModule/Dockerfile',
                    'TestModule/Dockerfile.arm32v7',
                    'TestModule/Dockerfile.windows-amd64',
                    'TestModule/module.json',
                    'TestModule/package.json'
                ]);

                assert.jsonFileContent('TestModule/module.json', JSON.parse(fs.readFileSync(path.join(__dirname, 'assets/module.json'), 'utf-8')));
                assert.jsonFileContent('TestModule/package.json', JSON.parse(fs.readFileSync(path.join(__dirname, 'assets/package.json'), 'utf-8')));
            });
    });

    it('should generate module files with options', function () {
        return helpers.run(path.join(__dirname, '../app'))
            .withOptions({
                name: 'TestModule',
                repository: 'localhost:5555/TestModule'
            })
            .then(() => {
                assert.file([
                    'TestModule/.gitignore',
                    'TestModule/app.js',
                    'TestModule/Dockerfile',
                    'TestModule/Dockerfile.arm32v7',
                    'TestModule/Dockerfile.windows-amd64',
                    'TestModule/module.json',
                    'TestModule/package.json'
                ]);

                assert.jsonFileContent('TestModule/module.json', JSON.parse(fs.readFileSync(path.join(__dirname, 'assets/module.json'), 'utf-8')));
                assert.jsonFileContent('TestModule/package.json', JSON.parse(fs.readFileSync(path.join(__dirname, 'assets/package.json'), 'utf-8')));
            });
    });
});
