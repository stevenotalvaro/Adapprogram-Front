import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { ResetPassword } from '../components/auth/ResetPassword';
export const AuthRouter = () => {
  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <Switch>
            <Route 
                exact
                path="/auth/login"
                component={LoginScreen}
            />

            <Route 
                exact
                path="/auth/register"
                component={RegisterScreen}
            />

            <Route 
                exact
                path="/auth/reset"
                component={ResetPassword}
            />

            <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  )
}
