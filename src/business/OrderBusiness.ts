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
            user.id
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


    ordersByClientAndRestaurant = async(req:Request):Promise<OrderModel[]>=>{
         const user = await new Services().authToken(req)

         const orders = await this.orderData.ordersByClientAndRestaurant(user.id, req.params.id)
        
         return orders
    }


    deleteOrder = async(req:Request):Promise<void>=>{
        const user = new Services().authToken(req)

        await this.orderData.deleteOrder(req.params.id)
    }
}