import React, { Fragment, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layOut/MetaDeta';
import Loader from '../layOut/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "./Sidebar";

import {getAdminProducts,deleteProduct,clearError} from "../../actions/productActions";
import { Link } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products);
    const {error: deleteError,isDeleted} = useSelector(state=>state.product)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearError())
        }

        if(isDeleted){
            alert.success('Product Deleted successfully');
            history.push('/admin/products');
            dispatch({type:DELETE_PRODUCT_RESET})
        }

    }, [dispatch, alert, error,deleteError,isDeleted,history])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                  
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `৳${product.price}`,
                stock:product.stock,
                actions:
                   <Fragment>

                    <Link to={`/admin/product/${product._id}`} 
                    
                    className="btn btn-primary py-1 px-2">
                   <i class="fas fa-pencil-alt"></i>

                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2"
                     onClick={()=>deleteProducHandler(product._id)}>
                    <i className="fa fa-trash"></i>
                    </button>
                   </Fragment>
            })
        })

        return data;
    }

    const deleteProducHandler =(id)=>{
        dispatch(deleteProduct(id)) 
    }

    return (
        <Fragment>
            <MetaData title={'All products'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar/>
                </div>

                <div className="col-12 col-md-10 col-sm-10">
                    <Fragment>
                        <h1 className="mt-5">All Products</h1>

                        {loading ?<Loader/> : (<Fragment>
                            <MDBDataTable responsive
                                data={setProducts()}
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

export default ProductList;