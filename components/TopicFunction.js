/*
 * This component returns a blok of functions that user can use to send messages to specific topic.
 * As input it requires a list of channel models from the parsed AsyncAPI document

*/

export function TopicFunction({ channels }) {
  const sendDetails = getFunctionDetails(channels, "send");
  const receiveDetails = getFunctionDetails(channels, "receive");
  let functions = '';

  sendDetails.forEach(t => {
    // Generate a subscribe/send function
    functions += `def ${t.functionName}(self, callback):
        topic = "${t.topic}"
        self.client.subscribe(topic)
        self.client.message_callback_add(topic, callback)\n`;
    });

  receiveDetails.forEach(t => { 
    // Generate a publish/receive function for the same topic
    functions += `def ${t.functionName}(self, id):
        topic = "${t.topic}"
        self.client.publish(topic, id)\n`;
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

function getFunctionDetails(channels, operationType) {
  const channelsList = channels;
  let details = [];

  channelsList.forEach(ch => {
    const topic = {};
    const operation = operationType === "send" ? ch.operations().filterBySend()[0] : ch.operations().filterByReceive()[0];
    //const operation = ch.operations[0];

    let capitalizedName = '';

    if (operation && operation.hasOperationId()) {
      capitalizedName = capitalizeWords(operation.id());
    } else {
      capitalizedName = capitalizeWords(ch.address());
    }

    topic.functionName = operationType + capitalizedName;
    topic.topic = ch.address();

    details.push(topic);
  });

  return details;
}

