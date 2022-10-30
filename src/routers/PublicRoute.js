import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import { useSelector } from 'react-redux';

export const PublicRoute = ({
    isAuthenticated,
    isVerified,
    component: Component,
    ...rest
}) => {
    const {rolCurrent} = useSelector( state => state.rol );
    return (
        <Route
            {...rest}
            component={props =>
                isAuthenticated ? isVerified ? <Redirect to={`/rol/${rolCurrent}`} /> 
                                             : <Redirect to={'/rol/verification'} /> 
                                : <Component {...props} />
            }
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
}
