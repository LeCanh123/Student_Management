export const body_create={ 
    description: 'Create a new user account',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' ,default:"user"},
        password: { type: 'string' ,default:"123456"},
        email: { type: 'string' ,default:"username@gmail.com"},
        role: { type: 'number',default:"1"},
      },
      required: ['username', 'password', 'email', 'role']
    }
}

export const create_success={
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

export const create_bad = {
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

export const body_login={ 
    description: 'Login',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' ,default:"username@gmail.com"},
        password: { type: 'string' ,default:"123456"},
      },
      required: ['username', 'password', 'email', 'role']
    }
}

export const login_success={
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
}


export const login_error={
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
}