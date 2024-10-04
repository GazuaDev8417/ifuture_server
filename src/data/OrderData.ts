import ConnectToDatabase from "./Connexion"
import Orders from "../model/Order"
import { OrderModel } from "../model/typesAndInterfaces"



export default class OrderData extends ConnectToDatabase{
    protected ORDER_TABLE = 'orders'

    
    todo_orders = async(order:Orders):Promise<void>=>{
        try{

            await order.save()

        }catch(e:any){
            throw new Error(`Erro ao realizar pedido: ${e}`)
        }
    }


    findOrderByRequest = async(product:string, restaurant:string, client:string):Promise<OrderModel>=>{
        try{

            const [order] = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                product, restaurant, client, state: 'Requested'
            })
            
            return order
        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }
    }


    ordersByClientAndRestaurant = async(client:string):Promise<OrderModel[]>=>{
        try{
            
            const orders = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                client,
                state: 'REQUESTED'
            })
            
            return orders
        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }
    }


    activeOrders = async(client:string):Promise<OrderModel[]>=>{
        try{
            
            const activeOrders = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                client,
                state: 'FINISHED'
            })

            return activeOrders
        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }
    }
    
    
    deleteOrder = async(id:string):Promise<void>=>{
        try{
            
            await ConnectToDatabase.con(this.ORDER_TABLE).delete().where({ id })

        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }

    }


    updateOrder = async(quantity:number, id:string):Promise<void>=>{
        try{
            
            const [order] = await ConnectToDatabase.con(this.ORDER_TABLE).where({ id })
            
            await ConnectToDatabase.con(this.ORDER_TABLE).update({
                quantity,
                total: quantity * order.price
            }).where({ id })

        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }
    }


    endDorders = async(id:string):Promise<void>=>{
        try{

            await ConnectToDatabase.con(this.ORDER_TABLE).update({
                state: 'FINISHED'
            }).where({ client: id })

        }catch(e:any){
            throw new Error(`Erro ao finalizar pedidos: ${e}`)
        }
    }


    cleanOrders = async(client:string):Promise<void>=>{
        try{

            await ConnectToDatabase.con(this.ORDER_TABLE).delete().where({ client })

        }catch(e:any){
            throw new Error(`Erro ao finalizar pedidos: ${e}`)
        }
    }
   
}