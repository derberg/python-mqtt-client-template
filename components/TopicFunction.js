/*
 * This component returns a blok of functions that user can use to send messages to specific topic.
 * As input it requires a list of Channel models from the parsed AsyncAPI document
 */ 
export function TopicFunction({ channels }) {

    const topicsDetails = getTopics(channels);
    let functions = '';

topicsDetails.forEach(t => {
    let functionName = '';
    if (t.name) {
        functionName = t.name.charAt(0).toUpperCase() + t.name.slice(1);
    } else {
        functionName = t.topic.split('/').pop().replace(/[^a-zA-Z0-9]/g, '');
    }

    functions += `def send${functionName}(self, id):
        topic = "${t.topic}"
        self.client.publish(topic, id)\n`;
});

return functions;

}

/*
 * This function returns a list of objects, one for each channel with two properties, name and topic
 * name - holds information about the operationId provided in the AsyncAPI document
 * topic - holds information about the address of the topic
 * 
 * As input it requires a list of Channel models from the parsed AsyncAPI document
 */ 


function getTopics(channels) {
    const channelsCanSendTo = channels;
    let topicsDetails = [];

    channelsCanSendTo.forEach(ch => {
      const topic = {};
      const operation = ch.operations().filterByReceive()[0];
  
      if (operation.hasOperationId()) {
          topic.name = operation.id();
      } else {
          topic.name = null;
      }
  
      topic.topic = ch.address();
  
      topicsDetails.push(topic);
  });
  
  return topicsDetails;
  
}

/*
 * getTopics checks if there is an operation and an id.
 * If there isn't any operatonId it fallsback to using channel name to generate a topic name
 */ 