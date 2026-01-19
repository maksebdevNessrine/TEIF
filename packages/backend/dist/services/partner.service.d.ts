import type { Partner } from '@teif/shared/types';
/**
 * Find an existing partner by idType and idValue, or create a new one
 * Uses atomic upsert to ensure partner reuse across invoices
 */
export declare function findOrCreatePartner(partnerData: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
/**
 * Get partner by ID
 */
export declare function getPartnerById(id: string): Promise<Partner | null>;
/**
 * Update partner by ID
 */
export declare function updatePartner(id: string, partnerData: Partial<Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Partner>;
export declare const partnerService: {
    findOrCreatePartner: typeof findOrCreatePartner;
    getPartnerById: typeof getPartnerById;
    updatePartner: typeof updatePartner;
};
