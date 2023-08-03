import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import {Link} from 'react-router-dom';
import { projectsCollection } from '../../../firebase';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { showErrorToast } from '../../Utils/tools';

const AdminProjects = () => {
    const [lastVisible,setLastVisible] = useState(null);
    const [loading,setLoading]= useState(false);
    const [projects,setProjects] = useState(null);


    useEffect(()=>{
        if(!projects){
            setLoading(true);
            projectsCollection
            .limit(10)
            .get()
            .then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length -1];
                const projects = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));
                setLastVisible(lastVisible);
                setProjects(projects)
            }).catch(error=>{
                showErrorToast(error)
            }).finally(()=>{
                setLoading(false)
            })

        }
    },[projects]);


    const loadMoreProjects = () => {
        if(lastVisible){
            setLoading(true);
            projectsCollection
            .startAfter(lastVisible)
            .limit(10)
            .get()
            .then( snapshot =>{
                const lastVisible = snapshot.docs[snapshot.docs.length -1];
                const newProjects = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setProjects([...projects,...newProjects]);
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
        <AdminLayout title="The Projects">
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    component={Link}
                    to={'/admin_projects/add_project'}
                >
                    Add project
                </Button>
            </div>

            <Paper className="mb-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Title</TableCell>
                            <TableCell>Project Domain</TableCell>
                            <TableCell>Project Lead</TableCell>
                            <TableCell>Project Supervisor</TableCell>
                            <TableCell>Project Funding</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Progress %</TableCell>
                            <TableCell>Project Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { projects ?
                            projects.map((project,i)=>(
                            <TableRow key={project.id}>
                                <TableCell>
                                    <Link to={`/admin_projects/edit_project/${project.id}`}>
                                        {project.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_projects/edit_project/${project.id}`}>
                                        {project.domain}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_projects/edit_project/${project.id}`}>
                                        {project.lead}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_projects/edit_project/${project.id}`}>
                                        {project.supervisor}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_projects/edit_project/${project.id}`}>
                                        {project.funding}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_projects/edit_project/${project.id}`}>
                                        {project.date}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_projects/edit_project/${project.id}`}>
                                        {project.progress}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                <Link to={`/admin_projects/edit_project/${project.id}`}>
                                        {project.p_status}
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
                onClick={()=> loadMoreProjects()}
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

export default AdminProjects;