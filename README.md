# generator-azure-iot-edge-module

> Scaffolding tool to help setup Azure IoT Edge module development environment.

```
yo auzre-iot-edge-module
```

## Getting started

If this is the first time you hear about YEOMAN, make sure to take a look at the [official homepage](http://yeoman.io/) first to see what it is about.

- Make sure you have [node and npm](https://nodejs.org/en/download/ ) installed

- Make sure you have yo installed: npm install -g yo

- Install the generaotr: npm install -g generator-azure-iot-edge-module

- Make sure you have [dotnet core](https://www.microsoft.com/net/core) instaled

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

Now navigate to the genarated module folder in the first place.

### Build your module
```
dotnet build
dotnet publish -f netcoreapp2
```
### Create and run local docker registry
```
docker run -d -p 5000:5000 --name registry resigtry:2
```
### Build docker image for your module
```
docker build --build-arg EXE_DIR=./bin/Debug/netcoreapp2/publish -t localhost:5000/<moduleName>:latest .
```
### Push the image to local registry
```
docker push localhost:5000/<moduleName>
```
