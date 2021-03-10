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

  if (fname) {
    const fnameClean = validator.escape(fname.trim());
    if (fnameClean) {
      if (validator.isAlpha(fnameClean.replace(/\s+/, ''))) {
        valid.fname = fnameClean.replace(/\s+/, ' ');
      } else {
        error.fname = `Invalid name '${fnameClean}', can only contain lettters (A-Ö, a-ö) and at most one space`;
      }
    } else {
      error.fname = 'Empty name';
    }
  }

  if (surname) {
    const surnameClean = validator.escape(surname.trim());
    if (surnameClean) {
      if (validator.isAlpha(surnameClean.replace(/\s+/, ''))) {
        valid.surname = surnameClean.replace(/\s+/, ' ');
      } else {
        error.surname = `Invalid surname '${surnameClean}', can only contain lettters (A-Ö, a-ö) and at most one space`;
      }
    } else {
      error.surname = 'Empty surname';
    }
  }

  if (ssn) {
    const ssnClean = validator.escape(ssn.trim());
    if (validator.isNumeric(ssnClean)) {
      if (ssnClean.length === 12) {
        valid.ssn = ssnClean;
      } else {
        error.ssn = `Invalid ssn '${ssnClean}', has to follow YYYYMMDDXXXX format`;
      }
    } else {
      error.ssn = `Invalid ssn '${ssnClean}', can only contain numeric values (0-9)`;
    }
  }

  if (email) {
    const emailClean = validator.escape(email.trim());
    if (validator.isEmail(emailClean)) {
      valid.email = emailClean;
    } else {
      error.email = `Invalid email '${emailClean}'`;
    }
  }

  if (username) {
    const cleanUsername = validator.escape(username.trim());
    if (validator.isAlphanumeric(cleanUsername)) {
      valid.username = cleanUsername;
    } else {
      error.username = `Invalid username '${cleanUsername}', needs to be alphanumeric (A-Ö, a-ö, 0-9)`;
    }
  }

  if (Object.keys(error).length > 0) {
    throw new Error(JSON.stringify(error));
  } else {
    return valid;
  }
};

module.exports = { validate };
