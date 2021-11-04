import React, { Fragment, useEffect, useState } from 'react';
import '../App.css';
import MetaDeta from './layOut/MetaDeta';
import {useDispatch,useSelector} from "react-redux";
import {getProducts} from "../actions/productActions" ;
import Product from './product/Product';
import Loader from './layOut/Loader';
import { useAlert } from 'react-alert';
import Pagination from "react-js-pagination";
import paginate from '../paginate/Paginate';
import { useParams } from 'react-router-dom';

const Home = ({match}) => {
const [currentPage ,setCurrentPage] = useState(1);

const alert = useAlert();

const {loading,products,error,productsCount,resPerPage} = useSelector(state=>state.products)

  //fetch all product
    const dispatch = useDispatch();

    useEffect(()=>{

      if(error){
       return  alert.error(error)
      }
      dispatch(getProducts(currentPage));
      

    },[dispatch,alert,error,currentPage])



    function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
    }

    // const [page,setPage] = useState(0)
    // const url = 'http://localhost:4000/api/v1/products';
    // const [productT,setProduct] = useState([])
    // useEffect(()=>{
    //   fetch(url)
    //   .then(res=>res.json())
    //   .then(data=>{
    //     setProduct(paginate(data.products))
    //   })
    // },[])


    // const handlePage = (index)=>{
    //   setPage(index)
    // }
    
    // console.log(productT)
    return (
        <Fragment>
            {loading ? <Loader>loading...</Loader>:

              <Fragment>
                <MetaDeta title={'Buy Best Producta Online'}/>
              <h1 id="products_heading">Latest Products</h1>
                <section id="products" className="container mt-5">
              <div className="row">
              
                {products && products.map(product=>(
                  <Product key={product._id} product={product}></Product>
                ))}

            </div>
            </section>
                  {/* add pagination */}
              
                  <div className="d-flex justify-content-center mt-5">
                 <Pagination 
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={4}
                    onChange={setCurrentPageNo}
                    nextPageText={'Next'}
                    prevPageText={'Prev'}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass="page-item"
                    linkClass="page-link"
                 />
              </div>

              </Fragment>
            }
        </Fragment>
    );
};

export default Home;