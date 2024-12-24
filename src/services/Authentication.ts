import { Request } from 'express'
import { v4 } from 'uuid'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import UserData from '../data/UserData'
import RestaurantData from '../data/RestaurantData'
import moment from 'moment-timezone'
import { RestaurantModel, UserModel } from '../model/typesAndInterfaces'
import { config } from 'dotenv'


config()


type TokenData = {
    payload:string
    iat:number
    exp:number
}


export default class Services{

    idGenerator = ():string=>{
        return v4()
    }

    token = (payload:string):string=>{
        return jwt.sign(
            { payload },
            process.env.JWT_KEY as string,
            {}
        )
    }

    tokenData = (token:string):TokenData=>{
        return jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as TokenData
    }

    hash = (txt:string):string=>{
        const rounds = 12
        const salt = bcrypt.genSaltSync(rounds)
        const cypher = bcrypt.hashSync(txt, salt)

        return cypher
    }

    compare = (txt:string, hash:string):boolean=>{
        return bcrypt.compareSync(txt, hash)
    }

    authToken = async(req:Request):Promise<UserModel>=>{
        const token = req.headers.authorization
        
        const tokenData =  new Services().tokenData(token as string)
        const user = await new UserData().findById(tokenData.payload)
        
        if(!user){
            throw{
                statusCode: 404,
                error: new Error('Usuário não encontrado')
            }
        }
    
        return user
    }

    authToken_restaurant = async(req:Request):Promise<RestaurantModel>=>{
        const token = req.headers.authorization
        const tokenData =  new Services().tokenData(token as string)
        const restaurant = await new RestaurantData().restaurantById(tokenData.payload)
    
        if(!restaurant){
            throw{
                statusCode: 404,
                error: new Error('Restaurante não encontrado')
            }
        }
    
        return restaurant
    }

    invertDate = (date:string)=>{
        //if (!date) return null

        // Try parsing the date assuming it's in 'DD/MM/YYYY' format
        const ddmmYYYYDate = moment(date, 'DD/MM/YYYY', true)

        // If parsing succeeds, return the date directly
        if (ddmmYYYYDate.isValid()) return date
        
        const washingtonTimezone = 'America/New_York'
        const brazilTimezone = 'America/Bahia'

        // Convert the date from 'M/D/YYYY' format to Brazil timezone
        const brazilDate = moment.tz(date, 'M/D/YYYY', washingtonTimezone).tz(brazilTimezone)
        
        const formattedBrazilDate = brazilDate && brazilDate.format('DD/MM/YYYY') //: null
        
        return formattedBrazilDate           
    }


    
}