import {createStore,combineReducers,applyMiddleware,} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
 
import {productsReducers,productDetailsReducer,
    productKeywordReducer,
    newProductReducer,
    productReducer} from './reducer/productReducer';
import { authReducer ,userReducer,forgotPasswordReducer} from "./reducer/userReducer";
import { cardReducer } from "./reducer/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer ,orderDetailsReducer, orderReducer} from "./reducer/orderReducer";

const reducer = combineReducers({
    products: productsReducers,
    newProduct:newProductReducer,
    product:productReducer,
    productDetails:productDetailsReducer,
    productKeyword:productKeywordReducer,
    auth:authReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cardReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    allOrders:allOrdersReducer,
    orderDetails :orderDetailsReducer,
    order:orderReducer,
    newReview: newOrderReducer,
})

let initialState = {
    cart:{
        cartItems:localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingInfo:localStorage.getItem('shippingInfo') 
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
    }
};

const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;