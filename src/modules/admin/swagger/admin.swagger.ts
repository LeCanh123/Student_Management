import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

export const body_create = { 
    description: 'Create a new admin account',
    schema: {
        type: 'object',
        properties: {
          username: { type: 'string' ,default:"admin"},
          email: { type: 'string' ,default:"admin@gmail.com"},
          fullname: { type: 'string',default:"Nguyen Van C"},
          password: { type: 'string' ,default:"123456"},
          phone :  { type: 'string' ,default:"+84123456780"},
          avatar: {
              type: 'string',
              format: 'binary',
            }
  
        },
        required: ['username', 'password', 'email', 'fullname','phone']
      }
}

export const create_success ={
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
        type: 'object',
        properties: {
            admin: {
                type: 'object',
                properties: {
                    // Các thuộc tính của đối tượng admin
                }
            },
            message: {
                type: 'string',
                default:"Create new admin success"
            }
        },
        required: ['admin', 'message']
    }
}

export const create_bad ={
    status: 400,
    description: 'Error: Bad Request',
    schema: {
        type: 'object',
        properties: {
          error: {
                type: 'string',
                properties: {
                },
                default:"Bad Request"
            },
            message: {
                type: 'string',
                default:"email must be an email"
            },
            statusCode:{
              type:"number",
              default:400
            }
        },
    }
}

export const file_setup= FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${uuidv4()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
})