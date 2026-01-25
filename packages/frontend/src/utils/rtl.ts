/**
 * RTL/LTR Utility Functions
 * Provides reusable helpers for language-aware styling
 */

import type { Language } from '@teif/shared/types';

/**
 * Get text alignment class based on language
 * @param language - The language code (ar, fr, en)
 * @param rtlClass - Tailwind class for RTL (default: 'text-right')
 * @param ltrClass - Tailwind class for LTR (default: 'text-left')
 */
export function getTextAlignClass(
  language: Language,
  rtlClass: string = 'text-right',
  ltrClass: string = 'text-left'
): string {
  return language === 'ar' ? rtlClass : ltrClass;
}

/**
 * Get flex direction class based on language
 * @param language - The language code (ar, fr, en)
 * @param rtlClass - Tailwind class for RTL (default: 'flex-row-reverse')
 * @param ltrClass - Tailwind class for LTR (default: 'flex-row')
 */
export function getFlexDirectionClass(
  language: Language,
  rtlClass: string = 'flex-row-reverse',
  ltrClass: string = 'flex-row'
): string {
  return language === 'ar' ? rtlClass : ltrClass;
}

/**
 * Get margin/padding direction class based on language
 * For example, convert 'ml-4' to 'mr-4' for RTL
 */
export function getSpacingClass(
  language: Language,
  rtlClass: string,
  ltrClass: string
): string {
  return language === 'ar' ? rtlClass : ltrClass;
}

/**
 * Get border direction class based on language
 */
export function getBorderClass(
  language: Language,
  rtlClass: string,
  ltrClass: string
): string {
  return language === 'ar' ? rtlClass : ltrClass;
}

/**
 * Check if language is RTL
 */
export function isRTL(language: Language): boolean {
  return language === 'ar';
}

/**
 * Get direction attribute value
 */
export function getDirAttribute(language: Language): 'rtl' | 'ltr' {
  return language === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Combine multiple RTL-aware classes
 * Helper for complex className conditions
 */
export function combineRTLClasses(
  language: Language,
  baseClass: string,
  rtlClasses: string,
  ltrClasses: string
): string {
  const dirClasses = language === 'ar' ? rtlClasses : ltrClasses;
  return `${baseClass} ${dirClasses}`.trim();
}
