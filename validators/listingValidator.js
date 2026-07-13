const Joi = require('joi');
exports.listingValidation = d =>
  Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    location: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    rating: Joi.number().min(0).max(5)
  }).validate(d);
