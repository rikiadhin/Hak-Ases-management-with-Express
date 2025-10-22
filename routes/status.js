const express = require("express");

const router = express.Router();

const AkunStatusController = require("../app/controllers/status.controller");
// const Akun Status Validator = require("../app/validator/status.validator");
// const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /status:
 *  get:
 *     tags:
 *     - Akun Status
 *     summary: Get all Akun Status
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
router.get("/status", AkunStatusController.index);

/**
 * @openapi
 * /status:
 *  post:
 *     tags:
 *     - Akun Status
 *     summary: Add Akun Status
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *               type: string
 *               example: Aktif
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
router.post("/status", AkunStatusController.store);

/**
 * @openapi
 * /status/{id}:
 *  get:
 *     tags:
 *     - Akun Status
 *     summary: Get Akun Status
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the Akun Status
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/status/:id", AkunStatusController.show);

/**
 * @openapi
 * /status/{id}:
 *  put:
 *     tags:
 *     - Akun Status
 *     summary: Update Akun Status
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the Akun Status
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *               type: string
 *               example: Aktif
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
router.put("/status/:id", AkunStatusController.update);

/**
 * @openapi
 * /status/{id}:
 *  delete:
 *     tags:
 *     - Akun Status
 *     summary: Delete Akun Status
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the Akun Status
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/status/:id", AkunStatusController.destroy);

module.exports = router;
