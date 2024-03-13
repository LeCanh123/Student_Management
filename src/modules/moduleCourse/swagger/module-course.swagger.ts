import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

export const file_setup= FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${uuidv4()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
})

export const Api ={
    get_success:{
        status: 200,
        description: 'Get module course success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string', default:"Module course name" },
                    duration: { type: 'number', default:100 },
                    status: { type: 'boolean', default:true },
                    course:{}
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
    async_with_excel_success:{
        status: 200,
        description: 'Get course success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    success: { type: 'boolean',default:true },
                    message: { type: 'string',default: "Async student success" },
                    
                },
            }
        }
    },
    async_with_excel_failed:{
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
    body_async_with_excel:{
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
    search_success:{
        status: 200,
        description: 'Search module course success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string', default:"Module course name" },
                    duration: { type: 'number', default:100 },
                    status: { type: 'boolean', default:true },
                    course:{}
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
    get_by_id_success: {
        status: 200,
        description: 'Get module course success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string', default:"Module course name" },
                    duration: { type: 'number', default:100 },
                    status: { type: 'boolean', default:true },
                    course:{}
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
        description: 'Create module course success',
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
                    default:"Create new module course success"
                }
            },
        }
    },
    create_error_bad:{
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
        description: 'Create a new module course',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            duration: { type: 'number',default:100  },
            course_id: { type: 'number',default:1  },
            
          },
          required: []
        }
    },
    update_success:{
        status: 200,
        description: 'Update module course success',
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
                    default:"Update module course success"
                }
            },
        }
    },
    update_not_found:{
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
                    default:"student with offer ID not found."
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
    body_update: { 
        description: 'Update module course',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            duration: { type: 'number',default:100  },
            course_id: { type: 'number',default:1  },
          },
          required: []
        }
    },
    delete_success:{
        status: 201,
        description: 'Delete module course success',
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
                    default:"Delete module course success"
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
                    default:"Module course with offer ID not found."
                }
            },
            required: []
        }
    },
    delete_bad:{
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
    }
}