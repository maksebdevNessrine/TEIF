
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('@prisma/client/runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  passwordHash: 'passwordHash',
  emailVerified: 'emailVerified',
  verificationCode: 'verificationCode',
  verificationCodeExpires: 'verificationCodeExpires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserSignatureScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  certificateFilename: 'certificateFilename',
  encryptedContent: 'encryptedContent',
  signaturePinHash: 'signaturePinHash',
  certificateSubject: 'certificateSubject',
  certificateIssuer: 'certificateIssuer',
  certificateSerialNumber: 'certificateSerialNumber',
  certificateValidFrom: 'certificateValidFrom',
  certificateValidUntil: 'certificateValidUntil',
  keyAlgorithm: 'keyAlgorithm',
  status: 'status',
  uploadedAt: 'uploadedAt',
  lastUsedAt: 'lastUsedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SignatureAuditScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  invoiceId: 'invoiceId',
  documentNumber: 'documentNumber',
  status: 'status',
  errorMessage: 'errorMessage',
  certificateUsed: 'certificateUsed',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  tokenHash: 'tokenHash',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  revokedAt: 'revokedAt'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  documentType: 'documentType',
  documentNumber: 'documentNumber',
  invoiceDate: 'invoiceDate',
  dueDate: 'dueDate',
  deliveryDate: 'deliveryDate',
  dispatchDate: 'dispatchDate',
  paymentDate: 'paymentDate',
  signatureDate: 'signatureDate',
  otherDate: 'otherDate',
  periodStart: 'periodStart',
  periodEnd: 'periodEnd',
  operationNature: 'operationNature',
  currency: 'currency',
  orderReference: 'orderReference',
  contractReference: 'contractReference',
  deliveryNoteReference: 'deliveryNoteReference',
  userId: 'userId',
  supplierId: 'supplierId',
  buyerId: 'buyerId',
  globalDiscount: 'globalDiscount',
  stampDuty: 'stampDuty',
  ttnReference: 'ttnReference',
  paymentMeans: 'paymentMeans',
  bankName: 'bankName',
  bankCode: 'bankCode',
  bankRib: 'bankRib',
  bankAccountOwner: 'bankAccountOwner',
  checkNumber: 'checkNumber',
  cardType: 'cardType',
  cardLast4: 'cardLast4',
  cardReference: 'cardReference',
  postalAccountNumber: 'postalAccountNumber',
  postalAccountOwner: 'postalAccountOwner',
  postalBranchCode: 'postalBranchCode',
  postalServiceName: 'postalServiceName',
  ePaymentGateway: 'ePaymentGateway',
  ePaymentTransactionId: 'ePaymentTransactionId',
  otherPaymentDescription: 'otherPaymentDescription',
  otherPaymentReference: 'otherPaymentReference',
  ircRate: 'ircRate',
  ircAmount: 'ircAmount',
  ircExemptionReason: 'ircExemptionReason',
  qrCodeEnabled: 'qrCodeEnabled',
  qrCodeContent: 'qrCodeContent',
  amountDescriptionOverride: 'amountDescriptionOverride',
  amountLanguage: 'amountLanguage',
  xmlContent: 'xmlContent',
  status: 'status',
  totalHT: 'totalHT',
  totalTVA: 'totalTVA',
  totalTTC: 'totalTTC',
  deletedAt: 'deletedAt',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PartnerScalarFieldEnum = {
  id: 'id',
  idType: 'idType',
  idValue: 'idValue',
  name: 'name',
  addressDescription: 'addressDescription',
  street: 'street',
  city: 'city',
  postalCode: 'postalCode',
  country: 'country',
  rc: 'rc',
  capital: 'capital',
  phone: 'phone',
  email: 'email',
  partnerType: 'partnerType',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InvoiceLineScalarFieldEnum = {
  id: 'id',
  invoiceId: 'invoiceId',
  itemCode: 'itemCode',
  description: 'description',
  quantity: 'quantity',
  unit: 'unit',
  unitPrice: 'unitPrice',
  discountRate: 'discountRate',
  taxRate: 'taxRate',
  fodec: 'fodec',
  exemptionReason: 'exemptionReason',
  lineAmount: 'lineAmount',
  taxAmount: 'taxAmount',
  totalAmount: 'totalAmount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AllowanceChargeScalarFieldEnum = {
  id: 'id',
  type: 'type',
  code: 'code',
  description: 'description',
  amount: 'amount',
  basedOn: 'basedOn',
  invoiceId: 'invoiceId',
  lineId: 'lineId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  User: 'User',
  UserSignature: 'UserSignature',
  SignatureAudit: 'SignatureAudit',
  RefreshToken: 'RefreshToken',
  Invoice: 'Invoice',
  Partner: 'Partner',
  InvoiceLine: 'InvoiceLine',
  AllowanceCharge: 'AllowanceCharge'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
