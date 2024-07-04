const swaggerAutogen = require("swagger-autogen")({ openapi: '3.0.0' });

const docs = {
  info: {
    version: "1.0.0",
    title: "The box",
    description: "Feito por universitários para unversitários",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        name: "bearerAuth",
        type: "http",
        scheme: "bearer",
        description: "JWT auth",
        in: "header",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "../auth/routes",
  "../comment/routes",
  "../post/routes",
  "../user/routes",
];

swaggerAutogen(outputFile, endpointsFiles, docs);
