const { body, validationResult } = require('express-validator');

// Validasi hak akses role + menu
const validasi_hak_akses_menu = [
    body('role_menus')
        .isArray({ min: 1 }).withMessage('role_menus harus berupa array dan tidak boleh kosong'),

    body('role_menus.*.id_role')
        .isInt({ gt: 0 }).withMessage('Setiap id_role harus bilangan bulat positif'),

    body('role_menus.*.id_menu')
        .isInt({ gt: 0 }).withMessage('Setiap id_menu harus bilangan bulat positif'),

    // Middleware untuk menangani hasil validasi
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: 'error',
                message: 'Validation error',
                errors: errors.array(),
            });
        }
        next();
    }
];

const validasi_id_role = (req, res, next) => {
    const { role_menus } = req.body;
    if (role_menus && role_menus.length > 0) {
        const firstRole = role_menus[0].id_role;
        const allSame = role_menus.every(item => item.id_role === firstRole);
        if (!allSame) {
            return res.status(400).json({
                status: 'error',
                message: 'Semua id_role harus sama'
            });
        }
    }
    next();
};

// Validasi hak akses akun + role
const validasi_hak_akses_role = [
    body('akun_roles').isArray({ min: 1 }).withMessage('akun_roles harus berupa array dan tidak boleh kosong'),
    body('akun_roles.*.email').isEmail().withMessage('Setiap email harus valid'),
    body('akun_roles.*.id_role').isInt({ gt: 0 }).withMessage('Setiap id_role harus bilangan bulat positif'),

    // Middleware untuk menangani hasil validasi
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: 'error',
                message: 'Validation error',
                errors: errors.array(),
            });
        }
        next();
    }
];

const validasi_email = (req, res, next) => {
    const { akun_roles } = req.body;
    if (akun_roles && akun_roles.length > 0) {
        const firstRole = akun_roles[0].email;
        const allSame = akun_roles.every(item => item.email === firstRole);
        if (!allSame) {
            return res.status(400).json({
                status: 'error',
                message: 'Semua email harus sama'
            });
        }
    }
    next();
};

module.exports = {
    validasi_hak_akses_menu,
    validasi_id_role,
    validasi_hak_akses_role,
    validasi_email
};
