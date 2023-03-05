const Joi = require('joi');

const accountSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required('Title is required')
    .min(2)
    .max(16),
  currency: Joi.string()
    .required(),
  startBalance: Joi.number()
    .required('Start balance is required')
    .min(-1000000000000)
    .max(1000000000000),
  startDate: Joi.string()
    .required('Start date is required'),
  icon: Joi.string()
    .required('Icon is required'),
  transactions: Joi.array()
    .required()
});

const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body);

  if (validationBody.error) {
    return res.status(400).json({
      code: 400,
      message: validationBody.error.message.replace(/"/g, ''),
    });
  }
  next();
};

module.exports = {
  accountValidation: (req, res, next) => {
    return validate(accountSchema, res, req, next);
  },
};
