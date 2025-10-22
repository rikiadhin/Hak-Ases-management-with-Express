const express = require("express");

const router = express.Router();

const AuthController = require("../app/controllers/auth.controller");
const AuthValidator = require("../app/validators/auth.validator");


/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Admin Auth
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *               type: string
 *               example: admin@example.com
 *              password:
 *               type: string
 *               example: password
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/login", AuthValidator.login, AuthController.login);

/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Admin Auth
 *     summary: Register
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - first_name
 *              - last_name
 *              - email
 *              - password
 *            properties:
 *              first_name:
 *               type: string
 *               example: Jonatan
 *              last_name:
 *               type: string
 *               example: Alex
 *              email:
 *               type: string
 *               example: admin@example.com
 *              password:
 *               type: string
 *               example: password
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/register", AuthValidator.register, AuthController.register);

/**
 * @openapi
 * /change-role:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Mengubah peran (role) aktif dari user
 *     description: Endpoint ini digunakan untuk mengubah role aktif user berdasarkan email dan ID role yang valid.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - id_role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: Email dari akun yang ingin diubah rolenya
 *               id_role:
 *                 type: integer
 *                 example: 2
 *                 description: ID role yang akan diaktifkan untuk user
 *     responses:
 *       200:
 *         description: Role berhasil diubah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: change role successfull
 *                 hak_akses:
 *                   type: object
 *                   description: Data hak akses untuk role yang dipilih
 *       400:
 *         description: Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error validation
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item_name:
 *                         type: string
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: Setiap email harus valid!
 *       500:
 *         description: Internal server error
 */
router.post("/change-role", AuthValidator.change_role, AuthController.change_role);

module.exports = router;
