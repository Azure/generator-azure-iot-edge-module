# generator-azure-iot-edge-module

> Scaffolding tool to help setup Azure IoT Edge module development environment.

```
yo azure-iot-edge-module
```

## Getting started

If this is the first time you hear about YEOMAN, make sure to take a look at the [official homepage](http://yeoman.io/) first to see what it is about.

- Make sure you have [node and npm](https://nodejs.org/en/download/ ) installed

- Make sure you have yo installed: npm install -g yo

- Set npm registry: npm config set registry https://www.myget.org/F/generator-azure-iot-edge-module/npm/

- Install the generator: npm install -g generator-azure-iot-edge-module

- Run **yo azure-iot-edge-module**, follow the instructions to set up your azure iot edge module

## Deploy and run the module

azure-iot-edge-module sets up the Azure IoT Edge Module development environment, generating all necessary files for you.

To make the module executable, there are several steps to do.

### Install docker
Ubuntu

https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/

Windows 10

https://download.docker.com/win/stable/InstallDocker.msi

MAC

https://store.docker.com/editions/community/docker-ce-desktop-mac

Now navigate to the generated module folder in the first place.

### Setup azure resources

If you have develop experience with Azure, you could skip this part and go ahead to next one.

1. Create an active Azure account

(If you don't have an account, you can create one [free account](http://azure.microsoft.com/pricing/free-trial/) in minutes.)

2. Create an Azure IoT Hub

Reference [How to create an azure iot hub] (https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-create-through-portal) for step by step guidance.

3. Create a device in azure iot hub

Navigate to your iot hub in azure portal, find the **Device Explorer** to **Add** a device in the portal.
Mark up the device connection string after creating completed.

### Install the edge cli

```
npm install -g edge-explorer@latest --registry http://edgenpm.southcentralus.cloudapp.azure.com/
```
### Install tool to launch Azure IoT Edge

> On Windows, If you have issues on the command line with the --registry command, try to use a PowerShell session

```
npm install -g launch-edge-runtime@latest --registry http://edgenpm.southcentralus.cloudapp.azure.com/
```

### Launch edge runtime and 

Make sure you’re using a device connection string and not IoT Hub connection string if you get the error, “Connection string does not have a DeviceId element. Please supply a *device* connection string and not an Azure IoT Hub connection string.”

```
launch-edge-runtime -c "<IoT Hub device connection string>"
```

Use the edge cli to log into the IoT hub to which your edge device is registered. Note that you need the IoT hub’s owner connection string. You can find this in the Azure Portal by going to your IoT hub -> Shared Access Policies -> iothubowner

```
edge-explorer login "<IoT Hub connection string for iothubowner policy*>"
```

### Build your module

Get back to the directory we just created, you could specify the architecture folder name as you want, build the project:

```
dotnet build
dotnet publish -f netcoreapp2 -o .\Docker\Windows-x64\publish
```

### Create and run local docker registry

```
docker run -d -p 5000:5000 --name registry registry:2
```

### Build docker image for your module
Update the name:tag (localhost:5000/<lower_case_module_name>) with your module name (lower case). Mark up the image name.
```
docker build --build-arg EXE_DIR=./publish -t localhost:5000/<lower_case_module_name>:latest <docker_file_directory>
```

### Push the image to local registry

```
docker push localhost:5000/<lower_case_module_name>
```

### Deploy the module

Deployment is accomplished using the edge cli tool. This tool uses Azure IoT Hub to send deployment information to the edge device.

Update the deployment.json file with the image name marked in previous step. Then run the following command ```
edge-explorer edge deployment create -m <path to deployment file> -d <edge device ID>```

Now we have the sample module deployed and running, you could monitor it with command 
```edge-explorer monitor events <deviceID> --login <iothub connection string not device connection string>```

There will be regular and continuing temperature message show in the console. If not, go back check if each step accomplished correctly.