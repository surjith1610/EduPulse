import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { ListItem } from "@mui/material";
import { logoutHandler } from '../../Utils/tools';

const AdminNav = (props) => {
    const link = [
        {
            title:'Students',
            linkTo:'/admin_students'
        },
        {
            title:'Lab Members',
            linkTo:'/admin_members'
        },
        {
            title:'Research Projects',
            linkTo:'/admin_projects'
        },
        // {
        //     title:'Matches',
        //     linkTo: '/admin_matches'
        // }
        
    ]

    const renderItems = () => (
        link.map(link=> (
            <Link to={link.linkTo} key ={link.title}>
                <ListItem button className="admin_nav_link">
                    {link.title}
                </ListItem>
            </Link>
        ))
    )

    return(
       <div>
        {renderItems()}
        <ListItem button className="admin_nav_link"
            onClick={()=> logoutHandler()}
        >
            Log out
        </ListItem>
       </div>
    )
}

export default withRouter(AdminNav);