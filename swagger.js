const m2s = require("mongoose-to-swagger");
const Users = require("./models/user.model");
const Products = require("./models/products.model");

exports.options = {
  definitions: {
    Users: m2s(Users),
    Products: m2s(Products),
  },
  swagger: "2.0",
  info: {
    version: "1.0.0",
    description: "Products Project API",
    title: "Products & Users CRUD API",
  },
  host: "localhost:3000",
  basePath: "/",
  tags: [
    {
      name: "Users",
      description: "API for users",
    },
    {
      name: "Users and Products",
      description: "API for users and their products",
    },
    {
      name: "Products",
      description: "API for  products",
    },
  ],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/api/users/findAll": {
      get: {
        tags: ["Users"],
        summary: "Get all users from system",
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/Users",
            },
          },
        },
      },
    },
    "/api/users/findOne/{username}": {
      get: {
        tags: ["Users"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of the user to find",
            type: "string",
          },
        ],
        summary: "Gets a user from system",
        responses: {
          200: {
            description: "User find",
            schema: {
              $ref: "#/definitions/Users",
            },
          },
          404: {
            description: "User not found",
          },
        },
      },
    },
    "/api/users/create": {
      post: {
        tags: ["Users"],
        description: "Create new User in app",
        parameters: [
          {
            name: "Parameters for creating user",
            in: "body",
            description: "Users parameters that we will create",
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                surname: { type: "string" },
                username: { type: "string" },
                password: { type: "string" },
                email: { type: "string" },
                address: {
                  type: "object",
                  properties: {
                    area: { type: "string" },
                    road: { type: "string" },
                  },
                },
                phone: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      number: { type: "string" },
                    },
                  },
                },
              },
              required: ["username", "email"],
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "User created successfully",
            schema: {
              $ref: "#/definitions/Users",
            },
          },
          400: {
            description: "Error in creating user",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/users/update": {
      patch: {
        tags: ["Users"],
        description: "Update a user in the system",
        parameters: [
          {
            username: { type: "string" },
            name: "Update a user in system",
            in: "body",
            description: "User that we will update",
            schema: {
              type: "object",
              properties: {
                username: { type: "string" },
                name: { type: "string" },
                surname: { type: "string" },
                email: { type: "string" },
                address: {
                  type: "object",
                  properties: {
                    area: { type: "string" },
                    road: { type: "string" },
                  },
                },
                phone: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      number: { type: "string" },
                    },
                  },
                },
              },
              required: ["email"],
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "User updated successfully",
            schema: {
              $ref: "#/definitions/Users",
            },
          },
          400: {
            description: "Error in updating user",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/users/delete/{username}": {
      delete: {
        tags: ["Users"],
        description: "Deletes a user from system",
        parameters: [
          {
            name: "username",
            in: "path",
            description: "Username of the user to be deleted",
          },
        ],
        responses: {
          200: {
            description: "Deleted successfully",
          },
        },
      },
    },
    "/api/userproducts/findone/{username}": {
      get: {
        tags: ["Users and Products"],
        description: "Find user's products",
        parameters: [
          {
            name: "username",
            in: "path",
            description: "Find user's products",
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "User and Products",
          },
        },
      },
    },
  },
};
