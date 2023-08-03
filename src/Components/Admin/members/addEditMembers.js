import React from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";

import { useFormik } from "formik";
import * as Yup from 'yup';

import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from "../../Utils/tools";
import { TextField, Select, MenuItem, FormControl, Button } from "@mui/material";
import { membersCollection, firebase } from "../../../firebase";

//import Fileuploader from '../../Utils/fileUploader';

const defaultValues = {
    title:'',
    firstname:'',
    lastname:'',
    email:'',
    mobile:'',
    campus:'',
    role:'',
    status:'',
    join_date:''
}

const AddEditMembers = (props) => {
    const [loading,setLoading] = useState(false);
    const [formType,setFormType] = useState('');
    const [values, setValues] = useState(defaultValues);
   // const [defaultImg,setDefaultImg] = useState('');

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema:Yup.object({
            title:Yup.string()
            .required('This input is required'),
            firstname:Yup.string()
            .required('This input is required'),
            lastname:Yup.string()
            .required('This input is required'),
            email:Yup.string()
            .required('This input is required'),
            mobile:Yup.number()
            .required('This input is required'),
            join_date:Yup.string()
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
            membersCollection.add(dataToSubmit)
            .then(()=>{
                showSuccessToast('Member added');
                formik.resetForm();
                props.history.push('/admin_members');
            }).catch(error => {
                showErrorToast(error);
            });
        } else {
            membersCollection.doc(props.match.params.memberid).update(dataToSubmit)
            .then(()=>{
                showSuccessToast('Member updated');
            }).catch(error=>{
                showErrorToast(error);
            }).finally(()=>{
                setLoading(false)
            })
        }
    }
//

    useEffect(()=>{
        const param = props.match.params.memberid;
        if(param){
            membersCollection.doc(param).get().then( snapshot => {
                 if(snapshot.data()){
                //     //// 
                     firebase.storage().ref('members') //students
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

    },[props.match.params.memberid])


    // const updateImageName = (filename) => {
    //     formik.setFieldValue('image',filename)
    // }

    // const resetImage = () => {
    //     formik.setFieldValue('image','');
    //     setDefaultImg('')
    // }


    return(
        <AdminLayout title={formType === 'add'? 'Add Member':'Edit Member'} >
            <div className="editmembers_dialog_wrapper">
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
                        
                        <h4>Members Info</h4>
                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'title')}>
                                <Select
                                    id="title"
                                    name="title"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('title')}
                                >
                                    <MenuItem value="" disabled>Select a Title</MenuItem>
                                    <MenuItem value="Dr.">Dr.</MenuItem>
                                    <MenuItem value="Mr.">Mr.</MenuItem>
                                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                                    <MenuItem value="Ms.">Ms.</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'title')}
                            </FormControl>
                        </div>
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
                                    id="email"
                                    name="email"
                                    variant="outlined"
                                    placeholder="Add E-mail"
                                    {...formik.getFieldProps('email')}
                                    {...textErrorHelper(formik,'email')}
                                />
                            
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="mobile"
                                    name="mobile"
                                    variant="outlined"
                                    placeholder="Mobile No"
                                    {...formik.getFieldProps('mobile')}
                                    {...textErrorHelper(formik,'mobile')}
                                />
                            
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
                                    <MenuItem value="" disabled>Select an Area</MenuItem>
                                    <MenuItem value="Education">Education</MenuItem>
                                    <MenuItem value="AI">Technology Integration</MenuItem>
                                    <MenuItem value="Learning">Learning</MenuItem>
                                    <MenuItem value="Teaching">Teaching</MenuItem>
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
                                    <MenuItem value="" disabled>Select Status</MenuItem>
                                    <MenuItem value="Current">Current</MenuItem>
                                    <MenuItem value="Former">Former</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'status')}
                            </FormControl>
                        </div>
                        <div>
                            <h4>Add Date Of Joining</h4>
                            <FormControl>
                             <TextField
                                    id="join_date"
                                    name="join_date"
                                    type="date"
                                    variant="outlined"
                                    {...formik.getFieldProps('join_date')}
                                    {...textErrorHelper(formik,'join_date')}
                                />
                      
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            { formType === 'add' ?
                                'Add member'
                            :
                                'Edit member'
                            }
                        </Button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditMembers;