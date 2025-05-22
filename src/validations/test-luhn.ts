/**
 * Simple test script for the Luhn algorithm implementation
 */
import { validateCreditCardWithLuhn } from './utils';

// Test with valid credit card numbers
const validCards = [
  '4532015112830366', // Visa
  '5555555555554444', // Mastercard
  '378282246310005',  // American Express
  '6011111111111117', // Discover
  '3530111333300000', // JCB
  '4111111111111111', // Common test number
];

// Test with invalid credit card numbers
const invalidCards = [
  '4532015112830367', // Invalid Visa (changed last digit)
  '5555555555554445', // Invalid Mastercard (changed last digit)
  '1234567890123456', // Random number
  '1111111111111111', // All same digits
];

console.log('Testing valid credit card numbers:');
validCards.forEach(card => {
  const isValid = validateCreditCardWithLuhn(card);
  console.log(`${card}: ${isValid ? 'Valid' : 'Invalid'}`);
});

console.log('\nTesting invalid credit card numbers:');
invalidCards.forEach(card => {
  const isValid = validateCreditCardWithLuhn(card);
  console.log(`${card}: ${isValid ? 'Valid' : 'Invalid'}`);
});