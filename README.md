# Azure IoT Edge Node.js Module Generator

[![npm](https://img.shields.io/npm/v/generator-azure-iot-edge-module.svg)](https://www.npmjs.com/package/generator-azure-iot-edge-module)

`generator-azure-iot-edge-module` creates a base template to start a new Azure IoT Edge Node.js module

## Install
```
$ npm i -g yo generator-azure-iot-edge-module
```

## Usage
```
$ yo azure-iot-edge-module
```

![](https://raw.githubusercontent.com/Azure/generator-azure-iot-edge-module/master/screenshots/yo.png)

If you prefer one-liner:
```
$ yo azure-iot-edge-module -n <module_name> -r <image_repository>
```

For example:
```
$ yo azure-iot-edge-module -n filterModule -r localhost:5000/filtermodule
```

## Documentation

* [Tutorial: Develop and deploy a Node.js IoT Edge module to your simulated device](https://docs.microsoft.com/en-us/azure/iot-edge/tutorial-node-module)
* [Develop and debug Node.js modules with Azure IoT Edge for Visual Studio Code](https://docs.microsoft.com/en-us/azure/iot-edge/how-to-develop-node-module)
* [Azure IoT Edge](https://docs.microsoft.com/en-us/azure/iot-edge/)

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
