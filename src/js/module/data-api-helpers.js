var union = require('lodash/union');
var keys = require('lodash/keys');
var each = require('lodash/each');
var omit = require('lodash/omit');
var pick = require('lodash/pick');
var defaultsDeep = require('lodash/defaultsDeep');
var errorHandler = require('./error-handler');

/**
 * @param {jQuery} $element
 * @param {Array} requiredParams
 * @param {Array} optionalParams
 * @param {Object} optionalParamsWithDefaults
 * @return {Object}
 */
exports.getOptions = function ($element, requiredParams, optionalParams, optionalParamsWithDefaults) {
  requiredParams = requiredParams || [];
  optionalParams = optionalParams || [];
  optionalParamsWithDefaults = optionalParamsWithDefaults || {};

  var dataValues = $element.data();
  var optionWhitelist = union(
    requiredParams,
    optionalParams,
    keys(optionalParamsWithDefaults)
  );

  dataValues = pick(dataValues, optionWhitelist);
  dataValues = omit(dataValues, function (value) {
    return value === "";
  });

  each(requiredParams, function (value) {
    if (!dataValues.hasOwnProperty(value)) {
      errorHandler.log('The object does not have the required "' + value + '" value');
    }
  });

  return defaultsDeep(dataValues, optionalParamsWithDefaults);
};