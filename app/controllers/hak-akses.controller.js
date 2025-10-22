const prisma = require("../../prisma/prisma");
const store_menu = async (req, res) => {
    try {
        const { role_menus } = req.body;
        const id_role = role_menus[0].id_role;
        const check_id_role = await prisma.roles.findUnique({
            where: { id: id_role },
        })
        if (!check_id_role) {
            return res.status(404).json({ message: "Data role not found!" });
        } else {
            const [delete_data, create_data] = await prisma.$transaction([
                prisma.role_menu.deleteMany({
                    where: { id_role: id_role },
                }),
                prisma.role_menu.createMany({
                    data: role_menus,
                    skipDuplicates: true,
                }),
            ]);
            if (create_data.count == 0) {
                return res.status(400).json({ message: "Insert failed: Some foreign key references do not exist" });
            }
            return res.status(200).json({ message: "create data successfull!", data: create_data });
        }
    } catch (error) {
        console.error("error : ", error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
};

const store_role = async (req, res) => {
    try {
        const { akun_roles } = req.body;
        const email = akun_roles[0].email;
        const check_user = await prisma.akun.findUnique({
            where: { email },
        })
        if (!check_user) {
            return res.status(404).json({ message: "Data user not found!" });
        } else {
            const [delete_data, create_data] = await prisma.$transaction([
                prisma.akun_role_status.deleteMany({
                    where: { email },
                }),
                prisma.akun_role_status.createMany({
                    data: akun_roles,
                    skipDuplicates: true,
                }),
            ]);
            if (create_data.count == 0) {
                return res.status(400).json({ message: "Insert failed: Some foreign key references do not exist" });
            }
            return res.status(200).json({ message: "create data successfull!", data: create_data });
        }
    } catch (error) {
        console.error("error : ", error);
        return res.redirect("/home");
    }
};

module.exports = {
    store_menu,
    store_role
};