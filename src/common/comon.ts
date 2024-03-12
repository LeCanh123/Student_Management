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