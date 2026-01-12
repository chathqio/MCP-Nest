"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McpRequestSchema = void 0;
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const zod_1 = require("zod");
exports.McpRequestSchema = zod_1.z.union([
    types_js_1.CallToolRequestSchema,
    types_js_1.ReadResourceRequestSchema,
    types_js_1.GetPromptRequestSchema,
]);
//# sourceMappingURL=mcp-tool.interface.js.map