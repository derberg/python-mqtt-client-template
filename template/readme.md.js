import { File, Text } from '@asyncapi/generator-react-sdk';
import { getServiceClientName, getServiceClientDescription, getClientService, getSendFunctions, getReceiveFunctions } from './utils';

export default function ({ asyncapi }) {

  const serviceClientName = getServiceClientName(asyncapi);
  const serviceClientDescription = getServiceClientDescription(asyncapi);
  const clientService = getClientService(asyncapi);
  const sendFunctions = getSendFunctions(asyncapi);
  const receiveFunctions = getReceiveFunctions(asyncapi);

  return (
    <File name="readme.md">
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
        1. Import the {serviceClientName}:
      </Text>

      <Text>
        ```python
      </Text>

      <Text>
        from client import {clientService}
      </Text>

      <Text>
        ```
      </Text>

      <Text newLines={2}>
        2. Create a client instance:
      </Text>

      <Text>
        ```python
      </Text>

      <Text>
        client = {clientService}()
      </Text>

      <Text>
        ```
      </Text>

      <Text newLines={2}>
        3. Client functions :
      </Text>

      <Text>
        ```python
      </Text>

      <Text>
        {sendFunctions}
      </Text>

      <Text>
        {receiveFunctions}
      </Text>

      <Text>
        def loop(self):

        '''This is a blocking form of the network loop and will not return until the client calls disconnect(). It automatically handles reconnecting.'''
        
        self.client.loop_forever()
      </Text>

      <Text>
      ```
      </Text>


    </File>
  );
}
