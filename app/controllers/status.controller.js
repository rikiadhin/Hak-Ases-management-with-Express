const prisma = require("../../prisma/prisma");
const index = async (req, res) => {
    try {
        const akun_status = await prisma.akun_status.findMany();
        return res.status(200).json({
            message: "get all data successfull!",
            data: akun_status
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
        const { status } = req.body;
        const data = {
            status
        };
        const akun_status = await prisma.akun_status.create({ data });
        return res.status(200).json({
            message: "create data successfull!",
            data: akun_status
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
            const akun_status = await prisma.akun_status.findUnique({
                where: { id }
            });
            if (!akun_status) {
                return res.status(404).json({ message: "Data not found!" });
            } else {
                return res
                    .status(200)
                    .json({ message: "get data successfull!", data: akun_status });
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
        const { status } = req.body;
        const data = { status };
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID format!" });
        } else {
            const check = await prisma.akun_status.findUnique({
                where: { id }
            });
            if (!check) {
                return res.status(404).json({ message: "Data not found!" });
            } else {
                const akun_status = await prisma.akun_status.update({
                    where: { id },
                    data: data
                });
                return res
                    .status(200)
                    .json({ message: "update data successfull!", data: akun_status });
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
            const check = await prisma.akun_status.findUnique({
                where: { id }
            });
            if (!check) {
                return res.status(404).json({ message: "Data not found!" });
            } else {
                const akun_status = await prisma.akun_status.delete({
                    where: { id }
                });
                return res
                    .status(200)
                    .json({ message: "delete data successfull!", data: akun_status });
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
