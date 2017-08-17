# generator-azure-iot-edge-module

> Scaffolding tool to help setup Azure IoT Edge module development environment.

```
yo auzre-iot-edge-module
```

## Getting started

If this is the first time you hear about YEOMAN, make sure to take a look at the [official homepage](http://yeoman.io/) first to see what it is about.

- Make sure you have [node and npm](https://nodejs.org/en/download/ ) installed

- Make sure you have yo installed: npm install -g yo

- Set npm registry: npm config set registry https://www.myget.org/F/generator-azure-iot-edge-module/npm/

- Install the generator: npm install -g generator-azure-iot-edge-module

- Make sure you have [dotnet core](https://www.microsoft.com/net/core) installed

- Run **yo azure-iot-edge-module**

## Containerize the module

azure-iot-edge-module sets up the Azure IoT Edge Module development environment, generating all necessary files for you.

To containerize the module, there are several extra steps to do.

### Install Docker 
Ubuntu

https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/

Windows 10

https://download.docker.com/win/stable/InstallDocker.msi

MAC

https://store.docker.com/editions/community/docker-ce-desktop-mac

Now navigate to the generated module folder in the first place.

### Build your module

You could change the output folder by the architecture folder name you want:

```
dotnet build
dotnet publish -f netcoreapp2 -o .\Docker\Windows-x64\publish
```
### Create and run local docker registry
```
docker run -d -p 5000:5000 --name registry resigtry:2
```
### Build docker image for your module
```
docker build --build-arg EXE_DIR=./publish -t localhost:5000/<lower_case_module_name>:latest <docker_file_directory>
```
### Push the image to local registry
```
docker push localhost:5000/<lower_case_module_name>
```
