/*
 * This component returns a blok of functions that user can use to send messages to specific topic.
 * As input it requires a list of Channel models from the parsed AsyncAPI document
 */ 
export function TopicFunction({ channels }) {

    const topicsDetails = getTopics(channels);
    let functions = '';

    topicsDetails.forEach(t => {
      functions += `def send${ t.name }(self, id):
        topic = "${t.topic}"
        self.client.publish(topic, id)\n`
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
      const operationId = ch.operations().filterByReceive()[0].id();
      topic.name = operationId.charAt(0).toUpperCase() + operationId.slice(1);
      topic.topic = ch.address();

      topicsDetails.push(topic);
    });

    return topicsDetails;
}