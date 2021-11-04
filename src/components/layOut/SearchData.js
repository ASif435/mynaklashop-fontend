import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductKeyword,clearError } from '../../actions/productActions';
import Loader from '../layOut/Loader';
import MetaDeta from '../layOut/MetaDeta';
const SearchData = ({match}) => {
  const [product,setProduct] = useState([])
    const keyword = match.params.keyword;
    const dispatch = useDispatch();
    const {loading,products,error,} = useSelector(state=>state.productKeyword)
   const url = `http://localhost:4000/api/v1/product/key?keyword=${keyword}`
    useEffect(()=>{
       fetch(url)
       .then(res=>res.json())
       .then(data=>{
        setProduct(data.products)
       })

    },[dispatch,keyword,error,loading])
    console.log(product.images)
    return (
        <Fragment>
            
           { loading ? <Loader/> :(
            <Fragment>
              {product.map(res=>  <MetaDeta key={res._id} title={res.name}/>)}
                
               
            </Fragment>
           )}   
            {
                product.map(pp=>{
                  return <>
                    {pp.name ?
                         <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={pp._id}>
                         <div className="card p-3 rounded">
                         <img
                          className="card-img-top mx-auto" alt={product.name}
                          src={pp.images[0].url}
                      />
                           <div className="card-body d-flex flex-column">
                             <h5 className="card-title">
                               <Link to={`/product/${pp._id}`}>{pp.name}</Link>
                             </h5>
                            <div className="ratings mt-auto">
                               <div className="rating-outer">
                                 <div className="rating-inner" style={{width:`${(pp.ratings / 5) * 100}%`}}></div>
                               </div>
                               <span id="no_of_reviews">({pp.numOfReviews} Reviews)</span>
                             </div> 
                             <p className="card-text">{pp.price}</p> 
                             <Link to={`/product/${pp._id}`}id="view_btn" className="btn btn-block">View Details</Link>
                           </div>
                         </div>
                       </div>
                    :(
                      <h3>sorry</h3>
                    )}
                  </>
                })
              }
        
        </Fragment>
    );
};

export default SearchData;