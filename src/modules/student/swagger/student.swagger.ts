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

export const Api = {
    get_success: {
        status: 200,
        description: 'Get course success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    dob: { type: 'string', format: 'date-time' },
                    email: { type: 'string', default: "student@gmail.com" },
                    status: { type: 'boolean', default: true },
                    phone: { type: 'string', default: "123456789" },
                    address: { type: 'string', default: "79 Dien bien phu, P.Dakao, Q1" },
                    create_at: { type: 'string', format: 'date-time' },
                    update_at: { type: 'string', format: 'date-time' },
                    is_delete: { type: 'boolean' },
                    class: {type:"object"}
                },
            }
        }
    },
    get_error: {
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
    search_success: {
        status: 200,
        description: 'Search student success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    dob: { type: 'string', format: 'date-time' },
                    email: { type: 'string', default: "student@gmail.com" },
                    phone: { type: 'string', default: "123456789" },
                    address: { type: 'string', default: "79 Dien bien phu, P.Dakao, Q1" },
                    is_delete: { type: 'boolean' },
                    class: {}
                },
            }
        }
    },
    search_server_error: {
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
        description: 'Get student success',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    dob: { type: 'string', format: 'date-time' },
                    email: { type: 'string', default: "student@gmail.com" },
                    phone: { type: 'string', default: "123456789" },
                    address: { type: 'string', default: "79 Dien bien phu, P.Dakao, Q1" },
                    is_delete: { type: 'boolean' },
                    class: {}
                },
            }
        }
    },
    get_by_id_error: {
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
    create_success: {
        status: 201,
        description: 'Create student course success',
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
                    default: "Create new student success"
                }
            },
        }
    },
    create_error_bad: {
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
    body_create: {
        description: 'Create a new student',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', default: "Student name" },
                dob: { type: 'string', format: 'date-time' },
                email: { type: 'string', default: "student@gmail.com" },
                phone: { type: 'string', default: "123456789" },
                address: { type: 'string', default: "39 Dien bien phu, P.Dakao, Q1" },
            },
            required: []
        }
    },
    update_success: {
        status: 201,
        description: 'Update student success',
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
                    default: "Update student success"
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
                    default: "student with offer ID not found."
                }
            },
            required: ['admin', 'message']
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
    body_update: {
        description: 'Update student',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                dob: { type: 'string', format: 'date-time' },
                email: { type: 'string', default: "student-update@gmail.com" },
                phone: { type: 'number' },
                address: { type: 'string', default: "79 Dien bien phu, P.Dakao, Q1" },
            },
            required: []
        }
    },
    delete_success: {
        status: 201,
        description: 'Delete student success',
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
                    default: "Delete student success"
                }
            },
        }
    },
    delete_not_found: {
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
                    default: "student with offer ID not found."
                }
            },
            required: ['admin', 'message']
        }
    },
    delete_bad: {
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
}

