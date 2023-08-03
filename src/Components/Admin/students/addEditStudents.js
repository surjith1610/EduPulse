import React from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";

import { useFormik } from "formik";
import * as Yup from 'yup';

import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from "../../Utils/tools";
import { TextField, Select, MenuItem, FormControl, Button } from "@mui/material";
import { studentsCollection, firebase } from "../../../firebase";

import Fileuploader from '../../Utils/fileUploader';

const defaultValues = {
    firstname:'',
    lastname:'',
    date:'',
    term:'',
    enrollno:'',
    campus:'',
    role:'',
    status:''
}

const AddEditStudents = (props) => {
    const [loading,setLoading] = useState(false);
    const [formType,setFormType] = useState('');
    const [values, setValues] = useState(defaultValues);
   // const [defaultImg,setDefaultImg] = useState('');

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema:Yup.object({
            firstname:Yup.string()
            .required('This input is required'),
            lastname:Yup.string()
            .required('This input is required'),
            enrollno:Yup.string()
            .required('This input is required'),
            term:Yup.string()
            .required('This input is required'),
            date:Yup.string()
            .required('This input is required'),
            campus:Yup.string()
            .required('This input is required'),
            role:Yup.string()
            .required('This input is required'),
            status:Yup.string()
            .required('This input is required'),
        }),
        onSubmit:(values)=>{ 
            submitForm(values);
        }
    });


    const submitForm = (values) => {
        let dataToSubmit = values;
        setLoading(true)

        if( formType === 'add'){
            studentsCollection.add(dataToSubmit)
            .then(()=>{
                showSuccessToast('Student added');
                formik.resetForm();
                props.history.push('/admin_students');
            }).catch(error => {
                showErrorToast(error);
            });
        } else {
            studentsCollection.doc(props.match.params.studentid).update(dataToSubmit)
            .then(()=>{
                showSuccessToast('Student updated');
            }).catch(error=>{
                showErrorToast(error);
            }).finally(()=>{
                setLoading(false)
            })
        }
    }


    useEffect(()=>{
        const param = props.match.params.studentid;
        if(param){
            studentsCollection.doc(param).get().then( snapshot => {
                 if(snapshot.data()){
                //     //// 
                     firebase.storage().ref('students') //students
                //     .child(snapshot.data().image).getDownloadURL()
                //     .then( url => {
                //         updateImageName(snapshot.data().image)
                //         setDefaultImg(url)
                //     });

                    setFormType('edit');
                   setValues(snapshot.data())
                 } else {
                     showErrorToast('Sorry, nothing was found')
                }
            }).catch(error=>{
                showErrorToast(error)
            })
        } else {
            setFormType('add');
            setValues(defaultValues)
        }

    },[props.match.params.studentid])


    // const updateImageName = (filename) => {
    //     formik.setFieldValue('image',filename)
    // }

    // const resetImage = () => {
    //     formik.setFieldValue('image','');
    //     setDefaultImg('')
    // }


    return(
        <AdminLayout title={formType === 'add'? 'Add Student':'Edit Student'} >
            <div className="editstudents_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        {/* <FormControl  error={selectIsError(formik,'image')}>
                            <Fileuploader
                                dir="students"
                                defaultImg={defaultImg} /// image url
                                defaultImgName={formik.values.image} /// name of file
                                filename={(filename)=> updateImageName(filename)}
                                resetImage={()=> resetImage()}
                            />
                             {selectErrorHelper(formik,'image')}
                        </FormControl> */}
                        
                        <h4>Student Info</h4>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="firstname"
                                    name="firstname"
                                    variant="outlined"
                                    placeholder="Add firstname"
                                    {...formik.getFieldProps('firstname')}
                                    {...textErrorHelper(formik,'firstname')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    variant="outlined"
                                    placeholder="Add lastname"
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper(formik,'lastname')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="enrollno"
                                    name="enrollno"
                                    variant="outlined"
                                    placeholder="Add Register Number"
                                    {...formik.getFieldProps('enrollno')}
                                    {...textErrorHelper(formik,'enrollno')}
                                />
                            
                            </FormControl>
                        </div>
                        <div>
                            <h4>Add Date Of Birth</h4>
                            <FormControl>
                             <TextField
                                    id="date"
                                    name="date"
                                    type="date"
                                    variant="outlined"
                                    {...formik.getFieldProps('date')}
                                    {...textErrorHelper(formik,'date')}
                                />
                      
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'term')}>
                                <Select
                                    id="term"
                                    name="term"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('term')}
                                >
                                    <MenuItem value="" disabled>Select a Term</MenuItem>
                                    <MenuItem value="Winter">Winter</MenuItem>
                                    <MenuItem value="Spring">Spring</MenuItem>
                                    <MenuItem value="Fall">Fall</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'term')}
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'campus')}>
                                <Select
                                    id="campus"
                                    name="campus"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('campus')}
                                >
                                    <MenuItem value="" disabled>Select a Campus</MenuItem>
                                    <MenuItem value="Waterloo">Waterloo</MenuItem>
                                    <MenuItem value="Brantford">Brantford</MenuItem>
                                    <MenuItem value="Milton">Milton</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'campus')}
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'role')}>
                                <Select
                                    id="role"
                                    name="role"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('role')}
                                >
                                    <MenuItem value="" disabled>Select a Role</MenuItem>
                                    <MenuItem value="Research Assistant">Research Assistant</MenuItem>
                                    <MenuItem value="Volunteer">Volunteer</MenuItem>
                                    <MenuItem value="Exchange Student">Exchange Student</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'role')}
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'status')}>
                                <Select
                                    id="status"
                                    name="status"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('status')}
                                >
                                    <MenuItem value="" disabled>Select Student Status</MenuItem>
                                    <MenuItem value="Domestic">Domestic</MenuItem>
                                    <MenuItem value="International">International</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'status')}
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            { formType === 'add' ?
                                'Add student'
                            :
                                'Edit student'
                            }
                        </Button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditStudents;