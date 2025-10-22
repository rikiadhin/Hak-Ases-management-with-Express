const query_menu = {
    email: true,
    first_name: true,
    last_name: true,
    akun_role_status: {
        take: 1,
        orderBy: { createdAt: 'asc' },
        select: {
            akun_status: {
                select: {
                    status: true
                }
            },
            roles: {
                select: {
                    id: true,
                    nama: true,
                    role_menu: {
                        select: {
                            menus: {
                                select: {
                                    nama: true,
                                    parent_id: true,
                                    children: {
                                        select: {
                                            nama: true,
                                            parent_id: true,
                                            children: {
                                                select: {
                                                    nama: true,
                                                    parent_id: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const change_role_properties = (id_role) => {
    return {
        email: true,
        first_name: true,
        last_name: true,
        akun_role_status: {
            where: { id_role },
            select: {
                akun_status: {
                    select: {
                        status: true
                    }
                },
                roles: {
                    select: {
                        id: true,
                        nama: true,
                        role_menu: {
                            select: {
                                menus: {
                                    select: {
                                        nama: true,
                                        parent_id: true,
                                        children: {
                                            select: {
                                                nama: true,
                                                parent_id: true,
                                                children: {
                                                    select: {
                                                        nama: true,
                                                        parent_id: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};

module.exports = { query_menu, change_role_properties }