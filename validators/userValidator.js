const Joi = require('joi');
exports.registerValidation = d =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
    avatarUrl: Joi.string().allow(''),
    role: Joi.string().optional()
  }).validate(d);
exports.loginValidation = d =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).validate(d);
exports.updateUserValidation = d =>
  Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    avatarUrl: Joi.string().allow(''),
    role: Joi.string(),
    password: Joi.string()
  }).validate(d);
