import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import * as SwaggerDocument from '../swagger.json'


//console.log('Swagger document: ', SwaggerDocument)

const PORT = process.env.PORT || 3003
export const app = express()
app.use(express.json())
const corsOptions = {
    origin: 'https://ifuture-server.vercel.app',
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Authorization, Content-Type',
}
app.use(cors(corsOptions))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocument))



app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
    console.log(`Documentação da API em http://localhost:${PORT}/api-docs`)
})


import fs from 'fs';

try {
    const fileContent = fs.readFileSync('swagger.json', 'utf-8');
    console.log("Swagger file content loaded successfully:", fileContent);
} catch (error) {
    console.error("Error loading Swagger file:", error);
}

