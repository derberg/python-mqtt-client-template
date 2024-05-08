import { File, Text } from '@asyncapi/generator-react-sdk';
import { GenerateSendFunctions, GenerateReceiveFunctions } from '../components/OperationFunction';

export default function({ asyncapi, params }) {

  const className = `${ asyncapi.info().title().replace(" ", "") }Client`;
  const classDescription = asyncapi.info().description();
  const operations = asyncapi.operations();

  return (
    <File name="client.py">
     
      <Text newLines={2}>
        import paho.mqtt.client as mqtt
      </Text>
         
      <Text newLines={2}>
        mqttBroker = "{ asyncapi.servers().get(params.server).host() }"
      </Text>

      <Text newLines={2}>
        class { className }:
      </Text>

      <Text indent={2}>
        {`'''${classDescription}'''`}
      </Text>

      <Text indent={2} newLines={2}>
        {`def __init__(self):
            self.client = mqtt.Client()
            self.client.connect(mqttBroker)`}
      </Text>

      <Text indent={2}>
        <GenerateSendFunctions operations = {operations} className = {className}/>
        <GenerateReceiveFunctions operations =  {operations} className = {className}/>
      </Text>

            <Text indent={2} newLines={2}>
        {`def loop(self): 
        '''This is a blocking form of the network loop and will not return until the client calls disconnect(). It automatically handles reconnecting.'''
        self.client.loop_forever()`}
      </Text>

    </File>
  );
}
