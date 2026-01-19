"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partnerService = void 0;
exports.findOrCreatePartner = findOrCreatePartner;
exports.getPartnerById = getPartnerById;
exports.updatePartner = updatePartner;
const prisma_1 = require("../lib/prisma");
/**
 * Map Prisma Partner result to shared Partner type
 */
function mapPrismaPartnerToType(prismaPartner) {
    return {
        ...prismaPartner,
        idType: prismaPartner.idType,
        partnerType: prismaPartner.partnerType,
    };
}
/**
 * Find an existing partner by idType and idValue, or create a new one
 * Uses atomic upsert to ensure partner reuse across invoices
 */
async function findOrCreatePartner(partnerData) {
    const { idType, idValue } = partnerData;
    const partner = await prisma_1.prisma.partner.upsert({
        where: {
            idType_idValue: {
                idType,
                idValue,
            },
        },
        update: {
            // Update fields if partner exists - using actual schema fields
            name: partnerData.name,
            addressDescription: partnerData.addressDescription,
            street: partnerData.street,
            city: partnerData.city,
            postalCode: partnerData.postalCode,
            country: partnerData.country,
            rc: partnerData.rc,
            capital: partnerData.capital,
            phone: partnerData.phone,
            email: partnerData.email,
            partnerType: partnerData.partnerType,
        },
        create: {
            // Create new partner if doesn't exist - using actual schema fields
            idType,
            idValue,
            name: partnerData.name,
            addressDescription: partnerData.addressDescription,
            street: partnerData.street,
            city: partnerData.city,
            postalCode: partnerData.postalCode,
            country: partnerData.country,
            rc: partnerData.rc,
            capital: partnerData.capital,
            phone: partnerData.phone,
            email: partnerData.email,
            partnerType: partnerData.partnerType,
        },
    });
    return partner.id;
}
/**
 * Get partner by ID
 */
async function getPartnerById(id) {
    const partner = await prisma_1.prisma.partner.findUnique({
        where: { id },
    });
    return partner ? mapPrismaPartnerToType(partner) : null;
}
/**
 * Update partner by ID
 */
async function updatePartner(id, partnerData) {
    const updated = await prisma_1.prisma.partner.update({
        where: { id },
        data: partnerData,
    });
    return mapPrismaPartnerToType(updated);
}
exports.partnerService = {
    findOrCreatePartner,
    getPartnerById,
    updatePartner,
};
