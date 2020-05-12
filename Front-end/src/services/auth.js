import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const responseToken = localStorage.getItem('jwt-token');

    return(
        <Route
            {...rest}
            render={props => 
                localStorage.getItem('jwt-token') ? (
                <Component {...props} />
                ) : (
                <Redirect to={{ pathname: '/login' }} />
                )
            } 
        />
    )
};

export default PrivateRoute;
  