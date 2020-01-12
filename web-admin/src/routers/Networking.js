const IPAddress = "192.168.1.119";
const Address = "localhost";
const PORT = 5000;
const url = `http://${Address}:${PORT}`;

function getImageURI(image) {
    return `${url}/${image}`;    
}
function ImagePath(image) {
    return getImageURI(image).replace('\\', '/');
}

export { IPAddress, PORT, url, getImageURI, ImagePath };
