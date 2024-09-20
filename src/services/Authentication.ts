import { Request } from 'express'
import { v4 } from 'uuid'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import UserData from '../data/UserData'
import { UserModel } from '../model/typesAndInterfaces'




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
            '1234567890',
            {}
        )
    }

    tokenData = (token:string):TokenData=>{
        return jwt.verify(
            token,
            '1234567890'
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
        const tokenData = new Services().tokenData(token as string)
        const user = new UserData().findById(tokenData.payload)
    
        if(!user){
            throw{
                statusCode: 404,
                error: new Error('Usuário não encontrado')
            }
        }
    
        return user
    }
}