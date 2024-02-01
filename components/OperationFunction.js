//Generates and returns a string containing send functions based on provided operations in the yaml file.

export function GenerateSendFunctions({ operations }) {
  const sendOperations = Array.from(operations).filter(op => op.isSend());
  const sendDetails = getFunctionDetails(sendOperations, "send");
  let functions = '';

  sendDetails.forEach(t => {
    // Generate send function 
    functions += `def ${t.functionName}(self, id):
        topic = "${t.topic}"
        self.client.publish(topic, id)\n`;
  });

  return functions;
}

//Generates and returns a string containing receive functions based on provided operations in the yaml file.

export function GenerateReceiveFunctions({ operations }) {
  const receiveOperations = Array.from(operations).filter(op => op.isReceive());
  const receiveDetails = getFunctionDetails(receiveOperations, "receive");
  let functions = '';

  receiveDetails.forEach(t => {
    // Generate receive function
    functions += `def ${t.functionName}(self, callback):
        topic = "${t.topic}"
        self.client.subscribe(topic)
        self.client.message_callback_add(topic, callback)\n`;
  });
  
  return functions;
}

//     Capitalizes the first letter of each word in a given string. Follows the camelCase rule.
function capitalizeWords(str) {
  return str.split('/').map(word => word.charAt(0).toLowerCase() + word.slice(1)).join('');
}

// Extracts and returns functionName and topic from a list of operations.

function getFunctionDetails(operations) {
  const details = [];

  operations.forEach(operation => {
    const topic = {};

      const capitalizedName = capitalizeWords(operation.operationId() || operation.id());
      topic.functionName = capitalizedName;
      const channel = operation.channels();
      topic.topic = channel[0].address();

      details.push(topic);
  });

  return details;
}



// asyncapi generate fromTemplate test/fixtures/asyncapi.yml ./ --output test2/project --force-write --param server=dev