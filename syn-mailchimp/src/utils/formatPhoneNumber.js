/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @returns {length}
 */

const formatPhoneNumber=(number, region) => {
  // Require `PhoneNumberFormat`.

  const PNF = require('google-libphonenumber').PhoneNumberFormat;
  // Remove all extra characters
  // number = number.replace(/\D/g,"");

// Get an instance of `PhoneNumberUtil`.
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

// Parse number with country code.
var phoneNumber = phoneUtil.parse(number, region);

// Print number in the international format.
return phoneUtil.format(phoneNumber, PNF.E164);



// => +1 202-456-1414
}

module.exports = formatPhoneNumber;
