const prisma = require("../../prisma/prisma");
const index = async (req, res) => {
	try {
		const menus = await prisma.menus.findMany();
		return res.status(200).json({
			message: "get all data successfull!",
			data: menus
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
		const { nama, parent_id, url, icon, order_no, deskripsi } = req.body;
		const data = {
			nama,
			parent_id,
			url,
			icon,
			order_no,
			deskripsi
		};
		const menu = await prisma.menus.create({ data });
		return res.status(200).json({
			message: "create data successfull!",
			data: menu
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
			const menu = await prisma.menus.findUnique({ where: { id } });
			if (!menu) {
				return res.status(404).json({ message: "Data not found!" });
			} else {
				const menu = await prisma.menus.findUnique({ where: { id } });
				return res.status(200).json({
					message: "get data successfull!",
					data: menu
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
		const { nama, parent_id, url, icon, order_no, deskripsi } = req.body;
		const data = {
			nama,
			parent_id,
			url,
			icon,
			order_no,
			deskripsi
		};
		const id = parseInt(req.params.id, 10);
		if (isNaN(id)) {
			return res.status(400).json({ message: "Invalid ID format!" });
		} else {
			const menu = await prisma.menus.findUnique({ where: { id } });
			if (!menu) {
				return res.status(404).json({ message: "Data not found!" });
			} else {
				const menu = await prisma.menus.update({
					where: { id },
					data: data
				});
				return res.status(200).json({
					message: "update data successfull!",
					data: menu
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
			const menu = await prisma.menus.findUnique({ where: { id } });
			if (!menu) {
				return res.status(404).json({ message: "Data not found!" });
			} else {
				const menu = await prisma.menus.delete({ where: { id } });
				return res.status(200).json({
					message: "delete data successfull!",
					data: menu
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
