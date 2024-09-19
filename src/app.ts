import express from 'express'
import cors from 'cors'


const PORT = process.env.PORT || 3003
export const app = express()
app.use(express.json())
app.use(cors())


app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})