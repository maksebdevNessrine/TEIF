import { prisma } from "../lib/prisma.js";
function mapPrismaPartnerToType(prismaPartner) {
  return {
    ...prismaPartner,
    idType: prismaPartner.idType,
    partnerType: prismaPartner.partnerType
  };
}
async function findOrCreatePartner(partnerData) {
  const { idType, idValue } = partnerData;
  const partner = await prisma.partner.upsert({
    where: {
      idType_idValue: {
        idType,
        idValue
      }
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
      partnerType: partnerData.partnerType
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
      partnerType: partnerData.partnerType
    }
  });
  return partner.id;
}
async function getPartnerById(id) {
  const partner = await prisma.partner.findUnique({
    where: { id }
  });
  return partner ? mapPrismaPartnerToType(partner) : null;
}
async function updatePartner(id, partnerData) {
  const updated = await prisma.partner.update({
    where: { id },
    data: partnerData
  });
  return mapPrismaPartnerToType(updated);
}
const partnerService = {
  findOrCreatePartner,
  getPartnerById,
  updatePartner
};
export {
  findOrCreatePartner,
  getPartnerById,
  partnerService,
  updatePartner
};

