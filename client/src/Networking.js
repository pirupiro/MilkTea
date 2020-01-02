const IPAddress = '192.168.1.119';
const PORT = 5000;
const url = `http://${IPAddress}:${PORT}`;

function getImageURI(image) {
    return `${url}/${image}`;
}

export { IPAddress, PORT, url, getImageURI };
