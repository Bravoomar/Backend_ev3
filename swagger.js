import swaggerAutogen from "swagger-autogen"; // esto importa la herramienta que genera el JSON de swagger

const doc = { // esto define los metadatos de mi API para swagger
  info: {
    title: "API de ejemplo", // esto es el titulo que se ve en swagger
    description: "Documentación de la API de ejemplo de un servicio node.js", // esto es la descripción
  },
  host: "localhost:3000", // esto indica el host y puerto donde corre mi API
  schemes: ["http"], // esto define el esquema (http/https)
};

const outputFile = "./swagger-output.json"; // esto es el archivo de salida con la documentación
const endpointsFiles = ["./index.js"]; // esto le dice dónde están mis endpoints para escanear

swaggerAutogen()(outputFile, endpointsFiles, doc); // esto ejecuta la generación del swagger-output.json


