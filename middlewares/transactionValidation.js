const Joi = require('joi');

const transactionSchema = Joi.object({
  type: Joi.string()
    .valid('expense','revenue')
    .required('Type is required'),
  category_id: Joi.string()
    .required('Category is required'),
  date: Joi.string()
    .required('Date is required'),
  value: Joi.number()
    .required('Value is required'),
  comment: Joi.string()
    .trim()
    .max(32),
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
  transactionValidation: (req, res, next) => {
    return validate(transactionSchema, res, req, next);
  },
};
