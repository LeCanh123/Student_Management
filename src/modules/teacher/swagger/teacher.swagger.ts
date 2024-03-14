export const Api={
    get_success:{
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
                    email: { type: 'string',default:"teacher@gmail.com" },
                    phone: { type: 'string',default: "123456789"},
                    address: { type: 'string',default:"79 Dien bien phu, P.Dakao, Q1" },
                    is_delete: { type: 'boolean' },
                    class:{}
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
                    address: { type: 'string',default:"79 Dien bien phu, P.Dakao, Q1"  },
                    is_delete: { type: 'boolean' },
                    class:{}
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
        description: 'Get teacher success',
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
                    address: { type: 'string',default:"79 Dien bien phu, P.Dakao, Q1"  },
                    is_delete: { type: 'boolean' },
                    class:{}
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
        description: 'Create teacher course success',
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
                    default:"Create new teacher success"
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
        description: 'Create a new teacher',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string',default: "Teacher name" },
            dob: { type: 'string', format: 'date-time'  },
            email: {type: 'string' ,default:"teacher@gmail.com"},
            phone: { type: 'string',default:"123456789"},
            address: { type: 'string',default:"39 Dien bien phu, P.Dakao, Q1"},
          },
          required: []
        }
    },
    update_success:{
        status: 201,
        description: 'Update teacher success',
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
                    default:"Update teacher success"
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
                    default:"Teacher with offer ID not found."
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
        description: 'Update teacher',
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            dob: { type: 'string', format: 'date-time'  },
            email: {type: 'string' ,default:"teacher-update@gmail.com"},
            phone: { type: 'number'},
            address: { type: 'string',default:"79 Dien bien phu, P.Dakao, Q1"},
          },
          required: []
        }
    },
    delete_success:{
        status: 201,
        description: 'Delete teacher success',
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
                    default:"Delete teacher success"
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
                    default:"Teacher with offer ID not found."
                }
            },
            required: ['admin', 'message']
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
    },
}


