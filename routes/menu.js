const express = require("express");

const router = express.Router();

const MenuController = require("../app/controllers/menu.controller");
// const CategoryValidator = require("../app/validator/menu.validator");
// const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /menu:
 *  get:
 *     tags:
 *     - Category
 *     summary: Get all Category
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
router.get("/menu", MenuController.index);

/**
 * @openapi
 * /menu:
 *  post:
 *     tags:
 *     - Category
 *     summary: Add Category
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *               - nama
 *               - url
 *               - icon
 *               - deskripsi
 *              properties:
 *               nama:
 *                type: string
 *               parent_id:
 *                type: integer
 *                nullable: true
 *               url:
 *                type: string
 *               icon:
 *                type: string
 *               order_no:
 *                type: integer
 *                default: 0
 *               deskripsi:
 *                type: string
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
router.post("/menu", MenuController.store);

/**
 * @openapi
 * /menu/{id}:
 *  get:
 *     tags:
 *     - Category
 *     summary: Get Category
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the category
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/menu/:id", MenuController.show);

/**
 * @openapi
 * /menu/{id}:
 *  put:
 *     tags:
 *     - Category
 *     summary: Update Category
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the category
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *               - nama
 *               - url
 *               - icon
 *               - deskripsi
 *              properties:
 *               nama:
 *                type: string
 *               parent_id:
 *                type: integer
 *                nullable: true
 *               url:
 *                type: string
 *               icon:
 *                type: string
 *               order_no:
 *                type: integer
 *                default: 0
 *               deskripsi:
 *                type: string
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
router.put("/menu/:id", MenuController.update);

/**
 * @openapi
 * /menu/{id}:
 *  delete:
 *     tags:
 *     - Category
 *     summary: Delete Category
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the category
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/menu/:id", MenuController.destroy);

module.exports = router;
