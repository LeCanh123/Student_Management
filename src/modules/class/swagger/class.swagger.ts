
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

export const file_setup = FileInterceptor('file', {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const filename = `${uuidv4()}-${file.originalname}`;
            cb(null, filename);
        },
    }),
})

export const Api={
    get_success:{
        status: 200,
        description: 'Get class success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    teacher: { type: 'string' },
                    max_students: { type: 'number' },
                    is_delete: { type: 'boolean' }
                },
            }
        }
    },
    get_error:{
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
    search_success:{
        status: 200,
        description: 'Search class success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    teacher: { type: 'string' },
                    max_students: { type: 'number' },
                    is_delete: { type: 'boolean' }
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
    get_by_id_success:{
        status: 200,
        description: 'Get class success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    teacher: { type: 'string' },
                    max_students: { type: 'number' },
                    is_delete: { type: 'boolean' }
                },
            }
        }
    },
    get_by_id_error:{
        status: 500,
        description: 'Internal Server Error',
        schema: {
            type: 'object',
            properties: {
              error: {
                    type: 'string',
                    properties: {
                    },
                    default:"error"
                },
                message: {
                    type: 'string',
                    default:"Internal Server Error"
                }
            },
        }
    },
    create_success:{
        status: 201,
        description: 'Create class course success',
        schema: {
            type: 'object',
            properties: {
              success: {
                    type: 'boolean',
                    properties: {
                    },
                    default:true
                },
                message: {
                    type: 'string',
                    default:"Create new class success"
                }
            },
        }
    },
    create_error_bad :{
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
                    default:"Data is invalid"
                },
                statusCode:{
                  type:"number",
                  default:400
                }
            },
        }
    },
    body_create:{ 
        description: 'Create a new class',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' ,default :"Class Name"},
            teacher_id: { type: 'number', default:1 },
            course_id: { type: 'number', default:1 },
            max_students: { type: 'number', default:10},
          },
          required: ['name', 'teacher', 'course_id', 'max_students']
        }
    },
    add_student_success:{
        status: 201,
        description: 'Add class success',
        schema: {
            type: 'object',
            properties: {
              success: {
                    type: 'boolean',
                    properties: {
                    },
                    default:true
                },
                message: {
                    type: 'string',
                    default:"Add class success"
                }
            },
        }
    },
    add_student_error_bad :{
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
                    default:"Data is invalid"
                },
                statusCode:{
                  type:"number",
                  default:400
                }
            },
        }
    },
    body_add_student:{ 
        description: 'Add student into class',
        schema: {
          type: 'object',
          properties: {
            student_id: { type: 'number' ,default:1},
            class_id: { type: 'number' ,default:1},
          },
          required: ['student_id', 'class_id']
        }
    },
    async_with_excel_success: {
        status: 200,
        description: 'Get course success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', default: true },
                    message: { type: 'string', default: "Async student success" },

                },
            }
        }
    },
    async_with_excel_failed: {
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
    body_async_with_excel: {
        description: 'Async student with exel',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                }
            },
            required: []
        }
    },
    update_success :{
        status: 201,
        description: 'Update class success',
        schema: {
            type: 'object',
            properties: {
              success: {
                    type: 'boolean',
                    properties: {
                    },
                    default:true
                },
                message: {
                    type: 'string',
                    default:"Update class success"
                }
            },
        }
    },
    update_not_found :{
        status: 404,
        description: 'Not Found',
        schema: {
            type: 'object',
            properties: {
                error: {
                    type: 'object',
                    default:"Not Found"
                },
                message: {
                    type: 'string',
                    default:"Class with offer ID not found."
                }
            },
            required: ['admin', 'message']
        }
    },
    update_bad:{
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
                    default:"Data is invalid"
                },
                statusCode:{
                  type:"number",
                  default:400
                }
            },
        }
    },
    body_update:{ 
        description: 'Update class',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string',default:"Class name" },
            teacher_id: { type: 'number',default: 1 },
            course_id: { type: 'number',default: 1 },
            max_students: { type: 'number',default:100},
          },
          required: []
        }
    },
    delete_success :{
        status: 201,
        description: 'Delete class success',
        schema: {
            type: 'object',
            properties: {
              success: {
                    type: 'boolean',
                    properties: {
                    },
                    default:true
                },
                message: {
                    type: 'string',
                    default:"Delete class success"
                }
            },
        }
    },
    delete_not_found:{
        status: 404,
        description: 'Not Found',
        schema: {
            type: 'object',
            properties: {
                error: {
                    type: 'object',
                    default:"Not Found"
                },
                message: {
                    type: 'string',
                    default:"Class with offer ID not found."
                }
            },
            required: ['admin', 'message']
        }
    },
    delete_bad :{
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
                    default:"Data is invalid"
                },
                statusCode:{
                  type:"number",
                  default:400
                }
            },
        }
    },
}


