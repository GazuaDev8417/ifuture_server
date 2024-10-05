import { Request, Response } from "express"
import OrderBusiness from "../business/OrderBusiness"


export default class OrderController{
    constructor(
        private orderBusiness:OrderBusiness
    ){}

    todo_orders = async(req:Request, res:Response):Promise<void>=>{
        try{

            await this.orderBusiness.todo_orders(req)

            res.status(200).send('Pedido realizado com sucesso')
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    ordersByClientAndRestaurant = async(req:Request, res:Response):Promise<void>=>{
        try{

            const orders = await this.orderBusiness.ordersByClientAndRestaurant(req)           

            res.status(200).send(orders)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    deleteOrder = async(req:Request, res:Response):Promise<void>=>{
        try{

            const orders = await this.orderBusiness.deleteOrder(req)
            
            res.status(200).send(orders)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    cleanOrders = async(req:Request, res:Response):Promise<void>=>{
        try{

            await this.orderBusiness.cleanOrders(req)
            
            res.status(200).end()
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    updateOrder = async(req:Request, res:Response):Promise<void>=>{
        try{

            await this.orderBusiness.updateOrder(req)

            res.status(200).end()
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    endOrders = async(req:Request, res:Response):Promise<void>=>{
        try{
            
            await this.orderBusiness.endOrders(req)
            
            res.status(200).send('Pedido finalizado')
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    activeOrders = async(req:Request, res:Response):Promise<void>=>{
        try{
            
            const orders = await this.orderBusiness.activeOrders(req)
            
            res.status(200).send(orders)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }
}