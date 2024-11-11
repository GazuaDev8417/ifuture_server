import ConnectToDatabase from "../data/Connexion"



export default class Restaurant extends ConnectToDatabase{
    protected RESTAURANT_TABLE = 'restaurants'

    constructor(
        private address:string,
        private category:string,
        private description:string,
        private id:string,
        private logourl:string,
        private name:string,
        private cnpj:string,
        private password:string
    ){ super() }

    save = async()=>{
        try{
            await ConnectToDatabase.con(this.RESTAURANT_TABLE).insert({
                address: this.address,
                category: this.category,
                description: this.description,
                id: this.id,
                logourl: this.logourl,
                name: this.name,
                cnpj: this.cnpj,
                password: this.password
            })
        }catch(e){
            throw new Error(`Erro ao registrar restaurante: ${e}`)
        }
    }
}