import * as Joi from 'joi';

const appConfigSchema = Joi.object({
  // API server settings
  TICTACTOE_API_PORT: Joi.number().default(3000),
  TICTACTOE_API_ROOT_PATH: Joi.string().required(),
  TICTACTOE_API_ACCESS_CONTROL_ALLOW_ORIGIN: Joi.string(),
  TICTACTOE_API_SWAGGER_ROOT_PATH: Joi.string().required(),
});

export default appConfigSchema;
