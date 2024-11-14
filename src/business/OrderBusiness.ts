import { Request } from "express"
import Orders from "../model/Order"
import OrderData from "../data/OrderData"
import Services from "../services/Authentication"
import { OrderModel } from "../model/typesAndInterfaces"




export default class OrderBusiness{
    constructor(
        private orderData:OrderData
    ){}

    todo_orders = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)
        const { product, price, quantity, restaurant, photoUrl } = req.body
        const id = new Services().idGenerator()
        const order = new Orders(
            id, product, price, photoUrl, quantity,
            quantity * price,
            `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
            restaurant,
            user.id,
            'REQUESTED'
        )
        

        const registeredOrders = await this.orderData.findOrderByRequest(product, restaurant, user.id)
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


    ordersByRestaurant = async(req:Request):Promise<OrderModel[]>=>{
        const restaurant = await new Services().authToken_restaurant(req)

        const orders = await this.orderData.ordersByRestaurant(restaurant.id)
       
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
            throw new Error('Insira a quantidade do produto')
        }

        await this.orderData.updateOrder(quantity, req.params.id)
    }


    endOrders = async(req:Request):Promise<void>=>{
        const user = await new Services().authToken(req)
        
        await this.orderData.endDorders(user.id)
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
}