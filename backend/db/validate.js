/**
 * @file Integration level validator, validates and sanitizes data to be used in queries.
 * @author Lucas Villarroel
 * @requires validator - tool used for validating.
 */
const validator = require('validator');

/**
 * Returns valid and sanitized data, throws error if any data is invalid.
 * @param {object} params - object containing the parameters to validate.
 * @returns {object} - valid data.
 * @throws {error} - has message with which parameters are invalid.
 */
const validate = ({
  fname, surname, ssn, email, username,
}) => {
  const error = {};
  const valid = {};

  // first name validation
  if (fname) {
    const fnameClean = validator.escape(fname.trim());
    if (fnameClean) {
      if (validator.isAlpha(fnameClean.replace(/\s/g, ''))) {
        valid.fname = fnameClean;
      } else {
        error.fname = `Contains symbols other than (A-Ö, a-ö) and spaces, got '${fname}'`;
      }
    } else {
      error.fname = 'Empty name';
    }
  }

  // surname validation
  if (surname) {
    const surnameClean = validator.escape(surname.trim());
    if (surnameClean) {
      if (validator.isAlpha(surnameClean.replace(/\s/g, ''))) {
        valid.surname = surnameClean;
      } else {
        error.surname = 'Contains symbols other than (A-Ö, a-ö) and spaces';
      }
    } else {
      error.surname = 'Empty surname';
    }
  }

  // social security number validation
  if (ssn) {
    const ssnClean = validator.escape(ssn.trim());
    if (validator.isNumeric(ssnClean)) {
      if (ssnClean.length === 12) {
        valid.ssn = ssnClean;
      } else {
        error.ssn = `Has to follow format YYYYMMDDXXXX, got '${ssn}'`;
      }
    } else {
      error.ssn = `Can only be numeric values (0-9), got '${ssn}'`;
    }
  }

  // email validation
  if (email) {
    const emailClean = validator.escape(email.trim());
    if (validator.isEmail(emailClean)) {
      valid.email = emailClean;
    } else {
      error.email = `Invalid email, '${email}'`;
    }
  }

  // username validation
  if (username) {
    const cleanUsername = validator.escape(username.trim());
    if (validator.isAlphanumeric(cleanUsername)) {
      valid.username = cleanUsername;
    } else {
      error.username = `Invalid username, ${username}`;
    }
  }

  if (Object.keys(error).length > 0) {
    throw new Error(JSON.stringify(error));
  } else {
    return valid;
  }
};

module.exports = { validate };
