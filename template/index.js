import { File, Text } from '@asyncapi/generator-react-sdk';
import { GenerateSendFunctions, GenerateReceiveFunctions } from '../components/OperationFunction';

export default function({ asyncapi, params }) {

  return (
    <File name="client.py">
     
      <Text newLines={2}>
        import paho.mqtt.client as mqtt
      </Text>
         
      <Text newLines={2}>
        mqttBroker = "{ asyncapi.servers().get(params.server).host() }"
      </Text>

      <Text newLines={2}>
        class { asyncapi.info().title().replace(" ", "") }Client:
      </Text>

      <Text indent={2} newLines={2}>
        {`def __init__(self):
            self.client = mqtt.Client()
            self.client.connect(mqttBroker)`}
      </Text>

      <Text indent={2}>
        <GenerateSendFunctions operations = {asyncapi.operations()} />
        <GenerateReceiveFunctions operations =  {asyncapi.operations()} />
      </Text>

            <Text indent={2} newLines={2}>
        {`def loop(self): 
        '''This is a blocking form of the network loop and will not return until the client calls disconnect(). It automatically handles reconnecting.'''
        self.client.loop_forever()`}
      </Text>

    </File>
  );
}
