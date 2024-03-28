import { HttpStatus } from "@nestjs/common";
const ExcelDateToJSDate = (serial) => {
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400;
  const dateInfo = new Date(utcValue * 1000);

  const year = dateInfo.getFullYear();
  const month = dateInfo.getMonth() + 1;
  const day = dateInfo.getDate();

  return `${year}/${month}/${day}`; // hoặc định dạng ngày tháng khác nếu bạn muốn
};

export async function mapData(class_id:any,item:any,studentRepository:any){
    try {
      console.log("item.dob",item.dob);
      const birthDay=ExcelDateToJSDate(item.dob)
      console.log("birthDay",birthDay);
      
      let student_data={
        name:item.name,
        dob:new Date(birthDay),
        email:item.email,
        phone:item.phone,
        address:item.address,
        status:item.status,
        class:{id:class_id}
      }
      let checkEmail = await studentRepository.findBy({
        email:item.email
      })
      if(checkEmail.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Email already exists"
          }
        };
      }
      let checkPhone = await studentRepository.findBy({
        phone:Number(item.phone)
      })
      if(checkPhone.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Phone number already exists"
          }
        };
      }
      const newstudent = await studentRepository.save({
        ...student_data,
        phone:Number(student_data.phone)
      });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Create new student success"
        }
      };
    }
    catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          error: "Bad Request",
          message: "Data is invalid. Please check and try again."
        }
      };
    }
  }