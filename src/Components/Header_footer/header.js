import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";

import { Link } from "react-router-dom";
import { UniLogo } from "../Utils/tools";
import { logoutHandler } from "../Utils/tools";
const Header = ({user}) => {
    return (
        <AppBar 
            position="fixed"
            style={{
                backgroundColor: '#98c5e9',
                boxShadow: 'none',
                padding: '12px 0',
                borderBottom: '2px solid #00285e'
            }}
            >
                <Toolbar style={{ display:'flex' }}>
                 <div style={{ flexGrow: 1 }}>
                     <div className="header_logo">
                         <UniLogo Link={true}
                         LinkTo={'/'}
                         width ="70px"
                         height="70px"
                         />
                     </div>
                 </div>

                
                <Link to="">
                     <Button color="inherit">Home</Button>
                    </Link>
                    <Link to="/about">
                      <Button color="inherit">About</Button>
                      </Link>
                     <Link to="/the_projects">
                     <Button color="inherit">Research Projects</Button>
                    </Link>
                    <Link to="/the_events">
                     <Button color="inherit">Events</Button>
                    </Link>

                 { user ?
                 <>
                    <Link to="/dashboard">
                    <Button color="inherit">Dashboard</Button>
                    </Link> 

                    <Link to="">
                    <Button color="inherit"
                        onClick={()=> logoutHandler()}> Log out </Button>
                    </Link>
                    
                 </>
                    :<> 
                   
                    
                      <Link to="/sign_in">
                      <Button color="inherit">Log in</Button>
                      </Link>
                      </>
                 }

                 

             </Toolbar>
        </AppBar>
    )
}

export default Header;