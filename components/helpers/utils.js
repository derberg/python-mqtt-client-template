import { convertChannelToFilename } from './channel-topics';

// Function to generate service client name
export function getServiceClientName(asyncapi) {
    return `${asyncapi.info().title()} Client`;
  };
  
// Function to generate service client description
export function getServiceClientDescription(asyncapi) {
    const hasDesc = asyncapi.info().hasDescription();
    const description = hasDesc ? `${asyncapi.info().description()}` : '';
    return description;
  };
  
// Function to import client service
export function getClientClassName(asyncapi) {
    return `${ asyncapi.info().title().replace(" ", "") }Client`
  };

// Returns functionName
export function getFunctionName(operation) {
  const hasOpId = operation.hasOperationId();
  const operationId = hasOpId ? operation.operationId() : convertChannelToFilename(operation.id()); // convertChannelToFilename is used when operationId is not available
  return operationId;
}

// Extracts and returns topic from a list of operations.
export function getFunctionDetails(operations) {
  const details = [];
  operations.forEach(operation => {
    const topic = {};

      topic.functionName = getFunctionName(operation);
      const channel = operation.channels();
      topic.topic = channel[0].address();
      topic.summary = operation.summary();

      details.push(topic);
  });

  return details;
}

// Function to generate send functions for operations
export function getSendOperations(operations) {
  return Array.from(operations).filter(op => op.isSend());
}

// Function to generate receive function for operations  
export function getReceiveOperations(operations) {
  return Array.from(operations).filter(op => op.isReceive());
}