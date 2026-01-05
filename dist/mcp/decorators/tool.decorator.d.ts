import { z } from 'zod';
import { ToolAnnotations as SdkToolAnnotations } from '@modelcontextprotocol/sdk/types.js';
export interface ToolMetadata {
    name: string;
    description: string;
    parameters?: z.ZodType<any>;
    outputSchema?: z.ZodType<any>;
    annotations?: SdkToolAnnotations;
    _meta?: Record<string, any>;
}
export interface ToolAnnotations extends SdkToolAnnotations {
}
export interface ToolOptions {
    name?: string;
    description?: string;
    parameters?: z.ZodType<any>;
    outputSchema?: z.ZodType<any>;
    annotations?: ToolAnnotations;
    _meta?: Record<string, any>;
}
export declare const Tool: (options: ToolOptions) => import("@nestjs/common").CustomDecorator<string>;
//# sourceMappingURL=tool.decorator.d.ts.map