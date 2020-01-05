const IPAddress = '192.168.1.5';
const PORT = 5000;
const url = `http://${IPAddress}:${PORT}`;

function getImageURI(image) {
    return `${url}/${image}`;
}

function getItemURI() {
    return `${url}/items`;
}

function getUserURI() {
    return `${url}/users`;
}

function getOrderURI() {
    return `${url}/orders`;
}

export {
    IPAddress,
    PORT,
    url,
    getImageURI,
    getItemURI,
    getUserURI,
    getOrderURI
};
