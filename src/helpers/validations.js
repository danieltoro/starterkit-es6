/*
*** Validations file ***
*/

// NPM Dependencies
import Joi from 'joi';

export function validateBody(schema) {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    console.log(req.body);
    if (result.error) {
      switch (result.error.details[0].context.key) {
        case 'email':
          res.status(400).send({ error: 'You must provide a valid email address' });
          break;
        case 'password':
          res.status(400)
            .send({
              error: `
              The password provided failed to match the following rules:
              1. It must contain ONLY the following characters: lower case, upper case, numerics.
              2. It must be at least 8 characters in length and not greater than 32 characters in length.
              `
            });
          break;
        default:
          res.status(400)
            .send({ error: 'Invalid registration infomation' });
      }
    } else {
      next();
    }
  };
}

export const schemas = {
  authSchemas: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
      .required()
  })
};

