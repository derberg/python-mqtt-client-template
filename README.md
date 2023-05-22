- [Overview](#overview)
- [Technical requirements](#technical-requirements)
- [Specification requirements](#specification-requirements)
- [Supported protocols](#supported-protocols)
- [How to use the template](#how-to-use-the-template)
- [Template configuration](#template-configuration)
- [Development](#development)

## Overview

This template generates MQTT Python client module. Its purpose is to abstract for the application client technical information about the broker and the names of topics it should use. Instead, it generates a module that provides a set of indent-driven functions that one can invoke to send a message to the application through the message broker.

Currently it is capable only to generate a functions for sending messages, there is not code generation for functions that are designed to subscribe and listen for messages.

## Technical requirements

1.10.0 =< [Generator](https://github.com/asyncapi/generator/) < 2.0.0

## Specification requirements

The table contains information on parts of the specification required by this template to generate the proper output.

Property name | Reason | Fallback | Default
---|---|---|---
`channels.{channel}.{operation}.operationId` | To generate function names it is required to specify them in AsyncAPI document through `operationId` field.  | - | -

## Supported protocols

MQTT

## How to use the template

Install [AsyncAPI CLI](https://github.com/asyncapi/cli) and generate code:

```bash
asyncapi generate fromTemplate myAsyncapi.yml https://github.com/derberg/python-mqtt-client-template --output test/project --force-write --param server=dev
```

You can also clone this template locally and run `npm test` to check it in action based on examples. Just remember to use some client to verify if tests are really sending messages to the broker:

```bash
docker run hivemq/mqtt-cli sub -t comment/liked -h test.mosquitto.org
```

## Template configuration

You can configure this template by passing different parameters in the AsyncAPI CLI: `-p PARAM1_NAME=PARAM1_VALUE PARAM2_NAME=PARAM2_VALUE`

Name | Description | Required | Default | Allowed Values | Example
---|---|---|---|---|---
|server|The server you want to use in the code.|Yes| - | - | `production`|

## Development

The most straightforward command to generate code on local during development is:
```bash
asyncapi generate fromTemplate test/fixtures/asyncapi.yml ./ --output test/project --force-write --param server=dev
```

For local development, you need different variations of this command. First of all, you need to know about three important CLI flags:
- `--debug` enables the debug mode in Nunjucks engine what makes filters debugging simpler. 
- `--watch-template` enables a watcher of changes that you make in the template. It regenerates your template whenever it detects a change.
- `--install` enforces reinstallation of the template.