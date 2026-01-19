"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmlGeneratorService = void 0;
exports.generateInvoiceXml = generateInvoiceXml;
const utils_1 = require("@teif/shared/utils");
/**
 * Generate TEIF-compliant XML from invoice data
 * Wraps the shared XML generation utility for backend use
 */
function generateInvoiceXml(data) {
    return (0, utils_1.generateTeifXml)(data, false);
}
exports.xmlGeneratorService = {
    generateInvoiceXml,
};
