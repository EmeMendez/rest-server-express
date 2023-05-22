
const { v4 : uuid } = require('uuid');
const path = require('path');

const saveFile = ( file, folder = '' ) => {
    const [fileExtension] = file.name.split('.').slice(-1) 
    const fileName = `${uuid()}.${fileExtension}`;
    const uploadPath = path.join(__dirname,`../storage/${folder}`,fileName);

    let indexOfUploadPath;
    let fileDestiny;
    if(folder){
        indexOfUploadPath = uploadPath.indexOf(folder);
        fileDestiny = `${uploadPath.substring(indexOfUploadPath).replaceAll("\\",'/')}`;
    }else{
        indexOfUploadPath = uploadPath.indexOf(fileName);
        fileDestiny = `${uploadPath.substring(indexOfUploadPath).replaceAll("\\",'/')}`;
    }
    file.mv(uploadPath);

    return fileDestiny;
}

module.exports = { saveFile };