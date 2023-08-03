import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import {Link} from 'react-router-dom';
import { studentsCollection } from '../../../firebase';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { showErrorToast } from '../../Utils/tools';

const AdminStudents = () => {
    const [lastVisible,setLastVisible] = useState(null);
    const [loading,setLoading]= useState(false);
    const [students,setStudents] = useState(null);


    useEffect(()=>{
        if(!students){
            setLoading(true);
            studentsCollection
            .limit(10)
            .get()
            .then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length -1];
                const students = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));
                setLastVisible(lastVisible);
                setStudents(students)
            }).catch(error=>{
                showErrorToast(error)
            }).finally(()=>{
                setLoading(false)
            })

        }
    },[students]);


    const loadMoreStudents = () => {
        if(lastVisible){
            setLoading(true);
            studentsCollection
            .startAfter(lastVisible)
            .limit(10)
            .get()
            .then( snapshot =>{
                const lastVisible = snapshot.docs[snapshot.docs.length -1];
                const newStudents = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setStudents([...students,...newStudents]);
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
        <AdminLayout title="The Students">
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    component={Link}
                    to={'/admin_students/add_student'}
                >
                    Add student
                </Button>
            </div>

            <Paper className="mb-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Register Number</TableCell>
                            <TableCell>DOB</TableCell>
                            <TableCell>Term</TableCell>
                            <TableCell>Campus</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Student status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { students ?
                            students.map((student,i)=>(
                            <TableRow key={student.id}>
                                <TableCell>
                                    <Link to={`/admin_students/edit_student/${student.id}`}>
                                        {student.firstname}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_students/edit_student/${student.id}`}>
                                        {student.lastname}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                <Link to={`/admin_students/edit_student/${student.id}`}>
                                    {student.enrollno}
                                </Link>
                                </TableCell>
                                <TableCell>
                                <Link to={`/admin_students/edit_student/${student.id}`}>
                                    {student.date}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                <Link to={`/admin_students/edit_student/${student.id}`}>
                                    {student.term}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                <Link to={`/admin_students/edit_student/${student.id}`}>
                                    {student.campus}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                <Link to={`/admin_students/edit_student/${student.id}`}>
                                    {student.role}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                <Link to={`/admin_students/edit_student/${student.id}`}>
                                    {student.status}
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
                onClick={()=> loadMoreStudents()}
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

export default AdminStudents;