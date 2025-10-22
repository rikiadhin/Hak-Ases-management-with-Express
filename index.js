// server.js
require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const prisma = require('./prisma/prisma');
const swaggerDocs = require("./swagger");
const bodyParser = require("body-parser");

/**
 * Inisialisasi dan konfigurasi aplikasi Express
 * @returns {Express.Application}
 */
function createApp() {
    const app = express();

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));

    // Routes
    routes(app, "/");

    // Swagger Docs
    swaggerDocs.swagger(app);

    // Test route
    app.get("/", (req, res) => {
        res.render("welcome", {
            text: "Hello, It's Work!",
        });
    });

    return app;
}

// Ambil port dari env atau default 3000
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Inisialisasi dan mulai server
async function startServer() {
    try {
        const app = createApp();

        await prisma.$connect();
        console.log("Connected to the database");
        app.listen(PORT, () => {
            console.log(`Server running at http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

startServer();
