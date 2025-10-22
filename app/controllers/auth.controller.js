const bcrypt = require('bcryptjs');
const jsonwebtoken = require("jsonwebtoken");
const prisma = require('../../prisma/prisma');
const { query_menu, change_role_properties } = require('../query/menu');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.akun.findUnique({
            select: { email: true, first_name: true, last_name: true, password: true },
            where: { email }
        });
        if (!user) {
            res.status(404).json({ message: 'user not found!' });
        } else {
            const check = await bcrypt.compare(password, user.password);
            if (!check) {
                res.status(400).json({ message: 'invalid password!' });
            } else {
                const menus = await prisma.akun.findUnique({
                    where: { email },
                    select: query_menu
                })
                const token = jsonwebtoken.sign(user, process.env.APP_KEY, {
                    expiresIn: "5h",
                });
                res.status(200).json({ message: 'login successfull', data: token, hak_akses: menus });
            }
        }
    } catch (error) {
        console.error('error : ', error);
        return res.status(500).json('internal server error!');
    }
};

const register = async (req, res) => {
    try {
        const email = req.body.email;
        const check = await prisma.akun.findUnique({
            where: { email }
        });
        if (check) {
            return res.status(400).json({ message: 'email already exist, please another!' });
        } else {
            const { first_name, last_name, email, password } = req.body;
            const data = {
                first_name,
                last_name,
                email,
                password: await bcrypt.hash(password, 10)
            };
            const data_role = {
                email,
                id_role: 3,
                id_akun_status: 1
            }
            await Promise.all([
                prisma.akun.create({ data }),
                prisma.akun_role_status.create({ data: data_role }),
            ]);
            return res.status(200).json({ message: 'register successfull' });
        }

    } catch (error) {
        console.error('error : ', error);
        return res.status(500).json('internal server error!');
    }
};

const change_role = async (req, res) => {
    try {
        const { email, id_role } = req.body;
        const user = await prisma.akun.findUnique({
            where: {
                email,
                akun_role_status: {
                    some: { id_role },
                },
            },
            select: change_role_properties(id_role),
        });
        return res.status(200).json({ message: 'change role successfull', hak_akses: user });
    } catch (error) {
        console.error('error : ', error);
        return res.status(500).json('internal server error!');
    }
};

module.exports = {
    login,
    register,
    change_role
};
