# Changelog

[![npm](https://img.shields.io/npm/v/generator-azure-iot-edge-module.svg)](https://www.npmjs.com/package/generator-azure-iot-edge-module)

## 1.5.0 - 2020-03-27
### Added
* Add support for arm64v8 platform

## 1.4.0 - 2019-03-28
### Changed
* Use lowercase letter for package name

## 1.3.0 - 2018-12-03
### Changed
* Add `EXPOSE` for debug Dockerfiles
* Use caret version range for Azure IoT Hub Node.js SDK

### Removed
* Windows container Dockerfiles due to base image's incompatibility with Windows 10 version 1809

## 1.2.0 - 2018-08-16
### Changed
* Preserve the case of input repository

## 1.1.0 - 2018-07-20
### Changed
* Update sample code to fail fast when error creating module clients and connecting to Edge
