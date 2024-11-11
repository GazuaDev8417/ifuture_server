import { Request } from "express"
import RestaurantData from "../data/RestaurantData"
import Restaurant from "../model/Restaurant"
import Product from "../model/Products"
import Services from "../services/Authentication"
import { ProductModel, RestaurantModel } from "../model/typesAndInterfaces"




export default class RestaurantBusiness{
    constructor(
        private restaurantData:RestaurantData
    ){}
    
    signupRestaurant = async(req:Request):Promise<string>=>{
        const { address , description, logourl, cnpj, password } = req.body
        if(!cnpj){
            throw new Error('CNPJ necessário para o cadastro!')
        }
        const cnpjAPI = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
        const searchByCnpj = await  fetch(cnpjAPI)
        const data = await searchByCnpj.json()
        const id = new Services().idGenerator()
        const token = new Services().token(id)
        const restaurant = new Restaurant(
            address, 
            data.atividade_principal[0].text, 
            description, 
            id, 
            logourl, 
            data.fantasia,
            cnpj,
            password
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

        return token
    }


    loginRestaurant = async(req:Request):Promise<string>=>{
        const { cnpj, password } = req.body
        
        if(!cnpj || !password){
            throw new Error('Insira suas crendencias para logar!')
        }

        
        const registeredRestaurant = await this.restaurantData.restaurantByCnpj(cnpj)
        if(!registeredRestaurant){
            throw new Error('Registro não encontrado!')
        }

        const compare = new Services().compare(password, registeredRestaurant.password)
        if(!compare){
            throw new Error('Registro não encontrado!')
        }

        const token = new Services().token(registeredRestaurant.id)

        
        return token
    }


    getRestaurants = async(req:Request):Promise<RestaurantModel[]>=>{
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


    restaurantById = async(req:Request):Promise<RestaurantModel>=>{
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
        const restaurant = await new Services().authToken_restaurant(req)
        const { category, description, name, photoUrl, price } = req.body
        const id = new Services().idGenerator()
        const product = new Product(
            category, description, id, name, photoUrl, price, restaurant.id
        )

        const registeredProduct = await this.restaurantData.findProductByImage(photoUrl)
        if(registeredProduct){
            throw{
                statusCode: 403,
                error: new Error(`${registeredProduct.name} já está registrado!`)
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


