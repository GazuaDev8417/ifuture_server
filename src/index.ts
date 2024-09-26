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

app.get('/profile', userController.getProfile)

app.patch('/address/:id', userController.registAddress)
//RESTAURANT FIELD
app.post('/signup_restaurant', restaurantController.singupRestaurant)
app.post('/products', restaurantController.insertProduct)

app.get('/restaurants', restaurantController.getRestaurants)
app.get('/restaurants/:id', restaurantController.restaurantById)
app.get('/restaurant_products/:id', restaurantController.productsByRestaurant)
//ORDERS
app.post('/order', orderController.todo_orders)

app.get('/orders/:id', orderController.ordersByClientAndRestaurant)

app.delete('/order/:id', orderController.deleteOrder)
