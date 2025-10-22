const AuthRouter = require("./auth");
const MenuRouter = require("./menu");
const AkunStatusRouter = require("./status");
const RoleRouter = require("./role");
const HakAksesMenu = require("./hak-akses");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, MenuRouter);
  app.use(prefix, RoleRouter);
  app.use(prefix, HakAksesMenu);
  app.use(prefix, AkunStatusRouter);
};

module.exports = routes;
