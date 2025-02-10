import { 
    getServiceClientName, 
    getServiceClientDescription, 
    getClientClassName, 
    getFunctionName, 
    getFunctionDetails, 
    getSendOperations, 
    getReceiveOperations 
} from '../components/helpers/utils'; 

describe('Service Client Helpers', () => {
    const mockAsyncAPI = {
        info: jest.fn(() => ({
            title: jest.fn(() => 'TestService'),
            description: jest.fn(() => 'Test Service Description'),
            hasDescription: jest.fn(() => true)
        })),
    };

    const mockAsyncAPIWithoutDesc = {
        info: jest.fn(() => ({
            title: jest.fn(() => 'TestService'),
            description: jest.fn(() => undefined),
            hasDescription: jest.fn(() => false)
        })),
    };

    const mockOperations = [
        { 
            hasOperationId: jest.fn(() => true),
            operationId: jest.fn(() => 'sendTestOperation'), 
            id: jest.fn(() => 'sendTestOperation'),
            channels: jest.fn(() => [{ address: jest.fn(() => 'test/topic') }]), 
            summary: jest.fn(() => 'Test Operation Summary'),
            isSend: jest.fn(() => true),
            isReceive: jest.fn(() => false),
        },
        {
            hasOperationId: jest.fn(() => true),
            operationId: jest.fn(() => 'receiveTestOperation'),
            id: jest.fn(() => 'receiveTestOperation'),
            channels: jest.fn(() => [{ address: jest.fn(() => 'test/topic') }]),
            summary: jest.fn(() => 'Test Operation Summary'),
            isSend: jest.fn(() => false),
            isReceive: jest.fn(() => true),
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getServiceClientName', () => {
        it('should return the correct service client name', () => {
            const result = getServiceClientName(mockAsyncAPI);
            expect(result).toEqual('TestService Client');
        });
    });

    describe('getServiceClientDescription', () => {
        it('should return the correct service client description', () => {
            const result = getServiceClientDescription(mockAsyncAPI);
            expect(result).toEqual('Test Service Description');
        });

        it('should return empty string if no description provided', () => {
            const result = getServiceClientDescription(mockAsyncAPIWithoutDesc);
            expect(result).toEqual('');
        });
    });

    describe('getClientClassName', () => {
        it('should return the correct client class name', () => {
            const result = getClientClassName(mockAsyncAPI);
            expect(result).toEqual('TestServiceClient');
        });
    });

    describe('getFunctionName', () => {
        it('should return the correct function name for a given operation', () => {
            const result = getFunctionName(mockOperations[0]);
            expect(result).toEqual('sendTestOperation');
        });

        it('should return the correct function name using convertChannelToFilename if operationId is not available', () => {
            mockOperations[0].hasOperationId.mockReturnValue(false);
            const result = getFunctionName(mockOperations[0]);
            expect(result).toEqual('sendTestOperation');
        });
    });

    describe('getFunctionDetails', () => {
        it('should return the correct function details for operations', () => {
            const result = getFunctionDetails(mockOperations);
            expect(result).toEqual([
                { functionName: 'sendTestOperation', topic: 'test/topic', summary: 'Test Operation Summary' },
                { functionName: 'receiveTestOperation', topic: 'test/topic', summary: 'Test Operation Summary' }
            ]);
        });
    });

    describe('getSendOperations', () => {
        it('should return only send operations', () => {
            const result = getSendOperations(mockOperations);
            expect(result).toHaveLength(1);
            expect(result[0].operationId()).toEqual('sendTestOperation');
        });
    });

    describe('getReceiveOperations', () => {
        it('should return only receive operations', () => {
            const result = getReceiveOperations(mockOperations);
            expect(result).toHaveLength(1);
            expect(result[0].operationId()).toEqual('receiveTestOperation');
        });
    });
});
