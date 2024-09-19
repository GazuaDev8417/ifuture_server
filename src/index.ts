import { app } from "./app"
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


app.post('/signup', userController.signup)
app.post('/login', userController.login)
//RESTAURANT FIELD
app.post('/signup_restaurant', restaurantController.singupRestaurant)
app.post('/products', restaurantController.insertProduct)

app.get('/restaurants', restaurantController.getRestaurants)
app.get('/restaurants/:id', restaurantController.restaurantById)
app.get('/restaurant_products/:id', restaurantController.productsByRestaurant)
