import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Route} from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    isVerified,
    component: Component,
    component2: Component2,
    ...rest
}) => {
    console.log(isVerified, 'sss')
    return (
        <Route
            {...rest}
            component={props =>
                isAuthenticated ? ( isVerified ? (<Component {...props} /> ) 
                                              : (<Component2 {...props} />)
                ) 
                : (
                    <Redirect to="/auth/login" />
                )
            }
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
}
