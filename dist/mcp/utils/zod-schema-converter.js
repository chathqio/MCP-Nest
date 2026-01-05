"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodToJsonSchema = zodToJsonSchema;
function zodToJsonSchema(schema) {
    if (typeof schema.toJSONSchema === 'function') {
        return schema.toJSONSchema();
    }
    try {
        const { zodToJsonSchema: legacyZodToJsonSchema } = require('zod-to-json-schema');
        return legacyZodToJsonSchema(schema);
    }
    catch (error) {
        throw new Error('Failed to convert Zod schema to JSON Schema. ' +
            'Ensure either Zod v4+ with native toJSONSchema() is installed, ' +
            'or zod-to-json-schema is available for Zod v3 compatibility.');
    }
}
//# sourceMappingURL=zod-schema-converter.js.map