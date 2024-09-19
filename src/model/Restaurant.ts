import ConnectToDatabase from "../data/Connexion"



export default class Restaurant extends ConnectToDatabase{
    protected RESTAURANT_TABLE = 'restaurants'

    constructor(
        private address:string,
        private category:string,
        private deliveryTime:number,
        private description:string,
        private id:string,
        private logoUrl:string,
        private name:string,
        private shipping:number
    ){ super() }

    save = async()=>{
        try{
            await ConnectToDatabase.con(this.RESTAURANT_TABLE).insert({
                address: this.address,
                category: this.category,
                deliveryTime: this.deliveryTime,
                description: this.description,
                id: this.id,
                logoUrl: this.logoUrl,
                name: this.name,
                shipping: this.shipping
            })
        }catch(e){
            throw new Error(`Erro ao registrar restaurante: ${e}`)
        }
    }
}