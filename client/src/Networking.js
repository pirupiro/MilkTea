const IPAddress = '192.168.1.5';
const PORT = 5000;
const url = `http://${IPAddress}:${PORT}`;

function getImageURI(image) {
    return `${url}/${image}`;
}

function getItemURI(id='') {
    return `${url}/items/${id}`;
}

function getUserURI(id='') {
    return `${url}/users/${id}`;
}

export {
    IPAddress,
    PORT,
    url,
    getImageURI,
    getItemURI,
    getUserURI
};
