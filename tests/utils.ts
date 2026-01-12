import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { ElicitRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import path from 'node:path';
import process from 'node:process';
import type {
  ContentBlock,
  BlobResourceContents,
  TextResourceContents,
} from '@modelcontextprotocol/sdk/types.js';

export function getTextFromContentBlock(block: ContentBlock): string {
  if (block.type !== 'text') {
    throw new Error(`Expected text content block, got '${block.type}'`);
  }
  return block.text;
}

export function getTextFromResourceContents(
  contents: TextResourceContents | BlobResourceContents,
): string {
  if ('text' in contents) {
    return contents.text;
  }

  throw new Error('Expected text resource contents, got blob');
}

/**
 * Creates and connects a new MCP (Model Context Protocol) client for testing
 *
 * @param port - The port number to connect to on localhost
 * @param sseArgs - Optional configuration for the SSE transport connection. Can include eventSourceInit and requestInit options.
 * @returns A connected MCP Client instance
 * @example
 * ```ts
 * const client = await createMCPClient(3000, {
 *   requestInit: {
 *     headers: {
 *       Authorization: 'Bearer token'
 *     }
 *   }
 * });
 * ```
 */
export async function createSseClient(
  port: number,
  sseArgs: {
    eventSourceInit?: EventSourceInit;
    requestInit?: RequestInit;
  } = {},
): Promise<Client> {
  const client = new Client(
    { name: 'example-client', version: '1.0.0' },
    {
      capabilities: {},
    },
  );
  const sseUrl = new URL(`http://localhost:${port}/sse`);
  const transport = new SSEClientTransport(sseUrl, sseArgs);
  await client.connect(transport);
  return client;
}

/**
 * Creates and connects a new MCP (Model Context Protocol) client using Streamable HTTP for testing
 *
 * @param port - The port number to connect to on localhost
 * @param options - Optional configuration options for the streamable HTTP client
 * @returns A connected MCP Client instance
 * @example
 * ```ts
 * const client = await createStreamableMCPClient(3000, {
 *   requestInit: {
 *     headers: {
 *       'any-header': 'any-value'
 *     }
 *   }
 * });
 * ```
 */
export async function createStreamableClient(
  port: number,
  options: {
    endpoint?: string;
    requestInit?: RequestInit;
  } = {},
): Promise<Client> {
  const endpoint = options.endpoint || '/mcp';
  const client = new Client(
    { name: 'example-client', version: '1.0.0' },
    {
      capabilities: {},
    },
  );
  const url = new URL(`http://localhost:${port}${endpoint}`);
  const transport = new StreamableHTTPClientTransport(url, {
    requestInit: options.requestInit,
  });
  await client.connect(transport);
  return client;
}

/**
 * Creates and connects a new MCP (Model Context Protocol) client using STDIO for testing
 *
 * @param serverScriptPath - The path to the server script to run.
 * @param options - Optional configuration options for the stdio client transport.
 * @returns A connected MCP Client instance
 * @example
 * ```ts
 * const client = await createStdioClient('path/to/server.ts');
 * ```
 */
export async function createStdioClient(options: {
  serverScriptPath: string;
}): Promise<Client> {
  const client = new Client(
    { name: 'example-stdio-client', version: '1.0.0' },
    {
      capabilities: {},
    },
  );

  // NOTE: Avoid spawning the Windows `ts-node-dev.cmd` shim via PATH.
  // Spawning `node <bin.js>` is much easier to terminate cleanly in Jest.
  const tsNodeDevBin = path.join(
    process.cwd(),
    'node_modules',
    'ts-node-dev',
    'lib',
    'bin.js',
  );

  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [
      tsNodeDevBin,
      '--transpile-only',
      '--exit-child',
      '--',
      options.serverScriptPath,
    ],
  });

  await client.connect(transport);
  return client;
}

/**
 * Creates and connects a new MCP client with elicitation capabilities for testing
 *
 * @param port - The port number to connect to on localhost
 * @param sseArgs - Optional configuration for the SSE transport connection
 * @returns A connected MCP Client instance with elicitation support
 */
export async function createSseClientWithElicitation(
  port: number,
  sseArgs: {
    eventSourceInit?: EventSourceInit;
    requestInit?: RequestInit;
  } = {},
): Promise<Client> {
  const client = new Client(
    { name: 'example-client-elicitation', version: '1.0.0' },
    {
      capabilities: {
        elicitation: {},
      },
    },
  );

  // Set up elicit request handler
  client.setRequestHandler(ElicitRequestSchema, (params) => ({
    action: 'accept',
    content: {
      surname: params.params.message.includes('name')
        ? 'TestSurname'
        : undefined,
    },
  }));

  const sseUrl = new URL(`http://localhost:${port}/sse`);
  const transport = new SSEClientTransport(sseUrl, sseArgs);
  await client.connect(transport);
  return client;
}

/**
 * Creates and connects a new MCP client using Streamable HTTP with elicitation capabilities for testing
 *
 * @param port - The port number to connect to on localhost
 * @param options - Optional configuration options for the streamable HTTP client
 * @returns A connected MCP Client instance with elicitation support
 */
export async function createStreamableClientWithElicitation(
  port: number,
  options: {
    endpoint?: string;
    requestInit?: RequestInit;
  } = {},
): Promise<Client> {
  const endpoint = options.endpoint || '/mcp';
  const client = new Client(
    { name: 'example-client-elicitation', version: '1.0.0' },
    {
      capabilities: {
        elicitation: {},
      },
    },
  );

  // Set up elicit request handler
  client.setRequestHandler(ElicitRequestSchema, (params) => ({
    action: 'accept',
    content: {
      surname: params.params.message.includes('name')
        ? 'TestSurname'
        : undefined,
    },
  }));

  const url = new URL(`http://localhost:${port}${endpoint}`);
  const transport = new StreamableHTTPClientTransport(url, {
    requestInit: options.requestInit,
  });
  await client.connect(transport);
  return client;
}
