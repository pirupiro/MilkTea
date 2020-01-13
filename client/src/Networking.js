const IPAddress = '172.20.10.6';
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
