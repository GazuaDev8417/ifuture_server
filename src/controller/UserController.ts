import { Request, Response } from "express"
import UserBusiness from "../business/UserBusiness"



export default class UserController{
    constructor(
        private userBusiness:UserBusiness
    ){}

    signup = async(req:Request, res:Response):Promise<void>=>{
        try{

            const token = await this.userBusiness.signup(req)

            res.status(201).send(token)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    getProfile = async(req:Request, res:Response):Promise<void>=>{
        try{

            const user = await this.userBusiness.getProfile(req)

            res.status(201).send(user)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    login = async(req:Request, res:Response):Promise<void>=>{
        try{

            const authentication = await this.userBusiness.login(req)

            res.status(200).send(authentication)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }
    

    registAddress = async(req:Request, res:Response):Promise<void>=>{
        try{
            
            await this.userBusiness.registAddress(req)

            res.status(200).send('Endereço registrado com sucesso!')
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }
}