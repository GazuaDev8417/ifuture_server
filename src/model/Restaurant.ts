import ConnectToDatabase from "../data/Connexion"



export default class Restaurant extends ConnectToDatabase{
    protected RESTAURANT_TABLE = 'restaurants'

    constructor(
        private address:string,
        private category:string,
        private deliverytime:number,
        private description:string,
        private id:string,
        private logourl:string,
        private name:string,
        private shipping:number
    ){ super() }

    save = async()=>{
        try{
            await ConnectToDatabase.con(this.RESTAURANT_TABLE).insert({
                address: this.address,
                category: this.category,
                deliverytime: this.deliverytime,
                description: this.description,
                id: this.id,
                logourl: this.logourl,
                name: this.name,
                shipping: this.shipping
            })
        }catch(e){
            throw new Error(`Erro ao registrar restaurante: ${e}`)
        }
    }
}