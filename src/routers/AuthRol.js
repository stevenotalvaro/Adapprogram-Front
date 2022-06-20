import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AdminScreen } from '../components/roles/AdminScreen';
import { StudentScreen } from '../components/roles/StudentScreen';
import { TeacherScreen } from '../components/roles/TeacherScreen';

export const AuthRol = () => {
const {rolCurrent} = useSelector( state => state.rol );
if(rolCurrent === "") {
    return <h1>Wait!...</h1>
}
  return (
    <div>
        <Switch>
            {
                (
                    rolCurrent === 'admin' ? 
                        <Route 
                            exact
                            path="/rol/admin"
                            component={AdminScreen}
                        /> : 
                        (rolCurrent === 'teacher' ? 
                            <Route 
                                exact
                                path="/rol/teacher"
                                component={TeacherScreen}
                        /> :  
                        <Route 
                            exact
                            path="/rol/student"
                            component={StudentScreen}
                        />
                    )
                )
            }
            <Redirect to={`/rol/${rolCurrent}`} />
        </Switch>
      </div>
  )
}