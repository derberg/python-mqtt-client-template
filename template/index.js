import { File, Text } from '@asyncapi/generator-react-sdk';
import { TopicFunction } from '../components/TopicFunction';

export default function({ asyncapi, params }) {

  return (
    <File name="client.py">
     
      <Text newLines={2}>
        import paho.mqtt.client as mqtt
      </Text>
         
      <Text newLines={2}>
        mqttBroker = "{ asyncapi.servers().get(params.server).url() }"
      </Text>

      <Text newLines={2}>
        class { asyncapi.info().title().replaceAll(" ", "") }Client:
      </Text>

      <Text indent={2} newLines={2}>
        {`def __init__(self):
            self.client = mqtt.Client()
            self.view_count = 0
            self.subscribe("comment/views")
            self.client.connect(mqttBroker)`}
      </Text>

      <Text indent={2}>
        <TopicFunction
          channels={asyncapi.channels().filterByReceive()}
        />
      </Text>

      <Text indent={2} newLines={2}>
        {`def on_message(self, client, userdata, message):
            topic = message.topic
            payload = message.payload.decode("utf-8")
            if topic == "comment/views":
              self.view_count += 1`}
      </Text>

      <Text indent={2} newLines={2}>
        {`def subscribe(self, topic):
            self.client.subscribe(topic)
            self.client.on_message = self.on_message`}
      </Text>

    </File>
  );
}