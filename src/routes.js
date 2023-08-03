import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from './Hoc/Auth';

import Header from './Components/Header_footer/header';
import Footer from './Components/Header_footer/footer';
import Home from './Components/Home';
import SignIn from './Components/Signin';
import Dashboard from './Components/Admin/Dashboard';

import AdminStudents from './Components/Admin/students';
import AddEditStudents from './Components/Admin/students/addEditStudents';

import AddEditProjects from './Components/Admin/projects/addEditProjects';
import AdminProjects from './Components/Admin/projects';



import AdminMembers from './Components/Admin/members';
import AddEditMembers from './Components/Admin/members/addEditMembers';


import NotFound from './Components/not_found';
const Routess = ({user}) => {

  return (
    <BrowserRouter>
      <Header user={user}/>
      <Switch>

        <Route path="/admin_students/edit_student/:studentid" exact component={AuthGuard(AddEditStudents)}/>
        <Route path="/admin_students/add_student" exact component={AuthGuard(AddEditStudents)}/>
        <Route path="/admin_students" exact component={AuthGuard(AdminStudents)}/>

        <Route path="/admin_members/edit_member/:memberid" exact component={AuthGuard(AddEditMembers)}/>
        <Route path="/admin_members/add_member" exact component={AuthGuard(AddEditMembers)}/>
        <Route path="/admin_members" exact component={AuthGuard(AdminMembers)}/>

        <Route path="/admin_projects/edit_project/:projectid" exact component={AuthGuard(AddEditProjects)}/>
        <Route path="/admin_projects/add_project" exact component={AuthGuard(AddEditProjects)}/>
        <Route path="/admin_projects" exact component={AuthGuard(AdminProjects)}/>

        <Route path="/dashboard"  component={AuthGuard(Dashboard)}/>
        
        
        <Route path="/sign_in" exact component={ 
          props => (<SignIn {...props} user={user}/>) 
        }/>
        <Route path="/" exact component={Home}/>
        <Route component={NotFound}/>
      </Switch>
      <ToastContainer />
      <Footer/>
    </BrowserRouter>
  );
  
}

export default Routess;