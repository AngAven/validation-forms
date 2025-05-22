/**
 * Utility functions for validation
 */

/**
 * Validates a credit card number using the Luhn algorithm
 * @param cardNumber The credit card number to validate
 * @returns True if the card number passes the Luhn check, false otherwise
 */
export function validateCreditCardWithLuhn(cardNumber: string): boolean {
  // Remove any non-digit characters
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 10) {
    return false; // Most credit cards have at least 10 digits
  }
  
  // Luhn algorithm implementation
  let sum = 0;
  let shouldDouble = false;
  
  // Start from the rightmost digit and move left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  // If the sum is divisible by 10, the number is valid
  return sum % 10 === 0;
}