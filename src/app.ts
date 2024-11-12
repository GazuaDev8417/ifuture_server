import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
//import * as SwaggerDocument from './swagger.json'
import * as path from 'path';
import fs from 'fs'

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, './', 'swagger.json'), 'utf-8')
)

console.log(swaggerDocument)

const PORT = process.env.PORT || 3003
export const app = express()
app.use(express.json())
const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Authorization, Content-Type',
}
app.use(cors(corsOptions))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
    console.log(`Documentação da API em http://localhost:${PORT}/api-docs`)
})