const path = require('path');
const fs = require('fs');

export const delete_file=(finalPAth:any)=>{
    if (fs.existsSync(finalPAth)) {
        fs.unlink(finalPAth, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Đã xóa tệp ${finalPAth} thành công`);
        });
        } else {
            console.log(`Tệp ${finalPAth} không tồn tại`);
        }
}

// Hàm để copy file
const copyFile = (source: string, destination: string) => {
    fs.copyFileSync(source, destination);
};
// Hàm để xoá file
const deleteFile = (filePath: string) => {
    fs.unlinkSync(filePath);
};
const getFileExtension = (filename: string) => {
    return path.extname(filename).toLowerCase();
};

export const common={
    uploadFile:async(file:any)=>{
        try {
            const fileExtension = getFileExtension(file.originalname);
            const newFileName = `${Date.now()}${fileExtension}`;
            const destinationPath = path.join('dist', 'public', newFileName);
            await copyFile(file.path, destinationPath);
            await deleteFile(file.path);
            return {name:`${process.env.SERVER_HOST}${newFileName}`}
          } catch (error) {
            return {name:null}
          }
    }
}