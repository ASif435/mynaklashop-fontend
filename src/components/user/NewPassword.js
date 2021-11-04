import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch,useSelector } from 'react-redux';
import MetaDeta from '../layOut/MetaDeta';
import {resetPassword,clearError} from "../../actions/userAction";

const NewPassword = ({history,match}) => {


    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const {success ,error,loading} = useSelector(state=>state.forgotPassword)
   
    useEffect(()=>{

      

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (success) {
            alert.success('password updated successfully');
            history.push('/')
          
        }
    },[alert,error,success,loading]);

      
    const submitHandeler =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('password',password);
        formData.set('confirmPassword',confirmPassword);

             dispatch(resetPassword(match.params.token,formData))  
    }
    return (
        <Fragment>
        <MetaDeta title={'new password reset'}/>   

        	<div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandeler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>         
        </Fragment>
    );
};

export default NewPassword;