import { Request } from "express"
import RestaurantData from "../data/RestaurantData"
import Restaurant from "../model/Restaurant"
import Product from "../model/Products"
import Services from "../services/Authentication"
import { ProductModel } from "../model/typesAndInterfaces"




export default class RestaurantBusiness{
    constructor(
        private restaurantData:RestaurantData
    ){}
    
    signupRestaurant = async(req:Request):Promise<void>=>{
        const { address , deliveryTime, description, logourl, shipping, cnpj } = req.body
        const cnpjAPI = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
        const searchByCnpj = await  fetch(cnpjAPI)
        const data = await searchByCnpj.json()
        const id = new Services().idGenerator()
        const restaurant = new Restaurant(
            address, 
            data.atividade_principal[0].text, 
            deliveryTime, description, 
            id, 
            logourl, 
            data.fantasia, 
            shipping,
            cnpj
        )
        

        if(data.situacao !== 'ATIVA'){
            throw new Error('A empresa não está mais ativa')
        }

        const registeredRestaurant = await this.restaurantData.restaurantByCnpj(cnpj)
        if(registeredRestaurant){
            throw{
                statusCode: 403,
                error: new Error(`${registeredRestaurant.name} já está cadastradoS`)
            }
        }

        await this.restaurantData.signupRestaurant(restaurant)
    }


    getRestaurants = async(req:Request):Promise<Restaurant[]>=>{
        await new Services().authToken(req)

        const restaurants = await this.restaurantData.getRestaurants()
        if(restaurants.length === 0){
            throw{
                statusCode: 404,
                error: new Error('Lista de restaurantes vazia')
            }
        }

        return restaurants
    }


    restaurantById = async(req:Request):Promise<Restaurant>=>{
        await new Services().authToken(req)

        const restaurant = await this.restaurantData.restaurantById(req.params.id)
        if(!restaurant){
            throw{
                statusCode: 404,
                error: new Error('Restaurante não encontrado')
            }
        }

        return restaurant
    }

//PRODUCTS 
    insertProduct = async(req:Request):Promise<void>=>{
        const { category, description, name, photoUrl, price, provider } = req.body
        const id = new Services().idGenerator()
        const product = new Product(
            category, description, id, name, photoUrl, price, provider
        )

        const registeredProduct = await this.restaurantData.findProductByImage(photoUrl)
        if(registeredProduct){
            throw{
                statusCode: 403,
                error: new Error('Produto já registrado')
            }
        }

        await this.restaurantData.insertProduct(product)
    }


    productsByRestaurant = async(req:Request):Promise<ProductModel[]>=>{
        await new Services().authToken(req)

        const products = await this.restaurantData.productsByProvider(req.params.id)
        if(!products){
            throw{
                statusCode: 404,
                error: new Error('Cardápio não encontrado')
            }
        }

        return products
    }
}


