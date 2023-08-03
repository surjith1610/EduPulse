import React from "react";
import { redirect } from "react-router-dom";
import { firebase } from "../firebase";

const AuthGuard = (Component) => {
    class AuthHoc extends React.Component {

        authCheck = () => {
            const user = firebase.auth().currentUser;
            if(user){
                return <Component{...this.props}/>
            }
            else {
                    return <redirect to="/"/>
            }
        }
        render() {
            return this.authCheck() 
        }
        
    }
    return AuthHoc;
}

export default AuthGuard