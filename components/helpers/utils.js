import { GenerateSendFunctions, GenerateReceiveFunctions } from '../OperationFunction';

// Function to generate service client name
export const getServiceClientName = (asyncapi) => {
    return `${asyncapi.info().title()} Client`;
  };
  
// Function to generate service client description
export const getServiceClientDescription = (asyncapi) => {
    return `${asyncapi.info().description()}`;
  };
  
// Function to import client service
export const getClientClassName = (asyncapi) => {
    return `${ asyncapi.info().title().replace(" ", "") }Client`
  };

// Returns functionName
export function getFunctionName(operation) {

  const str = operation.operationId() || operation.id();
  return str.split('/').map(word => word.charAt(0).toLowerCase() + word.slice(1)).join('');
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