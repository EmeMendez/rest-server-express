
const { v4 : uuid } = require('uuid');
const path = require('path');
const fs = require('fs');

const saveFile = ( file, folder = '' ) => {
    const [fileExtension] = file.name.split('.').slice(-1) 
    const fileName = `${uuid()}.${fileExtension}`;
    const uploadPath = path.join(__dirname,`../storage/${folder}`,fileName);
    const indexOfUploadPath = uploadPath.indexOf("\\storage");
    const fileDestiny = `${uploadPath.substring(indexOfUploadPath).replaceAll("\\",'/')}`;
    file.mv(uploadPath);
    return fileDestiny;
}

const deleteFile = (path) => {
    if (fs.existsSync(path)) {
        fs.unlink(path,(err) => {
            if (err) throw err;
            return true;
        });
    }
}

module.exports = { saveFile,deleteFile };