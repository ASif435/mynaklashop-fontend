import React, { Fragment, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layOut/MetaDeta';
import Loader from '../layOut/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "./Sidebar";

import {allOrders,clearError} from "../../actions/orderAction";
import { Link } from 'react-router-dom';
// import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const OrdersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }

        

        // if(isDeleted){
        //     alert.success('Product Deleted successfully');
        //     history.push('/admin/products');
        //     dispatch({type:DELETE_PRODUCT_RESET})
        // }

    }, [dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name Of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                  
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `৳${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                   <Fragment>

                    <Link to={`/admin/order/${order._id}`} 
                    
                    className="btn btn-primary py-1 px-2">
                   <i class="fas fa-eye"></i>

                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2"
                   >
                    <i className="fa fa-trash"></i>
                    </button>
                   </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
        <MetaData title={'All Orders'}/>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

            <div className="col-12 col-md-10 col-sm-10">
                <Fragment>
                    <h1 className="mt-5">All Orders</h1>

                    {loading ?<Loader/> : (<Fragment>
                        <MDBDataTable responsive
                            data={setOrders()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />

                    </Fragment>)}
                </Fragment>
            </div>
        </div>

    </Fragment>
    );
};

export default OrdersList;