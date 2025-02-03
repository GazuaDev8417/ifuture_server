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
                product, restaurant, client, state: 'REQUESTED'
            })
            
            return order
        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }
    }


    ordersByClient = async(client:string):Promise<OrderModel[]>=>{
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

    orderById = async(id:string):Promise<OrderModel>=>{
        try{
            
            const [order] = await ConnectToDatabase.con(this.ORDER_TABLE).where({ id })
            
            return order
        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }
    }


    ordersByRestaurant = async(restaurant:string):Promise<OrderModel[]>=>{
        try{
            
            const orders = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                restaurant,
                state: 'REQUESTED'
            })
            
            return orders
        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }
    }


    activeRestaurantOrders = async(restaurant:string):Promise<OrderModel[]>=>{
        try{
            
            const activeOrders = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                restaurant,
                state: 'FINISHED'
            })

            return activeOrders
        }catch(e:any){
            throw new Error(`Erro ao buscar pedido: ${e}`)
        }
    }


    restaurantOrdersByClient = async(restaurant:string, client:string):Promise<OrderModel[]>=>{
        try {

            const orders = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                restaurant,
                client,
                state:'FINISHED'
            })
            
            return orders
        } catch (e:any) {
            throw new Error(`Erro ao buscar pedidos: ${e}`)
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

            const orders:OrderModel[] = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                client: id, state: 'REQUESTED'
            })

            
            if(orders.length === 0){
                throw new Error('Todos os pedidos já foram finalizados')
            }

            await ConnectToDatabase.con(this.ORDER_TABLE).update({
                moment: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
                state: 'FINISHED'
            }).where({ client: id })

        }catch(e:any){
            throw new Error(`Erro ao finalizar pedidos: ${e}`)
        }
    }


    cleanOrdersHistory = async(client:string):Promise<void>=>{
        try{

            const orders:OrderModel[] = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                client, state: 'FINISHED'
            })

            if(orders.length === 0){
                throw new Error('Sua lista de histórico já está vazia!')
            }

            await ConnectToDatabase.con(this.ORDER_TABLE).delete().where({
                client,
                state: 'FINISHED'
            })


        }catch(e:any){
            throw new Error(`Erro ao limpar histórico: ${e}`)
        }
    }

    
    cleanRequestedOrders = async(client:string):Promise<void>=>{
        try{


            const orders:OrderModel[] = await ConnectToDatabase.con(this.ORDER_TABLE).where({
                client, state: 'REQUESTED'
            })

            if(orders.length === 0){
                throw new Error('Sua lista de pedidos já está vazia!')
            }

            await ConnectToDatabase.con(this.ORDER_TABLE).delete().where({
                client,
                state: 'REQUESTED'
            })

        }catch(e:any){
            throw new Error(`Erro ao limpar histórico: ${e}`)
        }
    }
   
}