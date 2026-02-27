/**
 * TEIF Invoice Validators
 * Real-time validation for invoice fields per TEIF 1.8.8 specification
 */
// Export schemas
export { invoiceListQuerySchema, } from './schemas';
// Export auth schemas
export { registerSchema, loginSchema, verifyEmailSchema, resendCodeSchema, userResponseSchema, authResponseSchema, logoutResponseSchema, } from './auth.schemas';
/** Validate RIB (Tunisian Bank Account Number) - MOD 97 checksum */
export function validateRib(rib) {
    if (!rib)
        return { isValid: false, error: 'RIB is required' };
    if (!/^\d{20}$/.test(rib))
        return { isValid: false, error: 'RIB must be exactly 20 digits' };
    // MOD 97 checksum validation
    const checkDigits = rib.substring(0, 2);
    const ribWithoutCheck = rib.substring(2) + rib.substring(0, 2);
    let remainder = 0;
    for (let i = 0; i < ribWithoutCheck.length; i++) {
        remainder = ((remainder * 10) + parseInt(ribWithoutCheck[i])) % 97;
    }
    const expectedCheck = (98 - remainder).toString().padStart(2, '0');
    if (checkDigits !== expectedCheck) {
        return { isValid: false, error: 'Invalid RIB checksum' };
    }
    return { isValid: true };
}
/** Validate SIREN (French Business Identifier - 9 digits) */
export function validateSiren(siren) {
    if (!siren)
        return { isValid: false, error: 'SIREN is required' };
    if (!/^\d{9}$/.test(siren))
        return { isValid: false, error: 'SIREN must be exactly 9 digits' };
    // Luhn checksum validation
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        let digit = parseInt(siren[i]);
        if (i % 2 === 0)
            digit *= 2;
        if (digit > 9)
            digit -= 9;
        sum += digit;
    }
    if (sum % 10 !== 0) {
        return { isValid: false, error: 'Invalid SIREN checksum' };
    }
    return { isValid: true };
}
/** Validate Tunisian Tax ID (8-10 digits) */
export function validateTaxId(taxId) {
    if (!taxId)
        return { isValid: false, error: 'Tax ID is required' };
    if (!/^\d{8,10}$/.test(taxId))
        return { isValid: false, error: 'Tax ID must be 8-10 digits' };
    return { isValid: true };
}
/** Validate Date Format YYYY-MM-DD */
export function validateDateFormat(date) {
    if (!date)
        return { isValid: false, error: 'Date is required' };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
        return { isValid: false, error: 'Date must be YYYY-MM-DD format' };
    const [year, month, day] = date.split('-').map(Number);
    if (month < 1 || month > 12)
        return { isValid: false, error: 'Invalid month (must be 01-12)' };
    if (day < 1 || day > 31)
        return { isValid: false, error: 'Invalid day (must be 01-31)' };
    const dateObj = new Date(year, month - 1, day);
    if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
        return { isValid: false, error: 'Invalid date (day does not exist in month)' };
    }
    return { isValid: true };
}
/** Validate Signature Date Format DDMMyyHHmm (e.g., 1001261430 = 10/01/26 14:30) */
export function validateSignatureDateFormat(date) {
    if (!date)
        return { isValid: true }; // Optional field
    if (!/^\d{10}$/.test(date))
        return { isValid: false, error: 'Signature date must be DDMMyyHHmm format (10 digits, e.g., 1001261430)' };
    const day = parseInt(date.substring(0, 2));
    const month = parseInt(date.substring(2, 4));
    const hour = parseInt(date.substring(6, 8));
    const minute = parseInt(date.substring(8, 10));
    if (day < 1 || day > 31)
        return { isValid: false, error: 'Invalid day in signature date' };
    if (month < 1 || month > 12)
        return { isValid: false, error: 'Invalid month in signature date' };
    if (hour < 0 || hour > 23)
        return { isValid: false, error: 'Invalid hour (must be 00-23)' };
    if (minute < 0 || minute > 59)
        return { isValid: false, error: 'Invalid minute (must be 00-59)' };
    return { isValid: true };
}
/** Validate Email Address */
export function validateEmail(email) {
    if (!email)
        return { isValid: true }; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Invalid email address format' };
    }
    return { isValid: true };
}
/** Validate Phone Number (flexible format, at least 8 digits) */
export function validatePhone(phone) {
    if (!phone)
        return { isValid: true }; // Optional field
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 8) {
        return { isValid: false, error: 'Phone number must contain at least 8 digits' };
    }
    if (digits.length > 15) {
        return { isValid: false, error: 'Phone number is too long' };
    }
    return { isValid: true };
}
/** Validate Identifier (varies by type) */
export function validateIdentifier(value, type) {
    if (!value)
        return { isValid: false, error: `${type} is required` };
    switch (type) {
        case 'I-01':
        case 'I-02':
            return validateTaxId(value);
        case 'I-03':
            return validateSiren(value);
        case 'I-04':
            // VAT number - simplified (country-specific validation)
            if (!/^[A-Z]{2}\d{10,}$/.test(value)) {
                return { isValid: false, error: 'Invalid VAT number format' };
            }
            return { isValid: true };
        default:
            return { isValid: true };
    }
}
/** Validate Amount (0 to 9999999999.99999 with max 5 decimals) */
export function validateAmount(amount) {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num))
        return { isValid: false, error: 'Amount must be a number' };
    if (num < 0)
        return { isValid: false, error: 'Amount cannot be negative' };
    if (num > 9999999999.99999)
        return { isValid: false, error: 'Amount exceeds maximum value' };
    // Check decimal precision (max 5 decimals)
    const decimalPlaces = (num.toString().split('.')[1] || '').length;
    if (decimalPlaces > 5) {
        return { isValid: false, error: 'Amount can have maximum 5 decimal places' };
    }
    return { isValid: true };
}
/** Validate Tax Rate (0 to 100%, typically 0, 7, 13, 19) */
export function validateTaxRate(rate) {
    const num = typeof rate === 'string' ? parseFloat(rate) : rate;
    if (isNaN(num))
        return { isValid: false, error: 'Tax rate must be a number' };
    if (num < 0 || num > 1)
        return { isValid: false, error: 'Tax rate must be between 0 and 1 (0-100%)' };
    const validRates = [0, 0.07, 0.13, 0.19];
    if (!validRates.includes(num)) {
        return { isValid: false, warning: `Standard rates are 0%, 7%, 13%, 19%. Using custom rate: ${(num * 100).toFixed(1)}%` };
    }
    return { isValid: true };
}
/** Validate IRC Withholding Tax Rate (0-10%) */
export function validateIrcRate(rate) {
    const num = typeof rate === 'string' ? parseFloat(rate) : rate;
    if (isNaN(num))
        return { isValid: false, error: 'IRC rate must be a number' };
    if (num < 0 || num > 0.1)
        return { isValid: false, error: 'IRC rate must be between 0 and 0.1 (0-10%)' };
    return { isValid: true };
}
/** Validate Quantity (positive number) */
export function validateQuantity(quantity) {
    const num = typeof quantity === 'string' ? parseFloat(quantity) : quantity;
    if (isNaN(num))
        return { isValid: false, error: 'Quantity must be a number' };
    if (num <= 0)
        return { isValid: false, error: 'Quantity must be greater than 0' };
    return { isValid: true };
}
/** Validate Invoice Number (alphanumeric, no special chars except -, /) */
export function validateInvoiceNumber(number) {
    if (!number)
        return { isValid: false, error: 'Invoice number is required' };
    if (!/^[A-Za-z0-9\-\/]+$/.test(number))
        return { isValid: false, error: 'Invoice number can only contain letters, numbers, hyphens, and slashes' };
    if (number.length > 30)
        return { isValid: false, error: 'Invoice number is too long (max 30 characters)' };
    return { isValid: true };
}
/** Validate Company Name */
export function validateCompanyName(name) {
    if (!name || name.trim().length === 0)
        return { isValid: false, error: 'Company name is required' };
    if (name.length > 250)
        return { isValid: false, error: 'Company name is too long (max 250 characters)' };
    return { isValid: true };
}
/** Validate Street Address */
export function validateStreetAddress(street) {
    if (!street || street.trim().length === 0)
        return { isValid: false, error: 'Street address is required' };
    if (street.length > 100)
        return { isValid: false, error: 'Street address is too long (max 100 characters)' };
    return { isValid: true };
}
/** Validate City */
export function validateCity(city) {
    if (!city || city.trim().length === 0)
        return { isValid: false, error: 'City is required' };
    if (city.length > 50)
        return { isValid: false, error: 'City is too long (max 50 characters)' };
    return { isValid: true };
}
/** Validate Postal Code (alphanumeric, max 10 chars) */
export function validatePostalCode(code) {
    if (!code || code.trim().length === 0)
        return { isValid: false, error: 'Postal code is required' };
    if (!/^[A-Za-z0-9\s\-]+$/.test(code))
        return { isValid: false, error: 'Postal code can only contain letters, numbers, spaces, and hyphens' };
    if (code.length > 10)
        return { isValid: false, error: 'Postal code is too long (max 10 characters)' };
    return { isValid: true };
}
/** Bulk Validation for Partner */
export function validatePartner(partner) {
    const errors = [];
    if (!validateCompanyName(partner.name).isValid) {
        errors.push(validateCompanyName(partner.name));
    }
    if (!validateIdentifier(partner.idValue, partner.idType).isValid) {
        errors.push(validateIdentifier(partner.idValue, partner.idType));
    }
    if (!validateStreetAddress(partner.street).isValid) {
        errors.push(validateStreetAddress(partner.street));
    }
    if (!validateCity(partner.city).isValid) {
        errors.push(validateCity(partner.city));
    }
    if (!validatePostalCode(partner.postalCode).isValid) {
        errors.push(validatePostalCode(partner.postalCode));
    }
    if (partner.email && !validateEmail(partner.email).isValid) {
        errors.push(validateEmail(partner.email));
    }
    if (partner.phone && !validatePhone(partner.phone).isValid) {
        errors.push(validatePhone(partner.phone));
    }
    return errors;
}
// ============================================================================
// RE-EXPORT ZOD SCHEMAS & AUTH SCHEMAS
// ============================================================================
export * from './schemas';
export * from './auth.schemas';
