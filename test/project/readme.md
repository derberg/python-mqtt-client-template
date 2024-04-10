# Comments Service Client
The Comments Service defined in the AsyncAPI file processes events using the MQTT protocol to handle different operations such as Send/Publish for comments like and unlike and Receive/Subscribe views.

The Operation Function code includes two primary functions, one to GenerateSendFunctions and the other to GenerateReceiveFunctions. These functions generate operations according to the definition of the AsyncAPI file. These functions will then create the client implementation `client.py`.

The client code creates an MQTT connection with OperationsFunction to generate, send, and receive messages. The generated client code will now interact with the Comments Service using MQTT. In the `test.py` file, the script imports the CommentsService code and creates an activity by randomly sending liked and unliked comments at every second interval. It showcases how the client interacts with the Comments Service API. In a nutshell, the code generator provides a structure of how MQTT interacts with the Comments Service in a Python environment.

## Requirements

- [AsyncAPI CLI](https://github.com/asyncapi/cli)
- Python 3.x
- paho-mqtt 1.6.1
## Generate Code

To generate the code run:

`asyncapi generate fromTemplate https://raw.githubusercontent.com/derberg/python-mqtt-client-template/main/test/fixtures/asyncapi.yml https://github.com/derberg/python-mqtt-client-template --output myclient --force-write --param server=dev`
## Client Generator

For Client generation, in the terminal, run: `npm asyncapi generate fromTemplate test/fixtures/asyncapi.yml ./ --output test/project --force-write --param server=dev`
## Install Paho-MQTT

We have a `requirements.txt` file under the template directory containing the `paho-mqtt` package. To install the package, simply use the following:
` pip install -r requirements.txt `
## Usage

