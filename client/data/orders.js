function randomDate() {
    let date = new Date();
    date.setFullYear(Math.floor(Math.random() * 10 + 2010));
    date.setMonth(Math.floor(Math.random() * 12) + 1);
    date.setDate(Math.floor(Math.random() * 31) + 1);
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));
    date.setSeconds(Math.floor(Math.random() * 60));
    return date;
}

const orders = [
    {
        _id: 0,
        totalPrice: 350000,
        createdAt: randomDate(),
        status: 'waiting',
    },
    {
        _id: 1,
        totalPrice: 350000,
        createdAt: randomDate(),
        status: 'waiting',
    },
    {
        _id: 2,
        totalPrice: 24000,
        createdAt: randomDate(),
        status: 'waiting',
    },
    {
        _id: 3,
        totalPrice: 37000,
        createdAt: randomDate(),
        status: 'waiting',
    },
    {
        _id: 4,
        totalPrice: 550000,
        createdAt: randomDate(),
        status: 'waiting',
    },
    {
        _id: 5,
        totalPrice: 320000,
        createdAt: randomDate(),
        status: 'waiting',
    },
    {
        _id: 6,
        totalPrice: 140000,
        createdAt: randomDate(),
        status: 'received',
    },
    {
        _id: 7,
        totalPrice: 230000,
        createdAt: randomDate(),
        status: 'received',
    },
    {
        _id: 8,
        totalPrice: 440000,
        createdAt: randomDate(),
        status: 'received',
    },
    {
        _id: 9,
        totalPrice: 60000,
        createdAt: randomDate(),
        status: 'received',
    },
    {
        _id: 10,
        totalPrice: 86000,
        createdAt: randomDate(),
        status: 'received',
    },
    {
        _id: 11,
        totalPrice: 90000,
        createdAt: randomDate(),
        status: 'received',
    },
    {
        _id: 12,
        totalPrice: 77000,
        createdAt: randomDate(),
        status: 'completed',
    },
    {
        _id: 13,
        totalPrice: 213000,
        createdAt: randomDate(),
        status: 'completed',
    },
    {
        _id: 14,
        totalPrice: 543000,
        createdAt: randomDate(),
        status: 'completed',
    },
    {
        _id: 15,
        totalPrice: 234000,
        createdAt: randomDate(),
        status: 'completed',
    },
    {
        _id: 16,
        totalPrice: 36000,
        createdAt: randomDate(),
        status: 'completed',
    },
    {
        _id: 17,
        totalPrice: 45000,
        createdAt: randomDate(),
        status: 'completed',
    },
    {
        _id: 18,
        totalPrice: 450000,
        createdAt: randomDate(),
        status: 'completed',
    }
];


export default orders;
