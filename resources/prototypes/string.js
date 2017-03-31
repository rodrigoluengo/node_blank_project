let validator = require('validator');
let validator_cpf_cnpj = require('../validator/cpf_cnpj');
/**
 * Verify if String is Blank
 * @returns {boolean}
 */
String.prototype.isBlank = function()
{
    return (!this || /^\s*$/.test(this))
};


/**
 * Verify if String is a valid URL
 * @returns {boolean}
 */
String.prototype.isURL = function()
{
    return validator.isURL(this);
};


/**
 * Verify if String is a valid CPF
 * @returns {boolean}
 */
String.prototype.isCPF = function()
{
    return validator_cpf_cnpj.valida_cpf(this);
};


/**
 * Verify if String is a valid CNPJ
 * @returns {*}
 */
String.prototype.isCNPJ = function()
{
    return validator_cpf_cnpj.valida_cnpj(this);
};