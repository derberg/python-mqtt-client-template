import { GenerateSendFunctions, GenerateReceiveFunctions } from '../components/OperationFunction';

// Function to generate service client name
export const getServiceClientName = (asyncapi) => {
    return `${asyncapi.info().title()} Client`;
  };
  
  // Function to generate service client description
  export const getServiceClientDescription = (asyncapi) => {
    return `${asyncapi.info().description()}`;
  };
  
  // Function to import client service
  export const getClientService = (asyncapi) => {
    return `${ asyncapi.info().title().replace(" ", "") }Client`
  };

// Function to generate send functions for operations
export const getSendFunctions = (asyncapi) => {
    return <GenerateSendFunctions operations={asyncapi.operations()} />;
  };

export const getReceiveFunctions = (asyncapi) => {
    return <GenerateReceiveFunctions operations={asyncapi.operations()} />;
  };

  