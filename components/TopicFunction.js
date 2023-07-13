/*
 * This component returns a blok of functions that user can use to send messages to specific topic.
 * As input it requires a list of Channel models from the parsed AsyncAPI document

*/
export function TopicFunction({ channels }) {
    const topicsDetails = getTopics(channels);
    let functions = '';
  
    topicsDetails.forEach(t => {
      const functionName = t.functionName;
  
      functions += `def send${capitalizeWords(functionName)}(self, id):
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
        topic.functionName = capitalizeWords(operation.id());
      } else {
        topic.functionName = ch.address().split('/').pop().replace(/[^a-zA-Z0-9]/g, '');
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
  
  function capitalizeWords(str) {
    return str.split('/').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  }

  /* the function takes a string and capitalizes the words after the first '/'
  */