import { Progress } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
export type Literal = boolean | null | number | string | undefined;
export type SerializableValue = Literal | SerializableValue[] | {
    [key: string]: SerializableValue;
};
export declare const McpRequestSchema: z.ZodUnion<readonly [z.ZodObject<{
    method: z.ZodLiteral<"tools/call">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
            "io.modelcontextprotocol/related-task": z.ZodOptional<z.ZodObject<{
                taskId: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$loose>>;
        task: z.ZodOptional<z.ZodObject<{
            ttl: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        name: z.ZodString;
        arguments: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"resources/read">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
            "io.modelcontextprotocol/related-task": z.ZodOptional<z.ZodObject<{
                taskId: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$loose>>;
        uri: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    method: z.ZodLiteral<"prompts/get">;
    params: z.ZodObject<{
        _meta: z.ZodOptional<z.ZodObject<{
            progressToken: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
            "io.modelcontextprotocol/related-task": z.ZodOptional<z.ZodObject<{
                taskId: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$loose>>;
        name: z.ZodString;
        arguments: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>]>;
export type McpRequest = z.infer<typeof McpRequestSchema>;
export type Context = {
    reportProgress: (progress: Progress) => Promise<void>;
    log: {
        debug: (message: string, data?: SerializableValue) => void;
        error: (message: string, data?: SerializableValue) => void;
        info: (message: string, data?: SerializableValue) => void;
        warn: (message: string, data?: SerializableValue) => void;
    };
    mcpServer: McpServer;
    mcpRequest: McpRequest;
};
//# sourceMappingURL=mcp-tool.interface.d.ts.map