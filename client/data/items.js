const items = [
    {
        name: 'Trà sữa sầu riêng bốn mùa',
        price: 28000,
        uri: 'https://pozaatea.vn/wp-content/uploads/2019/01/sầu-riêng.png',
        category: 'Trà sữa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Trà sữa cafe Obama',
        price: 32000,
        uri: 'https://pozaatea.vn/wp-content/uploads/2018/04/cafe-thượng-hạng.png',
        category: 'Trà sữa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Trà sữa nướng',
        price: 32000,
        uri: 'https://pozaatea.vn/wp-content/uploads/2019/06/tra-sua-nuong-1.png',
        category: 'Trà sữa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Trà sữa bạc hà trân châu đen',
        price: 32000,
        uri: 'https://pozaatea.vn/wp-content/uploads/2019/05/bac-ha-tran-chau-den.png',
        category: 'Trà sữa',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Cà phê đen',
        price: 28000,
        uri: 'https://product.hstatic.net/1000075078/product/vnese_coffee_master.jpg',
        category: 'Cà phê',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Americano',
        price: 39000,
        uri: 'https://product.hstatic.net/1000075078/product/americano_master.jpg',
        category: 'Cà phê',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Bạc sỉu',
        price: 29000,
        uri: 'https://product.hstatic.net/1000075078/product/white_vnese_coffee_9968c1184d7f4634a9bb9fce7b5ff313_master.jpg',
        category: 'Cà phê',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Cà phê sữa',
        price: 29000,
        uri: 'https://product.hstatic.net/1000075078/product/cfs_master.jpg',
        category: 'Cà phê',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Caramel Macchiato',
        price: 55000,
        uri: 'https://product.hstatic.net/1000075078/product/caramel_macchiato_b6f694f469794e12b04a91845f5fce2d_master.jpg',
        category: 'Cà phê',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Espresso',
        price: 35000,
        uri: 'https://product.hstatic.net/1000075078/product/espresso_master.jpg',
        category: 'Cà phê',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Trà Cherry Macchiato',
        price: 55000,
        uri: 'https://product.hstatic.net/1000075078/product/cherry_mac_6a3403fdb832464da88de8c6e6ddf662_master.jpg',
        category: 'Trà',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Trà Matcha Latte',
        price: 59000,
        uri: 'https://product.hstatic.net/1000075078/product/matcha_latte_master.jpg',
        category: 'Trà',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Trà Oolong sen An Nhiên',
        price: 45000,
        uri: 'https://product.hstatic.net/1000075078/product/trasen_29e9b22739f941ff84671361ae53f3dd_master.jpg',
        category: 'Trà',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Trà Oolong vải Như Ý',
        price: 45000,
        uri: 'https://product.hstatic.net/1000075078/product/travai_master.jpg',
        category: 'Trà',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    },
    {
        name: 'Trà Phúc Bồn Tử',
        price: 49000,
        uri: 'https://product.hstatic.net/1000075078/product/tea_raspberry_fda1ba90f506483eb6568f433690173a_master.png',
        category: 'Trà',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus pulvinar neque, sed interdum velit malesuada sollicitudin. Proin ornare blandit nulla. Quisque at ornare nisl, eget ullamcorper ligula. In ullamcorper justo at interdum lacinia. Praesent venenatis ultrices sapien id faucibus. Mauris eu massa vitae risus auctor mattis a ut elit. Donec eu dolor nisi. Etiam auctor libero sit amet vulputate imperdiet. Aenean pharetra odio ut nibh commodo, id tincidunt diam interdum. Fusce ultricies sodales neque pretium dignissim. Cras aliquet vitae tellus vitae mollis. Ut vel sapien a nibh tincidunt malesuada. Vestibulum maximus ante non nisi dignissim hendrerit ut eget augue'
    }
];

export default items;
