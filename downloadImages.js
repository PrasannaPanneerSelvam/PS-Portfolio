// const https = require('https');
import fs from 'fs';
import fetch from "node-fetch";

Array.prototype.at = function (idx) {
    if (idx >= 0) return this[idx];
    return this[this.length + idx];
}

let idx = 0;

var download = function (imageUrl, filename) {
    fetch(imageUrl)
        .then((response) => response.buffer())
        .then((buffer) => {
            // Write the buffer to a file
            const fileNam = filename(idx++);
            fs.writeFileSync(fileNam, buffer);
            console.log(fileNam, imageUrl)
        })
        .catch((error) => {
            // console.error("Error on downloading", imageUrl);
        });
};

const imageUrls = JSON.parse(fs.readFileSync('./planetUrls.json', { encoding: 'utf-8' }));


for (const imageUrl of imageUrls) {
    const format = imageUrl.split('/').at(-1).split('.').at(-1);
    download(imageUrl, (i) => `./images/image-${i}.${format}`, function () {
        console.log('done');
    });
}