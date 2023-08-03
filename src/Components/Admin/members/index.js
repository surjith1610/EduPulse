import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import {Link} from 'react-router-dom';
import { membersCollection } from '../../../firebase';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { showErrorToast } from '../../Utils/tools';

const AdminMembers = () => {
    const [lastVisible,setLastVisible] = useState(null);
    const [loading,setLoading]= useState(false);
    const [members,setMembers] = useState(null);


    useEffect(()=>{
        if(!members){
            setLoading(true);
            membersCollection
            .limit(10)
            .get()
            .then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length -1];
                const members = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));
                setLastVisible(lastVisible);
                setMembers(members)
            }).catch(error=>{
                showErrorToast(error)
            }).finally(()=>{
                setLoading(false)
            })

        }
    },[members]);


    const loadMoreMembers = () => {
        if(lastVisible){
            setLoading(true);
            membersCollection
            .startAfter(lastVisible)
            .limit(10)
            .get()
            .then( snapshot =>{
                const lastVisible = snapshot.docs[snapshot.docs.length -1];
                const newMembers = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setMembers([...members,...newMembers]);
            }).catch(error=>{
                showErrorToast(error)
            }).finally(()=>{
                setLoading(false)
            })


        } else {
            showErrorToast('nothing to load')
        }

    }



    return(
        <AdminLayout title="The Members">
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    component={Link}
                    to={'/admin_members/add_member'}
                >
                    Add member
                </Button>
            </div>

            <Paper className="mb-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Mobile Number</TableCell>
                            <TableCell>Campus</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Joining Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { members ?
                            members.map((member,i)=>(
                            <TableRow key={member.id}>
                                <TableCell>
                                    <Link to={`/admin_members/edit_member/${member.id}`}>
                                        {member.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_members/edit_member/${member.id}`}>
                                        {member.firstname}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_members/edit_member/${member.id}`}>
                                        {member.lastname}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_members/edit_member/${member.id}`}>
                                        {member.email}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_members/edit_member/${member.id}`}>
                                        {member.mobile}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_members/edit_member/${member.id}`}>
                                        {member.campus}
                                    </Link>
                                </TableCell>
                                
                                <TableCell>
                                    <Link to={`/admin_members/edit_member/${member.id}`}>
                                        {member.role}
                                    </Link>
                                </TableCell>
                                
                                <TableCell>
                                    <Link to={`/admin_members/edit_member/${member.id}`}>
                                        {member.status}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_members/edit_member/${member.id}`}>
                                        {member.join_date}
                                    </Link>
                                </TableCell>
                                
                            </TableRow>  
                            ))
                        :null}
                    </TableBody>
                </Table>
            </Paper>


            <Button
                variant="contained"
                color="primary"
                onClick={()=> loadMoreMembers()}
                disabled={loading}
            >
                Load more
            </Button>

            <div className="admin_progress">
                { loading ?
                    <CircularProgress thickness={7} style={{color:'#98c5e9'}}/>
                :null}
            </div>

        </AdminLayout>
    )
}

export default AdminMembers;