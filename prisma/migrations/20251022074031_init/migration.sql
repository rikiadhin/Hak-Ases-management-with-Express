-- CreateTable
CREATE TABLE "akun" (
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "akun_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "akun_status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "akun_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "parent_id" INTEGER,
    "url" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order_no" INTEGER NOT NULL DEFAULT 0,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_menu" (
    "id" SERIAL NOT NULL,
    "id_role" INTEGER NOT NULL,
    "id_menu" INTEGER NOT NULL,

    CONSTRAINT "role_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "akun_role_status" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "id_akun_status" INTEGER NOT NULL DEFAULT 1,
    "id_role" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "akun_role_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_menu" ADD CONSTRAINT "role_menu_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_menu" ADD CONSTRAINT "role_menu_id_menu_fkey" FOREIGN KEY ("id_menu") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akun_role_status" ADD CONSTRAINT "akun_role_status_id_akun_status_fkey" FOREIGN KEY ("id_akun_status") REFERENCES "akun_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akun_role_status" ADD CONSTRAINT "akun_role_status_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akun_role_status" ADD CONSTRAINT "akun_role_status_email_fkey" FOREIGN KEY ("email") REFERENCES "akun"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
