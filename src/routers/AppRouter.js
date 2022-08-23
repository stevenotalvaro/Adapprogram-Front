import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase/firebase-config';
import {
    BrowserRouter as Router,
    Switch,    
    Redirect
  } from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { loadRol } from '../helpers/loadRol';
import { AuthRol } from './AuthRol';
import { setRol } from '../actions/rol';
import { loadTeachers } from '../helpers/loadTeachers';
import { setTeachers } from '../actions/teachers';
import { startLoadingGroups } from '../actions/groups';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const {rolCurrent} = useSelector( state => state.rol );
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    console.log(rolCurrent)
    
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true)

        const rol = await loadRol(user.uid)
        
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
