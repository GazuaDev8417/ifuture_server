import knex from 'knex'
import { config } from 'dotenv'

config()


export default abstract class ConnectToDatabase{
    protected static con = knex({
        client: 'pg',
        connection: /* process.env.NEONTECH_DB */'postgresql://GazuaDev8417:oyxXs5u0rZim@ep-green-dew-a56t2dck.us-east-2.aws.neon.tech/tests?sslmode=require'
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


