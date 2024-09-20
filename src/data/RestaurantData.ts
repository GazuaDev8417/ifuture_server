import ConnectToDatabase from "./Connexion"
import Restaurant from "../model/Restaurant"
import Product from "../model/Products"
import { ProductModel } from "../model/typesAndInterfaces"


export default class RestaurantData extends ConnectToDatabase{
    protected RESTAURANT_TABLE = 'restaurants'
    protected PRODUCT_TABLE = 'products'

    signupRestaurant = async(restaurant:Restaurant):Promise<void>=>{
        try{

            await restaurant.save()

        }catch(e:any){
            throw new Error(`Erro ao registrar restaurante: ${e}`)
        }
    }


    getRestaurants = async():Promise<Restaurant[]>=>{
        try{

            const restaurants = await ConnectToDatabase.con(this.RESTAURANT_TABLE)

            return restaurants
        }catch(e:any){
            throw new Error(`Error ao buscar restaurantes: ${e}`)
        }
    }


    restaurantById = async(id:string):Promise<Restaurant>=>{
        try{

            const [restaurant] = await ConnectToDatabase.con(this.RESTAURANT_TABLE).where({ id })

            return restaurant
        }catch(e:any){
            throw new Error(`Erro buscar restaurante: ${e}`)
        }
    }


    restaurantByImage = async(logoUrl:string):Promise<Restaurant>=>{
        try{

            const [restaurant] = await ConnectToDatabase.con(this.RESTAURANT_TABLE).where({ logoUrl })

            return restaurant
        }catch(e:any){
            throw new Error(`Erro buscar restaurante: ${e}`)
        }
    }

//PRODUCTS
    insertProduct = async(product:Product):Promise<void>=>{
        try{

            await product.save()

        }catch(e:any){
            throw new Error(`Erro ao inserir produto: ${e}`)
        }
    }


    findProductByImage = async(url:string):Promise<Product>=>{
        try{

            const [product] = await ConnectToDatabase.con(this.PRODUCT_TABLE).where({ photoUrl: url })

            return product
        }catch(e:any){
            throw new Error(`Erro ao buscar produto: ${e}`)
        }
    }


    productsByProvider = async(id:string):Promise<ProductModel[]>=>{
        try{

            const products = await ConnectToDatabase.con(this.PRODUCT_TABLE).where({ provider: id })
            
            return products
        }catch(e:any){
            throw new Error(`Erro ao buscar cardápio: ${e}`)
        }
    }
}