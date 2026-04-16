const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dummy User API',
      version: '1.0.0',
      description: 'API for managing users',
      contact: {
        name: 'API Support',
        email: 'email@example.com'
      }
    },
    servers: [
      {
        url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
        description: process.env.VERCEL_URL ? 'Production server' : 'Development server'
      }
    ],
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(options);

// Add additional documentation for endpoints not covered
specs.paths = {
  ...specs.paths,
  '/api/users': {
    post: {
      tags: ['Users'],
      summary: 'Create a new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserInput'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                  data: { $ref: '#/components/schemas/User' }
                }
              }
            }
          }
        },
        400: {
          description: 'Invalid input'
        }
      }
    },
    get: {
      tags: ['Users'],
      summary: 'Get all users',
      responses: {
        200: {
          description: 'List of users',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  count: { type: 'number' },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get user by ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'User found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/User' }
                }
              }
            }
          }
        },
        404: {
          description: 'User not found'
        }
      }
    },
    put: {
      tags: ['Users'],
      summary: 'Update user',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserInput'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'User updated successfully'
        },
        404: {
          description: 'User not found'
        }
      }
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete user',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'User deleted successfully'
        },
        404: {
          description: 'User not found'
        }
      }
    }
  },
  '/api/users/{id}/saldo': {
    patch: {
      tags: ['Users'],
      summary: 'Update user saldo only',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                saldo: { type: 'number', example: 2000000 }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Saldo updated successfully'
        },
        404: {
          description: 'User not found'
        }
      }
    }
  },
  '/api/users/{id}/hutang': {
    patch: {
      tags: ['Users'],
      summary: 'Update user hutang only',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                hutang: { type: 'number', example: 1000000 }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Hutang updated successfully'
        },
        404: {
          description: 'User not found'
        }
      }
    }
  }
};

module.exports = specs;