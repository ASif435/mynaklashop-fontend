import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch,useSelector } from 'react-redux';
import MetaDeta from '../layOut/MetaDeta';
import {login,clearError} from "../../actions/userAction";
import Loader from '../layOut/Loader';
import { Link,withRouter ,  } from 'react-router-dom';
const Login = ({history,location}) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {isAuthenticated,error,loading} = useSelector(state=>state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
      //protected route
 

  const redirect= location.search ? location.search.split('=')[1] : '/';
    useEffect(()=>{

        if (isAuthenticated) {
            history.push(redirect)
        }

        if (error) {
            alert.error(error)
            dispatch(clearError());
        }
    },[dispatch,alert,isAuthenticated,error,history]);


    const submitHandeler =(e)=>{
        e.preventDefault();
        dispatch(login(email,password))  
    }
    
    return (
        <>
            {loading? <Loader/> :(
                <Fragment>
                <MetaDeta title={'login'}/>
                <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandeler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
  
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
		  </div>
                </Fragment>
            )}
        </>
    );
};

export default withRouter(Login);