import { File, Text } from '@asyncapi/generator-react-sdk';
import { getServiceClientName, getServiceClientDescription, getClientClassName, getSendOperations, getReceiveOperations, getFunctionDetails } from '../components/helpers/utils';

export default function ({ asyncapi }) {

  const serviceClientName = getServiceClientName(asyncapi);
  const serviceClientDescription = getServiceClientDescription(asyncapi);
  const clientClassName = getClientClassName(asyncapi);
  const operations = asyncapi.operations();
  const sendOperations = getSendOperations(operations);
  const sendFunctions = getFunctionDetails(sendOperations);
  const receiveOperations = getReceiveOperations(operations);
  const receiveFunctions = getFunctionDetails(receiveOperations);

  return (
    <File name="README.md">
      <Text>
        ## {serviceClientName}
      </Text>

      <Text newLines={2}>
        {serviceClientDescription}
      </Text>

      <Text newLines={2}>
        ## Requirements
      </Text>

      <Text>
        - Python 3.x
      </Text>

      <Text>
        - paho-mqtt 1.6.1
      </Text>

      <Text newLines={2}>
        ## Install Dependencies
      </Text>

      <Text>
        We have a `requirements.txt` file under the template directory containing the `paho-mqtt` package.
        To install the package, simply use the following:
      </Text>

      <Text>
        ```python
      </Text>

      <Text>
        pip install -r requirements.txt
      </Text>

      <Text>
      ```
      </Text>

      <Text newLines={2}>
        ## Usage of {serviceClientName}
      </Text>

      <Text newLines={2}>
        - Import the {serviceClientName}:
      </Text>

      <Text>
        ```python
      </Text>

      <Text>
        from client import {clientClassName}
      </Text>

      <Text>
        ```
      </Text>

      <Text newLines={2}>
        - Create a client instance:
      </Text>

      <Text>
        ```python
      </Text>

      <Text>
        client = {clientClassName}()
      </Text>

      <Text>
        ```
      </Text>

      <Text newLines={2}>
        - Example on how to send messages :
      </Text>

      <Text>
        ```python
      </Text>

      <Text>
        {sendFunctionsExample(sendFunctions)}
      </Text>

      <Text>
        ```
      </Text>

      <Text newLines={2}>
        - Example functions on how to receive messages :
      </Text>

      <Text>
        ```python
      </Text>

      <Text>
        {receiveFunctionExample(receiveFunctions)}
      </Text>

      <Text>
        ```
      </Text>

    </File>
  );
}

function sendFunctionsExample(functions) {
  let content = '';

  functions.forEach(t => {
    content += `
# ${t.summary}
client.${t.functionName}(randomId)
print("Send new message " + str(randomId) + " sent to ${t.topic}")
`
  })
  return content
}

function receiveFunctionExample(functions) {
  let content = '';

  functions.forEach(t => {
    content += `
# ${t.summary}
def read_views_callback(client, user_data, message): 
    '''Subcribes to a topic and adds a message callback to handle received messages.

      client: MQTT client instance that triggers the callback.

      userdata: User data associated with the client.

      message: MQTT message instance representing the received message which contains information such as topic, payload, etc.'''
         
    print("Received message on topic: " + message.topic)
    print("Message: " + str(message.payload.decode()))

client.${t.functionName}(read_views_callback)
`
  })
  return content
}

