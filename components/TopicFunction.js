/*
 * This component returns a blok of functions that user can use to send messages to specific topic.
 * As input it requires a list of channel models from the parsed AsyncAPI document

*/

export function TopicFunction({ channels }) {
  const topicsDetails = getFunctionDetails(channels);
  let functions = '';

  topicsDetails.forEach(t => {

    // Check if the topic is 'comment/views'
    if (t.topic === 'comment/views') {
      // Generate a subscribe function for 'comment/views' topic
      functions += `def ${t.subscribefunctionName}(self, callback):
        topic = "${t.topic}"
        self.client.subscribe(topic)
        self.client.message_callback_add(topic, callback)\n`;
    } else {
      // Generate a publish function for other topics
      functions += `def ${t.sendfunctionName}(self, id):
        topic = "${t.topic}"
        self.client.publish(topic, id)\n`;
    }
  });

  return functions;
}


/* the function takes a string and capitalizes the words after the first '/'
*/

function capitalizeWords(str) {
  return str.split('/').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

/*
* This function returns a list of objects, one for each channel with two properties, functionName and topic
* functionName - holds the name of the function built from operationId or channel address if operationId is missing
* topic - holds information about the address of the topic
* 
* As input it requires a list of channels properties from the parsed AsyncAPI document
*/ 

function getFunctionDetails(channels) {
  const channelsCanSendTo = channels;
  let topicsDetails = [];

  channelsCanSendTo.forEach(ch => {
    const topic = {};
    const operation = ch.operations().filterByReceive()[0];

    let capitalizedName = '';

    if (operation.hasOperationId()) {
      capitalizedName = capitalizeWords(operation.id());
    } else {
      capitalizedName = capitalizeWords(ch.address());
    }

    topic.sendfunctionName = "send" + capitalizedName;
    topic.subscribefunctionName = "subscribe" + capitalizedName;
    topic.topic = ch.address();

    topicsDetails.push(topic);
  });

  return topicsDetails;
}

