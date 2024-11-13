import { Request } from "express"
import UserData from "../data/UserData"
import Services from "../services/Authentication"
import User from "../model/User"
import { cepModel, UserModel } from "../model/typesAndInterfaces"



export default class UserBusiness{
    constructor(
        private userData:UserData
    ){}
//USER FIELD
    signup = async(req:Request):Promise<string>=>{
        const { name, email, cpf, password, confirmPass } = req.body
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/


        if(!name || !email || !cpf || !password || !confirmPass){
            throw{
                statusCode: 401,
                error: new Error('Preencha os campos')
            }
        }

        if(!regex.test(email)){
            throw new Error('Email inválido!')
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


    getProfile = async(req:Request):Promise<UserModel>=>{
        const user = await new Services().authToken(req)
        
        const profile = await this.userData.getProfile(user.id)

        return profile
    }


    login = async(req:Request):Promise<string>=>{
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

        return token
    }


    registAddress = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)
        const { street, cep, number, neighbourhood, city, state, complement } = req.body
       
        let finalStreet = street
        let finalNeighbourhood = neighbourhood
        let finalCity = city
        let finalState = state

        if(!cep){
            throw new Error('Digie ao menos o CEP do endereço')
        }else if(cep.length !== 8){
            throw new Error('CEP inválido!')
        }else{
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data:cepModel = await res.json()

            finalStreet = !street ? data.logradouro : street
            finalNeighbourhood = !neighbourhood ? data.bairro : neighbourhood
            finalCity = !city ? data.localidade : city
            finalState = !state ? data.estado : state
        }
        
        await this.userData.registAddress(
            finalStreet, cep, number, finalNeighbourhood, finalCity, finalState, complement, user.id
        )
    }


    updateUser = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)
        const { username, email } = req.body
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

        if(!username || !email ){
            throw new Error('Preencha os campos')
        }

        if(!regex.test(email)){
            throw new Error('Email inválido!')
        }

        await this.userData.updateUser(username, email, user.id)
    }


    checkAddress = async(req:Request):Promise<User>=>{
        const user = await new Services().authToken(req)

        const address = await this.userData.checkAddress(user.id)
        const checedAddress = Object.values(address).some(value => value !== null)

        if(!checedAddress){
            throw{
                statusCode: 404,
                error: new Error('Usuário sem endereço cadastrado')
            }
        }
        
        return address
    }


    deleteUser = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)

        await this.userData.deleteUser(user.id)
    }

}