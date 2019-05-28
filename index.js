module.exports = function writeUTF(str) {
    const length = str.length;
    let utflen = 0;
    for (let i = 0; i < length; i++) {
        let c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            utflen++;
        } else if (c > 0x07FF) {
            utflen += 3;
        } else {
            utflen += 2;
        }
    }
    const bytearr = Buffer.alloc(utflen + 2);
    let count = 0;
    bytearr[count++] = ((utflen >>> 8) & 0xFF);
    bytearr[count++] = ((utflen >>> 0) & 0xFF);
    for (let i = 0; i < length; i++) {
        let c = str.codePointAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            bytearr[count++] = c;
        } else if (c > 0x07FF) {
            bytearr[count++] = (0xE0 | ((c >> 12) & 0x0F));
            bytearr[count++] = (0x80 | ((c >> 6) & 0x3F));
            bytearr[count++] = (0x80 | ((c >> 0) & 0x3F));
        } else {
            bytearr[count++] = (0xC0 | ((c >> 6) & 0x1F));
            bytearr[count++] = (0x80 | ((c >> 0) & 0x3F));
        }
    }
    return bytearr;
}