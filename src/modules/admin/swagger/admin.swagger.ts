export const body_create = { 
    description: 'Create a new admin account',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' ,default:"admin"},
        password: { type: 'string' ,default:"123456"},
        email: { type: 'string' ,default:"admin@gmail.com" },
        role: { type: 'number',default:0},
      },
      required: ['username', 'password', 'email', 'role']
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