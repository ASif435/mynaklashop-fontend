import {BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Footer from './components/layOut/Footer';
import Header from './components/layOut/Header';
import SearchData from "./components/layOut/SearchData";
import ProductDetails from "./components/product/ProductDetails";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import {loadUser} from "./actions/userAction";
import { useSelector } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword"
//auth router user imports
import ProtecedRoute from "./components/route/ProtecedRoute";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/Cart/Cart";
//order imports
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import ListOrder from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";

//admin imports
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProdduct from "./components/admin/NewProdduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProccessOrder from "./components/admin/ProccessOrder";
function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  return (
    <Router>
      <div className="App">
      <Header/>
      <div className="container container-fluid">
      <Route path="/" exact>
      <Home/>
      </Route>
      <Route path={"/product/:id"} exact component={ProductDetails}></Route>
      <Route path={"/search/:keyword"} component={SearchData}></Route>
      
      <Route path="/login" component={Login}>
      
      </Route>
      <Route path="/password/forgot" exact >
        <ForgotPassword/>
      </Route>
      <Route path="/cart" component={Cart} exact >
       </Route>


      <Route path={"/password/reset/:token"} component={NewPassword}></Route>
      <Route path="/register" >
        <Register/>
      </Route>
      <ProtecedRoute path="/me" component={Profile} exact />
      <ProtecedRoute path="/me/update" component={UpdateProfile} exact />
      <ProtecedRoute path="/password/update" component={UpdatePassword} exact />
      
      <ProtecedRoute path="/shipping"   component={Shipping} > 
      </ProtecedRoute>
      <ProtecedRoute path="/order/confirm"   component={ConfirmOrder} > 
      </ProtecedRoute>
      <ProtecedRoute path="/success"   component={OrderSuccess} > 
      </ProtecedRoute>
      <ProtecedRoute path="/payment"   component={Payment} > 
      </ProtecedRoute>
      <ProtecedRoute path="/orders/me" exact component={ListOrder} > 
      </ProtecedRoute>
      <ProtecedRoute path="/order/:id" exact component={OrderDetails} > 
      </ProtecedRoute>

      </div>

      
      <ProtecedRoute path="/dashboard" isAdmin={true} exact component={Dashboard} > 
       </ProtecedRoute>
      
      <ProtecedRoute path="/admin/products" isAdmin={true} exact component={ProductList} > 
       </ProtecedRoute>
      
      <ProtecedRoute path="/admin/product" isAdmin={true} exact component={NewProdduct} > 
       </ProtecedRoute>
      <ProtecedRoute path="/admin/product/:id" isAdmin={true} exact component={UpdateProduct} > 
       </ProtecedRoute>
      <ProtecedRoute path="/admin/orders" isAdmin={true} exact component={OrdersList} > 
       </ProtecedRoute>
      <ProtecedRoute path="/admin/order/:id" isAdmin={true} exact component={ProccessOrder} > 
       </ProtecedRoute>

     
       {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
     
    </div>
    </Router>
  );
}

export default App;
