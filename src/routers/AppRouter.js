import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase/firebase-config';
import {
    BrowserRouter as Router,
    Switch,    
    Redirect
  } from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login, startLoadingInfo } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { loadRol } from '../helpers/loadRol';
import { AuthRol } from './AuthRol';
import { setRol } from '../actions/rol';
import { loadTeachers } from '../helpers/loadTeachers';
import { setTeachers } from '../actions/teachers';
import { startLoadingGroups } from '../actions/groups';
import { AuthVerified } from './AuthVerified';
import { Backdrop, CircularProgress } from '@material-ui/core';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  
  useEffect(() => {
    
    firebase.auth().onAuthStateChanged(async (user) => {
      console.log(user)
      if ( user ) {
        const rol = await loadRol(user.uid)
        console.log(user.email)

        rol === 'student' ? dispatch(startLoadingInfo(user.uid)) 
                          : dispatch(login(user.uid, user.displayName, user.email))

        dispatch(startLoadingGroups(user.uid))
        
        if (rol === 'admin') {
          const teachers = await loadTeachers();
          dispatch(setTeachers(teachers))
        }
        dispatch(setRol(rol))
        setIsVerified(user.emailVerified)
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false)
      }
      setChecking(false)
    })
  }, [dispatch, setChecking,  setIsLoggedIn, loadTeachers, setIsVerified])

  if(checking) {
    return (
        <Backdrop open={true} >
          <CircularProgress color="primary" />
        </Backdrop>)
    }

  return (
    <Router>
        <div>
            <Switch>
                <PublicRoute
                    isAuthenticated={isLoggedIn}
                    isVerified={isVerified}
                    path="/auth"
                    component={AuthRouter}
                />

                <PrivateRoute
                    isVerified={isVerified}
                    isAuthenticated={isLoggedIn}
                    path="/rol"
                    component={AuthRol}
                    component2={AuthVerified}
                />

                <Redirect to="/auth/login" />
            </Switch>
        </div>
    </Router>
  )
}