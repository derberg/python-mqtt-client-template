//Generates and returns a string containing send functions based on provided operations in the asyncapi file.

export function GenerateSendFunctions({ operations, className }) {
  const sendOperations = Array.from(operations).filter(op => op.isSend());
  const sendDetails = getFunctionDetails(sendOperations);
  let functions = '';

  sendDetails.forEach(t => {
    // Send a message to the MQTT broker on whether a comment is liked or unliked by someone.
    functions += `def ${t.functionName}(self, id):
    """

    ${t.summary}

    Args:

      self: ${className}

      id (str) : Comment ID
    
    """
    topic = "${t.topic}"
    self.client.publish(topic, id)\n`;
  });

  return functions;
}

// Generates and returns a string containing receive functions based on provided operations in the asyncapi file.

export function GenerateReceiveFunctions({ operations, className}) {
  const receiveOperations = Array.from(operations).filter(op => op.isReceive());
  const receiveDetails = getFunctionDetails(receiveOperations);
  let functions = '';

  receiveDetails.forEach(t => {
    // Generate receive function
    functions += `def ${t.functionName}(self, callback):
    """

    ${t.summary}

    Args:

      self: ${className}

      callback: Callback function to handle received messages
    
    Callback Args:
    
      client: MQTT client instance that triggers the callback.

      userdata: User data associated with the client. It's set when the client is created.

      message: MQTT message instance representing the received message. It contains information such as topic, payload, etc.

    """
    topic = "${t.topic}"
    self.client.subscribe(topic)
    self.client.message_callback_add(topic, callback)\n`;
  });
  
  return functions;
}

// Capitalizes the first letter of each word in a given string. Follows the camelCase rule.

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
      topic.summary = operation.summary();

      details.push(topic);
  });

  return details;
}




// asyncapi generate fromTemplate test/fixtures/asyncapi.yml ./ --output test2/project --force-write --param server=dev

/* Code Explanation:

The Comments Service defined in the AsyncAPI file processes events using the MQTT protocol
to handle different operations such as Send/Publish for comments like and unlike and Receive/Subscribe views.

OperactionFunction code includes two major functions one to GenerateSendFunctions and the other to GenerateReceiveFunctions.
These functions generate send and receive according to the definition of the AsyncAPI file. These functions will then create the client 
implementation `client.py`

The client code sets up an MQTT connection with OperationsFunction to generate send and receiving messages. 
The genereated client code will now interact with Comments Service using MQTT.

In the test.py file, the script imports the CommentsService code and creates an activity by randomly sending comments liked and unlikes at
every second interval. It showcases how the client interacts with the Comments Service API.

In a nutshell, the code generator provides a structure of how MQTT interacts with Comments Service in a Python enviroment.

*/
