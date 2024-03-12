
export const get_success = {
    status: 200,
    description: 'Get class member success',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                student: { type: 'object' },
                class: { type: 'object' },
                is_delete: { type: 'boolean' }
            },
        }
    }
};

export const get_error = {
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
};

export const search_success = {
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
}

export const search_server_error = {
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
}

export const get_by_id_success = {
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
}

export const get_by_id_error = {
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
}

export const create_success = {
    status: 201,
    description: 'Add class member success',
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
                default:"Add class member success"
            }
        },
    }
}

export const create_error_bad ={
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

export const body_create={ 
    description: 'Add class members',
    schema: {
      type: 'object',
      properties: {
        class_id: { type: 'number' },
        student_id: { type: 'number' },
      },
      required: []
    }
}

export const update_success ={
    status: 201,
    description: 'Update class member success',
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
                default:"Update class member success"
            }
        },
    }
}

export const update_not_found ={
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
                default:"Class member with offer ID not found."
            }
        },
        required: []
    }
}

export const update_bad = {
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

export const body_update = { 
    description: 'Update class member',
    schema: {
      type: 'object',
      properties: {
        class_id: { type: 'number',default: 1 },
        student_id: { type: 'number',default: 1 },
      },
      required: []
    }
}

export const delete_success ={
    status: 201,
    description: 'Delete class member success',
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
                default:"Delete class member success"
            }
        },
    }
}


export const delete_not_found = {
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
                default:"Class member with offer ID not found."
            }
        },
        required: ['admin', 'message']
    }
}

export const delete_bad ={
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