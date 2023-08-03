import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/app.css'
import { firebase } from './firebase';
import Routess from './routes';

const App = (props) => {
  return(
    <Routess {...props}/>
  )
}
firebase.auth().onAuthStateChanged((user)=> {
  console.log(user)
  ReactDOM.render(<App user={user}/>,document.getElementById('root'));
})

