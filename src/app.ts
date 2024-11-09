import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import * as SwaggerDocument from '../swagger.json'


const PORT = process.env.PORT || 3003
export const app = express()
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocument))



app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
    console.log(`Documentação da API em http://localhost:${PORT}/api-docs`)
})