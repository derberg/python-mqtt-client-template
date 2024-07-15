const path = require('path');
const Generator = require('@asyncapi/generator');
const { readFile } = require('fs').promises;

const MAIN_TEST_RESULT_PATH = path.join('test', 'IntegrationSnaps', 'TestResults');
const ASYNCAPI_FILE_PATH = path.resolve(__dirname, 'fixtures/asyncapi.yml');

describe('template integration test using generator', () => {
  const generateFolderName = () => {
    return path.resolve(MAIN_TEST_RESULT_PATH, Date.now().toString());
  };

  jest.setTimeout(30000);

  it('should generate application files', async () => {
    const outputDir = generateFolderName();
    const params = {
      server: 'dev'
    };
    const generator = new Generator(path.normalize('./'), outputDir, {
      forceWrite: true,
      templateParams: params
    });
    await generator.generateFromFile(ASYNCAPI_FILE_PATH);

    const expectedFiles = [
      'client.py',
      'README.md'
    ];

    for (const index in expectedFiles) {
      const file = await readFile(path.join(outputDir, expectedFiles[index]), 'utf8');
      expect(file).toMatchSnapshot();
    }
  });
});