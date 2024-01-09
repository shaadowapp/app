// Helper function to convert a number to the desired format
const formatNumber = (num) => `z${num.toString().split('').reverse().join('')}z`;

// Helper function to convert a formatted number back to the original number
const parseNumber = (str) => parseInt(str.substring(1, str.length - 1).split('').reverse().join(''), 10);

// Function to encrypt a number
export const encryptNumber = (originalNumber) => formatNumber(originalNumber);

// Function to decrypt an encrypted number
export const decryptNumber = (encryptedNumber) => parseNumber(encryptedNumber);
