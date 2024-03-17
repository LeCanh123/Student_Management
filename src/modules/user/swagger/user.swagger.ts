import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';

export const Api={
    body_create:{ 
        description: 'Create a new user account',
        schema: {
          type: 'object',
          properties: {
            username: { type: 'string' ,default:"user"},
            email: { type: 'string' ,default:"username@gmail.com"},
            fullname: { type: 'string',default:"Nguyen Van A"},
            password: { type: 'string' ,default:"123456"},
            phone :  { type: 'string' ,default:"+84123456789"},
            avatar: {
                type: 'string',
                format: 'binary',
            },
            role:{
                type: "string",
                enum:["ADMIN","SUB_ADMIN","TEACHER"]
            }
          },
          required: ['username', 'password', 'email', 'fullname','phone']
        }
    },
    create_success:{
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
    },
    create_bad:{
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
    },
    body_login:{ 
        description: 'Login',
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string' ,default:"username@gmail.com"},
            password: { type: 'string' ,default:"123456"},
          },
          required: ['username', 'password', 'email', 'role']
        }
    },
    login_success:{
        status: 200,
        description: 'Login success',
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: 'string',
                    properties: {
                        // Các thuộc tính của đối tượng admin
                    }
                },
                message: {
                    type: 'string',
                    default:"Login success"
                }
            },
            required: ['admin', 'message']
        }
    },
    login_error:{
        status: 204,
        description: 'Error',
        schema: {
            type: 'object',
            properties: {
                error: {
                    type: 'string',
                    default:'Unauthorized'
                },
                message: {
                    type: 'string',
                    default:"Invalid email or password"
                }
            },
            required: ['admin', 'message']
        }
    },
    body_update:{ 
        description: 'Update',
        schema: {
          type: 'object',
          properties: {
            username: { type: 'string' ,default:"userupdate"},
            email: { type: 'string' ,default:"usernameupdate@gmail.com"},
            fullname: { type: 'string',default:"Nguyen Van Update"},
            password: { type: 'string' ,default:"123456"},
            phone :  { type: 'string' ,default:"+84123456789"},
            avatar: {
                type: 'string',
                format: 'binary',
            },
            role:{
                type: "string",
                enum:["ADMIN","SUB_ADMIN","TEACHER"]
            }
          },
          required: []
        }
    },
    update_success: {
        status: 200,
        description: 'Update user success',
        schema: {
            type: 'object',
            properties: {
                success: {
                    type: 'boolean',
                    properties: {
                    },
                    default: true
                },
                message: {
                    type: 'string',
                    default: "Update user success"
                }
            },
        }
    },
    update_not_found: {
        status: 404,
        description: 'Not Found',
        schema: {
            type: 'object',
            properties: {
                error: {
                    type: 'object',
                    default: "Not Found"
                },
                message: {
                    type: 'string',
                    default: "User with offer ID not found."
                }
            },
            required: []
        }
    },
    update_bad: {
        status: 400,
        description: 'Error: Bad Request',
        schema: {
            type: 'object',
            properties: {
                error: {
                    type: 'string',
                    properties: {
                    },
                    default: "Bad Request"
                },
                message: {
                    type: 'string',
                    default: "Data is invalid"
                },
                statusCode: {
                    type: "number",
                    default: 400
                }
            },
        }
    },
    search_success:{
        status: 200,
        description: 'Search teacher success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    dob: { type: 'string', format: 'date-time' },
                    email: { type: 'string',default:"teacher@gmail.com" },
                    phone: { type: 'string' ,default:"123456789"},
                    role:{}
                },
            }
        }
    },
    search_server_error:{
        status: 500,
        description: 'Internal Server Error',
        schema: {
            type: 'object',
            properties: {
                error: {
                    type: 'string',
                    properties: {
                    },
                    default: "error"
                },
                message: {
                    type: 'string',
                    default: "Internal Server Error"
                }
            },
        }
    },
}


const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new BadRequestException('Only image files are allowed!'), false);
    }
    cb(null, true);
  };
  
export const file_setup= FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${uuidv4()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
    fileFilter: imageFileFilter,
})