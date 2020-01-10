const IPAddress = "localhost";
const PORT = 5000;
const url = `http://${IPAddress}:${PORT}`;

function getImageURI(image) {
    return `${url}/${image}`;    
}
function ImagePath(image) {
    return getImageURI(image).replace('\\', '/');
}

export { IPAddress, PORT, url, getImageURI, ImagePath };
