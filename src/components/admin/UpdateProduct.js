import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layOut/MetaDeta';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "./Sidebar";

import {updateProduct,getProductDetails,clearError} from "../../actions/productActions";
import { Link } from 'react-router-dom';
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const UpdateProduct = ({match,history}) => {

    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');
    const [stock,setStock] = useState(0);
    const [seller,setSeller] = useState('');
    const [images,setImages] = useState([]);

    const [oldImages,setOldImages] = useState([]);
    
    const [imagesPreview,setImagesPreview] = useState([]);

    
    const categories = [
        'Electronics',
        'Mobile',
        'Food',
        'Headphones',
        'Books',
        'Watch',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'  
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const {error,product} = useSelector(state=>state.productDetails)
    const { loading, error:updateError, isUpdated } = useSelector(state => state.product);

    const productId = match.params.id;


    useEffect(() => {
        
        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))
        }else{
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setSeller(product.seller);
            setOldImages(product.images)

        }

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError())
        }

        if (isUpdated) {
            history.push('/admin/products');
            alert.success('Product updated successfully');
            dispatch({type: UPDATE_PRODUCT_RESET})
        }

    }, [ alert, error,isUpdated,dispatch,history,product,updateError,productId]);


    const submitHandeler =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name);
        formData.set('price',price);
        formData.set('description',description);
        formData.set('category',category);
        formData.set('stock',stock);
        formData.set('stock',stock);
        formData.set('stock',stock);
        formData.set('seller',seller);


        images.forEach(image=>{
            formData.append('images',image)
        })

        dispatch(updateProduct(product._id,formData))  
    }
    const onChange = e =>{
            
        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);
        setOldImages([]);

        files.forEach(file=>{
            const reader = new FileReader();

            reader.onload = ()=>{
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray=>[...oldArray,reader.result])
                    setImages(oldArray=>[...oldArray,reader.result])
                    
                }
                            
            }

            reader.readAsDataURL(file)
        })

       
    
}
    return (
        <Fragment>
        <MetaData title={'Update product'}/>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

            <div className="col-12 col-md-10 col-sm-10">
                <Fragment>
                   

                <div className="wrapper my-5"> 
                    <form className="shadow-lg" onSubmit={submitHandeler} encType='multipart/form-data'>
                        <h1 className="mb-4">Update Product</h1>

                        <div className="form-group">
                        <label htmlFor="name_field">Name</label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price_field">Price</label>
                            <input
                            type="text"
                            id="price_field"
                            className="form-control"
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description_field">Description</label>
                            <textarea className="form-control" id="description_field"
                            value={description}
                            onChange={(e=>setDescription(e.target.value))}
                            rows="8" ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category_field">Category</label>
                            <select className="form-control" 
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                            id="category_field">
                                {
                                    categories.map(category=>(
                                        <option key={category} value={category}>{category}</option>
                                    ))
                                }
                               
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="stock_field">Stock</label>
                            <input
                            type="number"
                            id="stock_field"
                            className="form-control"
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="seller_field">Seller Name</label>
                            <input
                            type="text"
                            id="seller_field"
                            className="form-control"
                            value={seller}
                            onChange={(e)=>setSeller(e.target.value)}
                            />
                        </div>
                        
                        <div className='form-group'>
                            <label>Images</label>
                            
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>

                                {
                                    oldImages && oldImages.map(img=>(
                                        <img key={img} src={img.url} 
                                        alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))
                                }

                                {
                                    imagesPreview.map(img=>(
                                       <img src={img} key={img} alt="images preview" 
                                       className="mt-3 ml-2" width="55" height="52"/>   
                                    ))
                                }
                        </div>

            
                        <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading ? true:false}
                        >
                        UPDATE
                        </button>

                            </form>
                        </div>
                </Fragment>
            </div>
        </div>

    </Fragment>
    );
};

export default UpdateProduct;