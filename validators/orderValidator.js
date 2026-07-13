const Joi = require('joi');
exports.orderValidation = d =>
  Joi.object({
    listingId: Joi.string().required(),
    amount: Joi.number().required(),
    status: Joi.string().optional(),
    paymentStatus: Joi.string().optional(),
    userId: Joi.string().optional()
  }).validate(d);
