import React, { Fragment, useEffect } from 'react';
import {useAlert} from "react-alert";
import MetaDeta from '../layOut/MetaDeta';
import {useDispatch,useSelector} from 'react-redux';

import {createOrder,clearError} from "../../actions/orderAction";

const Payment = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error} = useSelector(state=>state.newOrder);
  const {cartItems,shippingInfo} = useSelector(state=>state.cart);


    useEffect(()=>{



      if(error){
        alert.error(error)
        dispatch(clearError())
      }
    },[dispatch,error,alert])

    

    const order = {
      orderItems: cartItems,
      shippingInfo
  }
   
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }
    
    //create new order
    const successPayment=()=>{

      dispatch(createOrder(order))
        history.push('/success')
    }
    return (
        <Fragment>
            <MetaDeta title={'payment'}/>
            <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg">
                <h1 className="mb-4">Only payment medhod cash on delivery</h1>
                
				
				
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                  onClick={successPayment}
                >
                  Pay
                </button>
    
              </form>
			  </div>
        </div>
        </Fragment>
    );
};

export default Payment;