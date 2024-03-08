
export const get_success ={
    status: 200,
    description: 'Get course success',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                description: { type: 'string' },
                duration: { type: 'number' },
                start_date: { type: 'string', format: 'date-time' },
                end_date: { type: 'string', format: 'date-time' },
                is_delete: { type: 'boolean' }
            },
            required: ['id', 'name', 'description', 'duration', 'start_date', 'end_date', 'is_delete']
        }
    }
}

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
                default:"error"
            },
            message: {
                type: 'string',
                default:"Internal Server Error"
            }
        },
    }
}

export const search_success ={
    status: 200,
    description: 'Search course success',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                description: { type: 'string' },
                duration: { type: 'number' },
                start_date: { type: 'string', format: 'date-time' },
                end_date: { type: 'string', format: 'date-time' },
                is_delete: { type: 'boolean' }
            },
            required: ['id', 'name', 'description', 'duration', 'start_date', 'end_date', 'is_delete']
        }
    }
}
export const search_error= {
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


export const get_by_id_success={
    status: 200,
    description: 'Get course success',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                description: { type: 'string' },
                duration: { type: 'number' },
                start_date: { type: 'string', format: 'date-time' },
                end_date: { type: 'string', format: 'date-time' },
                is_delete: { type: 'boolean' }
            },
            required: ['id', 'name', 'description', 'duration', 'start_date', 'end_date', 'is_delete']
        }
    }
}

export const get_by_id_error={
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

export const create_success={
    status: 201,
    description: 'Create new course success',
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
                default:"Create new course success"
            }
        },
    }
}

export const create_error={
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
    description: 'Create a new course',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        duration: { type: 'number' },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' }
      },
      required: ['name', 'description', 'duration', 'start_date', 'end_date']
    }
}

export const update_success = {
    status: 201,
    description: 'Update course success',
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
                default:"Update course success"
            }
        },
    }
}

export const update_not_found={
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
                default:"Course with offer ID not found."
            }
        },
        required: ['admin', 'message']
    }
}

export const update_bad={
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

export const body_update={ 
    description: 'Update course',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        duration: { type: 'number' },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' }
      },
      required: ['name', 'description', 'duration', 'start_date', 'end_date']
    }
}


export const delete_success={
    status: 201,
    description: 'Delete course success',
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
                default:"Delete course success"
            }
        },
    }
}

export const delete_not_found={
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
                default:"Course with offer ID not found."
            }
        },
        required: ['admin', 'message']
    }
}

export const delete_bad={
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