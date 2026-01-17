/**
 * Frontend XML Generator
 * Re-exports generateTeifXml from @teif/shared for backward compatibility
 * New code should import directly from @teif/shared/utils
 */

// Re-export from shared for backward compatibility
export { generateTeifXml } from '@teif/shared/utils';

// Re-export shared utilities for backward compatibility
export { formatTtnDate, generateQrString, numberToLettersFr } from '@teif/shared/utils';

// validateRib is now in validation module
export { validateRib } from '@teif/shared/validation';
