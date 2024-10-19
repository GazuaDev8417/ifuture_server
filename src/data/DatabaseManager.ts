import ConnectToDatabase from "./Connexion"



export default class DatabaseManager extends ConnectToDatabase{
    static USER_TABLE = 'users'
    static RESTAURANT_TABLE = 'restaurants'
    static PRODUCT_TABLE = 'products'
    static ORDER_TABLE = 'orders'


    public static async createUsersTable():Promise<void>{
        try{
            const exists = await this.con.schema.hasTable(this.USER_TABLE)
            if(!exists){
                await this.con.schema.createTable(this.USER_TABLE, (table)=>{
                    table.string('id').primary().notNullable()
                    table.string('username', 50).notNullable()
                    table.string('email', 150).notNullable()
                    table.string('cpf', 50).notNullable()
                    table.string('password').notNullable()
                    table.string('street', 150)
                    table.string('cep', 50)
                    table.string('number', 50)
                    table.string('neighbourhood', 150)
                    table.string('city', 50)
                    table.string('state', 50)
                    table.string('complement', 150)
                })

                console.log(`Tabela ${this.USER_TABLE} criada com sucesso`)
            }else{
                console.log(`Tabela ${this.USER_TABLE} já existe!`)
            }
        }catch(e){
            console.log(`Erro ao criar tabela ${this.USER_TABLE}: ${e}`)
        }
    }


    public static async createRestaurantsTable():Promise<void>{
        try{
            const exists = await this.con.schema.hasTable(this.RESTAURANT_TABLE)
            if(!exists){
                await this.con.schema.createTable(this.RESTAURANT_TABLE, (table)=>{
                    table.string('address', 150).notNullable()
                    table.string('category', 50).notNullable()
                    table.integer('deliverytime').notNullable()
                    table.text('description').notNullable()
                    table.string('id').primary().notNullable()
                    table.string('logourl').notNullable()
                    table.string('name', 150).notNullable()
                    table.integer('shipping').notNullable()
                })

                console.log(`Tabela ${this.RESTAURANT_TABLE} criada com sucesso`)
            }else{
                console.log(`Tabela ${this.RESTAURANT_TABLE} já existe!`)
            }
        }catch(e){
            console.log(`Erro ao criar telbela ${this.RESTAURANT_TABLE}: ${e}`)
        }
    }


    public static async createProductsTable():Promise<void>{
        try{
            const exists = await this.con.schema.hasTable(this.PRODUCT_TABLE)
            if(!exists){
                await this.con.schema.createTable(this.PRODUCT_TABLE, (table)=>{
                    table.string('category', 50).notNullable()
                    table.text('description').notNullable()
                    table.string('id').primary().notNullable()
                    table.string('name', 50).notNullable()
                    table.string('"photoUr"l').notNullable()
                    table.float('price').notNullable()
                    table.string('provider').notNullable()
                })

                console.log(`Tabela ${this.PRODUCT_TABLE} criada com sucesso`)
            }else{
                console.log(`Tabela ${this.PRODUCT_TABLE} já existe!`)
            }
        }catch(e){
            console.log(`Erro ao criar tabela ${this.PRODUCT_TABLE}: ${e}`)
        }
    }


    public static async createOrdersTable():Promise<void>{
        try{
            const exists = await this.con.schema.hasTable(this.ORDER_TABLE)
            if(!exists){
                await this.con.schema.createTable(this.ORDER_TABLE, (table)=>{
                    table.string('id').primary().notNullable()
                    table.string('product', 50).notNullable()
                    table.float('price').notNullable()
                    table.string('"photoUrl"').notNullable()
                    table.integer('quantity').notNullable()
                    table.float('total').notNullable()
                    table.string('moment', 150).notNullable()
                    table.string('restaurant').notNullable()
                    table.string('client').notNullable()
                    table.string('state', 50).notNullable()
                })

                console.log(`Tabela ${this.ORDER_TABLE} criada com sucesso`)
            }else{
                console.log(`Tabela ${this.ORDER_TABLE} já existe!`)
            }
        }catch(e){
            console.log(`Erro ao criar tabela ${this.ORDER_TABLE}: ${e}`)
        }
    }


    public static async closeConnexion():Promise<void>{
        await this.con.destroy()
        console.log('Conexão com banco de dados encerrada.')
    }
}


(async()=>{
    await DatabaseManager.createUsersTable()
    await DatabaseManager.createRestaurantsTable()
    await DatabaseManager.createProductsTable()
    await DatabaseManager.createOrdersTable()
    await DatabaseManager.closeConnexion()
})()