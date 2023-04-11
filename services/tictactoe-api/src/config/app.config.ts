import * as process from 'process';

export default () => ({
  api: {
    port: process.env.TICTACTOE_API_PORT,
    rootPath: process.env.TICTACTOE_API_ROOT_PATH,
    swaggerRootPath: process.env.TICTACTOE_API_SWAGGER_ROOT_PATH,
    accessControlAllowOrigin:
      process.env.TICTACTOE_API_ACCESS_CONTROL_ALLOW_ORIGIN,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  client: {
    url: process.env.TICTACTOE_CLIENT_URL,
  },
});
