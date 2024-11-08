import { app } from "./app"
import OrderBusiness from "./business/OrderBusiness"
import OrderController from "./controller/OrderController"
import OrderData from "./data/OrderData"
import RestaurantController from "./controller/RestaurantController"
import RestaurantBusiness from "./business/RestaurantBusiness"
import RestaurantData from "./data/RestaurantData"
import UserController from "./controller/UserController"
import UserBusiness from "./business/UserBusiness"
import UserData from "./data/UserData"



const restaurantController = new RestaurantController(
    new RestaurantBusiness(new RestaurantData)
)

const userController = new UserController(
    new UserBusiness(new UserData)
)

const orderController = new OrderController(
    new OrderBusiness(new OrderData)
)


app.post('/signup', userController.signup)
app.post('/login', userController.login)
//app.post('/cpf', userController.bringCPF)

app.get('/profile', userController.getProfile)
app.get('/address', userController.checkAddress)

app.patch('/address', userController.registAddress)
app.patch('/user', userController.updateUser)

app.delete('/user', userController.deleteUser)
//RESTAURANT FIELD
app.post('/signup_restaurant', restaurantController.singupRestaurant)
app.post('/products', restaurantController.insertProduct)

app.get('/restaurants', restaurantController.getRestaurants)
app.get('/restaurants/:id', restaurantController.restaurantById)
app.get('/restaurant_products/:id', restaurantController.productsByRestaurant)
//ORDERS
app.post('/order', orderController.todo_orders)

app.get('/orders', orderController.ordersByClientAndRestaurant)
app.get('/active_orders', orderController.activeOrders)

app.patch('/order/:id', orderController.updateOrder)
app.patch('/finished_orders', orderController.endOrders)

app.delete('/order/:id', orderController.deleteOrder)
app.delete('/orders', orderController.cleanOrdersHistory)
app.delete('/requested_orders', orderController.cleanRequestedOrders)
