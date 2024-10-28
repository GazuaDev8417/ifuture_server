export interface UserModel{
    id:string
    username:string
    email:string
    cpf:string
    password:string
}

export interface ProductModel{
    category:string
    description:string
    id:string
    name:string
    photoUrl:string
    price:number
    provider:string
}

export interface OrderModel{
    id:string
    product:string 
    price:number
    quantity:number
    total:number
    moment:string
    restaurant:string 
    client:string
}

export interface cepModel{
    cep:string 
    logradouro:string
    complemento:string 
    unidade:string 
    bairro:string 
    localidade:string 
    uf:string 
    estado:string 
    regiao:string 
    ibge:string 
    gia:string 
    ddd:string 
    siafi:string 

}