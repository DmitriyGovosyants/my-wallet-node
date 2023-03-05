const Joi = require('joi');

const categorySchema = Joi.object({
  type: Joi.string()
    .valid('expense','revenue')
    .required('Type is required'),
  title: Joi.string()
    .trim()
    .required('Title is required')
    .min(2)
    .max(16),
  icon: Joi.string()
    .required('Icon is required'),
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
  categoryValidation: (req, res, next) => {
    return validate(categorySchema, res, req, next);
  },
};
