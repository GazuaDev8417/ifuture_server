import knex from 'knex'
import { config } from 'dotenv'

config()


export default abstract class ConnectToDatabase{
    protected static con = knex({
        // client: 'mysql2',
        connection: process.env.NEONTECH_DB
        /* connection: {
            host: 'localhost',
            user: 'root',
            password: 'alfadb',
            database: 'ifuture'
        } */
    })

    public static testConnexion = async():Promise<void>=>{
        try{

            await this.con.raw('SELECT 1+1 AS result')
            console.log('Conectado ao banco de dados')
        }catch(e){
            console.log(`Erro ao conectar ao bando de dados ${e}`)
        }
    }
}


(async()=>{
    await ConnectToDatabase.testConnexion()
})()


