import { z } from 'zod';

/**
 * Converts a Zod schema to JSON Schema format, supporting both Zod v3 and v4.
 *
 * In Zod v4, schemas have a native `toJSONSchema()` method.
 * For Zod v3, we fall back to the `zod-to-json-schema` package.
 *
 * @param schema - The Zod schema to convert
 * @returns The JSON Schema representation
 */
export function zodToJsonSchema(schema: z.ZodType<any, any>): any {
  // Check if the schema has the native toJSONSchema method (Zod v4)
  if (typeof (schema as any).toJSONSchema === 'function') {
    return (schema as any).toJSONSchema();
  }

  // Fall back to zod-to-json-schema for Zod v3
  // Dynamically import to avoid hard dependency issues
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {
      zodToJsonSchema: legacyZodToJsonSchema,
    } = require('zod-to-json-schema');
    return legacyZodToJsonSchema(schema);
  } catch (error) {
    throw new Error(
      'Failed to convert Zod schema to JSON Schema. ' +
        'Ensure either Zod v4+ with native toJSONSchema() is installed, ' +
        'or zod-to-json-schema is available for Zod v3 compatibility.',
    );
  }
}
