import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase/firebase-config';
import {
    BrowserRouter as Router,
    Switch,    
    Redirect
  } from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { useDispatch, useSelector } from 'react-redux';
import { login, startLoadingInfo } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { loadRol } from '../helpers/loadRol';
import { AuthRol } from './AuthRol';
import { setRol } from '../actions/rol';
import { loadTeachers } from '../helpers/loadTeachers';
import { setTeachers } from '../actions/teachers';
import { startLoadingGroups } from '../actions/groups';
import { loadInfoStudent } from '../helpers/loadInfoStudent';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user && typeof(user) === 'object') {

        console.log(user)
        console.log(user)
        
        const rol = await loadRol(user.uid)

        rol === 'student' ? dispatch(startLoadingInfo(user.uid)) 
                          : dispatch(login(user.uid, user.displayName))

        setIsLoggedIn(true)
        
        dispatch(startLoadingGroups(user.uid))
        
        if (rol === 'admin') {
          const teachers = await loadTeachers();
          dispatch(setTeachers(teachers))
        }
        dispatch(setRol(rol))
      }else {
        setIsLoggedIn(false)
      }
      setChecking(false)
    })
  }, [dispatch, setChecking,  setIsLoggedIn, loadTeachers])

  if(checking) {
    return (<h1>Wait...</h1>)
  }

  return (
    <Router>
        <div>
            <Switch>
                <PublicRoute
                    isAuthenticated={isLoggedIn}
                    path="/auth"
                    component={AuthRouter}
                />

                <PrivateRoute
                    isAuthenticated={isLoggedIn}
                    path="/rol"
                    component={AuthRol}
                />

                <Redirect to="/auth/login" />
            </Switch>
        </div>
    </Router>
  )
}
