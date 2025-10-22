const express = require("express");

const router = express.Router();

const RoleController = require("../app/controllers/role.controller");
// const Role Validator = require("../app/validator/role.validator");
// const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /role:
 *  get:
 *     tags:
 *     - Role
 *     summary: Get all Role
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/role", RoleController.index);

/**
 * @openapi
 * /role:
 *  post:
 *     tags:
 *     - Role
 *     summary: Add Role
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - nama
 *              - deskripsi
 *            properties:
 *              nama:
 *               type: string
 *               example: superadmin
 *              deskripsi:
 *               type: string
 *               example: akses ke semua menu
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/role", RoleController.store);

/**
 * @openapi
 * /role/{id}:
 *  get:
 *     tags:
 *     - Role
 *     summary: Get Role
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the Role
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/role/:id", RoleController.show);

/**
 * @openapi
 * /role/{id}:
 *  put:
 *     tags:
 *     - Role
 *     summary: Update Role
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the Role
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - nama
 *              - deskripsi
 *            properties:
 *              nama:
 *               type: string
 *               example: superadmin
 *              deskripsi:
 *               type: string
 *               example: akses ke semua menu
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put("/role/:id", RoleController.update);

/**
 * @openapi
 * /role/{id}:
 *  delete:
 *     tags:
 *     - Role
 *     summary: Delete Role
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the Role
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/role/:id", RoleController.destroy);

module.exports = router;
