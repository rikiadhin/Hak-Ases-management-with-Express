const express = require("express");

const router = express.Router();

const HakAksesController = require("../app/controllers/hak-akses.controller");
const HakAksesValidator = require("../app/validators/hak-akses.validator");

/**
 * @openapi
 * /set-hak-akses/menu:
 *  post:
 *     tags:
 *     - Hak Akses
 *     summary: Set Hak Akses Menu untuk Role
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_menus
 *             properties:
 *               role_menus:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - id_role
 *                     - id_menu
 *                   properties:
 *                     id_role:
 *                       type: integer
 *                       example: 1
 *                       description: ID dari role
 *                     id_menu:
 *                       type: integer
 *                       example: 2
 *                       description: ID dari menu
 *     responses:
 *      200:
 *        description: Hak akses berhasil disimpan
 *      400:
 *        description: Bad Request - role tidak ditemukan atau data tidak valid
 *      422:
 *        description: Unprocessable Entity - Validasi gagal
 *      500:
 *        description: Server Error
 */
router.post(
    "/set-hak-akses/menu",
    HakAksesValidator.validasi_hak_akses_menu,
    HakAksesValidator.validasi_id_role,
    HakAksesController.store_menu
);

/**
 * @openapi
 * /set-hak-akses/role:
 *  post:
 *     tags:
 *     - Hak Akses
 *     summary: Set Hak Akses Role untuk Akun
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - akun_roles
 *             properties:
 *               akun_roles:
 *                 type: array
 *                 minItems: 1
 *                 description: Daftar email dan id_role yang diberikan ke akun
 *                 items:
 *                   type: object
 *                   required:
 *                     - email
 *                     - id_role
 *                   properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                       description: Email akun
 *                     id_role:
 *                       type: integer
 *                       example: 2
 *                       description: ID role yang diberikan
 *     responses:
 *      200:
 *        description: Role berhasil disimpan untuk akun
 *      400:
 *        description: Bad Request - user tidak ditemukan atau data tidak valid
 *      422:
 *        description: Unprocessable Entity - Validasi gagal
 *      500:
 *        description: Server Error
 */
router.post(
    "/set-hak-akses/role",
    HakAksesValidator.validasi_hak_akses_role,
    HakAksesValidator.validasi_email,
    HakAksesController.store_role
);

module.exports = router;