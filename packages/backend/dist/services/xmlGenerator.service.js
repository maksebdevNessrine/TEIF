import { generateTeifXml } from "@teif/shared/utils";
function generateInvoiceXml(data) {
  return generateTeifXml(data, false);
}
const xmlGeneratorService = {
  generateInvoiceXml
};
export {
  generateInvoiceXml,
  xmlGeneratorService
};
