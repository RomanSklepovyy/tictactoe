export default () => ({
  api: {
    port: process.env.TICTACTOE_API_PORT,
    rootPath: process.env.TICTACTOE_API_ROOT_PATH,
    swaggerRootPath: process.env.TICTACTOE_API_SWAGGER_ROOT_PATH,
    accessControlAllowOrigin:
      process.env.TICTACTOE_API_ACCESS_CONTROL_ALLOW_ORIGIN,
  },
});
