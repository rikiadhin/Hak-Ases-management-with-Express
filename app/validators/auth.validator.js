const { check, validationResult } = require("express-validator");

const login = [
  check("email").not().isEmpty().withMessage("email can not be empty!"),
  check("password").not().isEmpty().withMessage("password can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(400).json({ message: 'error validation', error: error_data });
    else
      next();
  },
];

const register = [
  check("first_name").not().isEmpty().withMessage("First name can not be empty!"),
  check("last_name").not().isEmpty().withMessage("Last name can not be empty!"),
  check("email").not().isEmpty().withMessage("email can not be empty!"),
  check("password").not().isEmpty().withMessage("password can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(400).json({ message: 'error validation', error: error_data });
    else
      next();
  },
];

const change_role = [
  check("id_role").isInt({ gt: 0 }).withMessage('Setiap id_role harus bilangan bulat positif'),
  check("email").isEmail().withMessage("Setiap email harus valid!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(400).json({ message: 'error validation', error: error_data });
    else
      next();
  },
];

module.exports = {
  login,
  register,
  change_role
};