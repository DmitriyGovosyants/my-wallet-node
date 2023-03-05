const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string()
    .regex(/^[^ 0-9][a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]*$/)
    .required()
    .messages({
      'string.pattern.base':
        'Name should have only letters and don`t start with a space',
      'string.empty': 'Name can`t be empty',
    }),
  email: Joi.string()
    .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'] },
    })
    .required()
    .messages({
      'string.email':
        'email must contain a domain name .com, .net, .org, .ua, .ru, .gov, .ca',
      'string.pattern.base': 'Email only on English and with @',
    })
    .required(),
  password: Joi.string()
    .pattern(
      /^[0-9a-zA-Zа-яА-ЯёЁіІїЇєЄ!@#$%^&+=*,:;><'"~`?_\-()\/.|\S+]{7,32}$/
    )
    .messages({
      'string.pattern.base':
        'Password length should have at 7 to 32 symbol and does not contain a space',
    })
    .required(),
  avatar: Joi.string(),
  accounts: Joi.array(),
  categories: Joi.array(),
  settings: Joi.object({
    mainCurrency: Joi.string().allow(''),
  })
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
  userValidation: (req, res, next) => {
    return validate(userSchema, res, req, next);
  },
};
