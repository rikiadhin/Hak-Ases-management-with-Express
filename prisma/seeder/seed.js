const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/prisma');

async function main() {
    const superadmin = await bcrypt.hash('superadmin', 10);
    const data_roles = [
        { nama: 'superadmin', deskripsi: 'ini role untuk super super admin' },
        { nama: 'admin', deskripsi: 'ini role untuk admin' },
        { nama: 'user', deskripsi: 'ini role untuk user' },
    ];

    const data_menus = [
        {
            nama: 'Dashboard',
            url: '/dashboard',
            icon: '',
            order_no: 1,
            deskripsi: 'Menu untuk menampilkan overall data / statistik',
            parent_id: null
        },
        {
            nama: 'Management',
            url: '/management',
            icon: 'fa-user-group',
            order_no: 2,
            deskripsi: 'Menu softskill untuk mahasiswa berisi sub menu PK, KK, AM',
            parent_id: null
        },
        {
            nama: 'User',
            url: '/user',
            icon: 'fa-user',
            order_no: 3,
            deskripsi: 'Menu prestasi untuk mahasiswa',
            parent_id: 2
        },
        {
            nama: 'Hak Akses',
            url: '/hak-akses',
            icon: 'fa-setting',
            order_no: 4,
            deskripsi: 'Menu panduan untuk semua user berisi panduan pengguaan sistem',
            parent_id: 2
        },
        {
            nama: 'Role',
            url: '/access-menu',
            icon: 'fa-user',
            order_no: 5,
            deskripsi: 'Menu untuk superadmin melakukan management data',
            parent_id: 4
        },
        {
            nama: 'Menu',
            url: '/access-role',
            icon: 'fa-user',
            order_no: 6,
            deskripsi: 'Menu untuk superadmin melakukan management data',
            parent_id: 4
        },
    ];

    const data_akun = [
        { first_name: 'Admin', last_name: 'Superadmin', email: 'superadmin@example.com', password: superadmin },
        { first_name: 'Admin', last_name: 'Biasa', email: 'admin@example.com', password: superadmin },
        { first_name: 'User', last_name: 'Pro', email: 'user@example.com', password: superadmin },
    ];

    const data_akun_status = [
        { status: 'Active' },
        { status: 'Inactive' },
        { status: 'Banned' },
    ];

    const data_akun_role_status = [
        { id_akun_status: 1, id_role: 1, email: 'superadmin@example.com' },
        { id_akun_status: 1, id_role: 2, email: 'admin@example.com' },
        { id_akun_status: 1, id_role: 3, email: 'user@example.com' },
    ];

    await prisma.$transaction(async (tx) => {
        await tx.akun.createMany({ data: data_akun });
        await tx.roles.createMany({ data: data_roles });
        await tx.akun_status.createMany({ data: data_akun_status });
        await tx.menus.createMany({ data: data_menus });
        await tx.akun_role_status.createMany({ data: data_akun_role_status });
    });
    console.log('data seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });