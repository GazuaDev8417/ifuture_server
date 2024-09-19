import { Request } from "express"
import UserData from "../data/UserData"
import Services from "../services/Authentication"
import User from "../model/User"
import { UserModel } from "../model/typesAndInterfaces"
import Restaurant from "../model/Restaurant"


export default class UserBusiness{
    constructor(
        private userData:UserData
    ){}
//USER FIELD
    signup = async(req:Request):Promise<string>=>{
        const { name, email, cpf, password, confirmPass } = req.body

        if(!name || !email || !cpf || !password || !confirmPass){
            throw{
                statusCode: 401,
                error: new Error('Preencha os campos')
            }
        }

        const allUsers = await this.userData.getAllUsers()
        if(allUsers.length > 0){
            allUsers.map(user=>{
                if(new Services().compare(cpf, user.cpf)){
                    throw{
                        statusCode: 403,
                        error: new Error('Usuário já cadastrado')
                    }
                }
            })
        }

        const registeredUser = await this.userData.findByEmail(email)
        if(registeredUser){            
            throw{
                statusCode: 403,
                error: new Error('Usuário já cadastrado')
            }
        
        }
        
        if(cpf.length !== 11){
            throw{
                statusCode: 401,
                error: new Error('CPF inválido')
            }
        }

        if(password.length < 6){
            throw{
                statusCode: 403,
                error: new Error('Sua senha deve ter no mínimo 6 caracteres')
            }
        }

        if(password !== confirmPass){
            throw{
                stausCode: 403,
                error: new Error('As senhas não conferem')
            }
        }

        const id = new Services().idGenerator()
        const hash = new Services().hash(password)
        const hashCPF = new Services().hash(cpf)
        const token = new Services().token(id)

        const user = new User(id, name, email, hashCPF, hash)

        await this.userData.create(user)

        return token

    }


    login = async(req:Request):Promise<object>=>{
        const { email, password } = req.body

        if(!password || !email){
            throw{
                statusCode: 401,
                error: new Error('Preencha os campos')
            }
        }

        const registeredUser = await this.userData.findByEmail(email)
        if(!registeredUser){            
            throw{
                statusCode: 404,
                error: new Error('Usuário não encontrado')
            }
        
        }

        const compare = new Services().compare(password, registeredUser.password)
        if(!compare){
            throw{
                statusCode: 404,
                error: new Error('Usuário não encontrado')
            }
        }

        const token = new Services().token(registeredUser.id)

        return { token, registeredUser }
    }

}