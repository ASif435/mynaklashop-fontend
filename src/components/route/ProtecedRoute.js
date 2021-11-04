import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
const ProtecedRoute = ({isAdmin, component:Component,...rest }) => {
 
    const {isAuthenticated,user,loading} = useSelector(state=>state.auth);
    return (
        <Fragment>



          {
            loading ==false &&(
              <Route
                {...rest}
                render={props=>{
                  if (isAuthenticated===false) {
                      return <Redirect to="/login"/>
                  }
                  if (isAdmin ===true && user.role !=='admin') {
                    return <Redirect to="/"/>
                  }
                  return <Component {...props}/>
                }}
                />
            )
          }
            {/* {loading === false &&(
                <Route 
                {...rest}
            render={({ location }) =>
            isAuthenticated ? (
                children
                ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
                />
            )} */}
        </Fragment>
    );
};

export default ProtecedRoute;