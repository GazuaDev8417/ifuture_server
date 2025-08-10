import { Request } from "express"
import Orders from "../model/Order"
import OrderData from "../data/OrderData"
import Services from "../services/Authentication"
import moment from "moment-timezone"
import { OrderModel } from "../model/typesAndInterfaces"




export default class OrderBusiness{
    constructor(
        private orderData:OrderData
    ){}

    todo_orders = async(req:Request):Promise<void>=>{
        const token = req.headers.authorization
        const userId = new Services().tokenData(token as string).payload
        //const address = `${user.street} ${user.number}, ${user.neighbourhood} ${user.city} - ${user.state}`
        const { product, price, quantity, momentString, restaurant, photoUrl, description } = req.body
        const localMoment = moment.utc(momentString).tz("America/Sao_Paulo").format('DD/MM/YYYY [às] HH:mm')
        const id = new Services().idGenerator()
        const order = new Orders(
            id, product, price, photoUrl, quantity,
            quantity * price,
            localMoment,            
            restaurant,
            userId,
            'REQUESTED',
            //address,
            description
        )
        

        const registeredOrders = await this.orderData.findOrderByRequest(product, restaurant, userId)
        if(registeredOrders){
            throw{
                statusCode: 403,
                error: new Error(`Você já fez um pedido '${product}'. Gostaria de verificar?`)
            }
        }

        await this.orderData.todo_orders(order)
    }


    ordersByClient = async(req:Request):Promise<OrderModel[]>=>{
         const user = await new Services().authToken(req)

         const orders = await this.orderData.ordersByClient(user.id)
        
         return orders
    }


    orderById = async(req:Request):Promise<OrderModel>=>{
        await new Services().authToken_restaurant(req)

        const order = await this.orderData.orderById(req.params.id)
       
        return order
   }

    ordersByRestaurant = async(req:Request):Promise<OrderModel[]>=>{
        const restaurant = await new Services().authToken_restaurant(req)

        const orders = await this.orderData.ordersByRestaurant(restaurant.id)
       
        return orders
   }

   restaurantOrdersByClient = async(req:Request):Promise<OrderModel[]>=>{
        const restaurant = await new Services().authToken_restaurant(req)
        
        const orders = await this.orderData.restaurantOrdersByClient(restaurant.id, req.params.id)
    
        return orders
    }


    deleteOrder = async(req:Request):Promise<OrderModel[]>=>{
        const user = await new Services().authToken(req)
        
        await this.orderData.deleteOrder(req.params.id)
        const orders = await this.orderData.ordersByClient(user.id)

        return orders
    }


    cleanOrdersHistory = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)

        await this.orderData.cleanOrdersHistory(user.id)
    }

    cleanRequestedOrders = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)

        await this.orderData.cleanRequestedOrders(user.id)
    }


    updateOrder = async(req:Request):Promise<void>=>{
        await new Services().authToken(req)
        const { quantity } = req.body

        if(!quantity){
            throw{
                statusCode: 401,
                error: new Error('Insira uma quantidade para o produto')
            }
        }

        await this.orderData.updateOrder(quantity, req.params.id)
    }


    endOrders = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)
        const { paymentMethod } = req.body
        
        await this.orderData.endDorders(user.id, paymentMethod)
    }

    
    activeOrders = async(req:Request):Promise<OrderModel[]>=>{
        const user = await new Services().authToken(req)
        const orders = await this.orderData.activeOrders(user.id)

        return orders
    }


    activeRestaurantOrders = async(req:Request):Promise<OrderModel[]>=>{
        const restaurant = await new Services().authToken_restaurant(req)
        const orders = await this.orderData.activeRestaurantOrders(restaurant.id)

        return orders
    }

    registAddressOrder = async(req:Request):Promise<void>=>{
        const { address } = req.body
        const token = req.headers.authorization
        const userId = new Services().tokenData(token as string).payload

        await this.orderData.registAddressOrder(address, userId)
    }
}