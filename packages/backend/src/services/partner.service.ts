import { prisma } from '../lib/prisma';
import type { Partner } from '@teif/shared/types';

/**
 * Map Prisma Partner result to shared Partner type
 */
function mapPrismaPartnerToType(prismaPartner: any): Partner {
  return {
    ...prismaPartner,
    idType: prismaPartner.idType as any,
    partnerType: prismaPartner.partnerType as any,
  };
}

/**
 * Find an existing partner by idType and idValue, or create a new one
 * Uses atomic upsert to ensure partner reuse across invoices
 */
export async function findOrCreatePartner(
  partnerData: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const { idType, idValue } = partnerData;

  const partner = await prisma.partner.upsert({
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
export async function getPartnerById(id: string): Promise<Partner | null> {
  const partner = await prisma.partner.findUnique({
    where: { id },
  });
  return partner ? mapPrismaPartnerToType(partner) : null;
}

/**
 * Update partner by ID
 */
export async function updatePartner(
  id: string,
  partnerData: Partial<Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Partner> {
  const updated = await prisma.partner.update({
    where: { id },
    data: partnerData,
  });
  return mapPrismaPartnerToType(updated);
}

export const partnerService = {
  findOrCreatePartner,
  getPartnerById,
  updatePartner,
};
