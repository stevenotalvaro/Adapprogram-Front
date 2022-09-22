import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { VerificationScreen } from '../components/auth/VerificationScreen'

export const AuthVerified = () => {
  return (
    <div>
        <Switch>
            <Route 
                exact
                path="/rol/verification"
                component={VerificationScreen}
            />

            <Redirect to="/rol/verification" />
        </Switch>
    </div>
  )
}
