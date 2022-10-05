import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AdminScreen } from '../components/roles/AdminScreen';
import { StudentScreen } from '../components/roles/StudentScreen';
import { GroupScreen } from '../components/roles/Teacher/GroupScreen';
import { TeacherScreen } from '../components/roles/TeacherScreen';
import { Sidebar } from '../components/adaptive/Sidebar'
import { Reports } from '../components/roles/Teacher/group-student/Reports';
import { Backdrop, CircularProgress } from '@material-ui/core';

export const AuthRol = () => {
const {rolCurrent} = useSelector( state => state.rol );
if(rolCurrent === "") {
    return (
        <Backdrop open={true} >
          <CircularProgress color="primary" />
        </Backdrop>)
}
  return (
    <div>
        <Sidebar />
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
                            <Switch>
                                <Route exact path="/rol/teacher" component={TeacherScreen}/> 
                                <Route exact path={"/rol/teacher/reports"} component={Reports} />
                                <Route exact path={"/rol/teacher/:groupId"} component={GroupScreen} />
                            </Switch>
                            :

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
