import { HttpStatus } from "@nestjs/common";

export async function mapData(item:any,studentRepository:any){
    try {
      let student_data={
        name:item.name,
        dob:new Date(item.dob),
        email:item.email,
        phone:item.phone,
        address:item.address,
  
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