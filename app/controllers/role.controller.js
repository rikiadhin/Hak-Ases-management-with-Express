const prisma = require("../../prisma/prisma");
const index = async (req, res) => {
    try {
        const roles = await prisma.roles.findMany();
        return res.status(200).json({
            message: "get all data successfull!",
            data: roles
        });
    } catch (error) {
        console.error("error: ", error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
};

const store = async (req, res) => {
    try {
        const { nama, deskripsi } = req.body;
        const data = { nama, deskripsi };
        const role = await prisma.roles.create({ data });
        return res.status(200).json({
            message: "create data successfull!",
            data: role
        });
    } catch (error) {
        console.error("error : ", error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
};

const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID format!" });
        } else {
            const role = await prisma.roles.findUnique({
                where: { id }
            });
            if (!role) {
                return res.status(404).json({ message: "Data not found!" });
            } else {
                return res.status(200).json({
                    message: "get data successfull!",
                    data: role
                });
            }
        }
    } catch (error) {
        console.error("error: ", error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
};

const update = async (req, res) => {
    try {
        const { nama, deskripsi } = req.body;
        const data = { nama, deskripsi };
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID format!" });
        } else {
            const role = await prisma.roles.findUnique({
                where: { id }
            });
            if (!role) {
                return res.status(404).json({ message: "Data not found!" });
            } else {
                const role = await prisma.roles.update({
                    where: { id },
                    data: data
                });
                return res.status(200).json({
                    message: "update data successfull!",
                    data: role
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
};

const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID format!" });
        } else {
            const role = await prisma.roles.findUnique({
                where: { id }
            });
            if (!role) {
                return res.status(404).json({ message: "Data not found!" });
            } else {
                const role = await prisma.roles.delete({ where: { id } });
                return res.status(200).json({
                    message: "delete data successfull!",
                    data: role
                });
            }
        }
    } catch (error) {
        console.error("error: ", error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy
};
