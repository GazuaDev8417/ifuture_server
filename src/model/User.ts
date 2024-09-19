import ConnectToDatabase from "../data/Connexion"



export default class User extends ConnectToDatabase{
    protected USER_TABLE = 'users'

    constructor(
        private id:string,
        private username:string,
        private email:string,
        private cpf:string,
        private password:string
    ){ super() }

    save = async()=>{
        try{
            await ConnectToDatabase.con(this.USER_TABLE).insert({
                id: this.id,
                username: this.username,
                email: this.email,
                cpf: this.cpf,
                password: this.password
            })
        }catch(e){
            throw new Error(`Erro ao registrar usuário: ${e}`)
        }
    }
}