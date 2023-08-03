import React from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";

import { useFormik } from "formik";
import * as Yup from 'yup';

import { showErrorToast, showSuccessToast, textErrorHelper, selectErrorHelper, selectIsError } from "../../Utils/tools";
import { TextField, Select, MenuItem, FormControl, Button } from "@mui/material";
import { projectsCollection, firebase } from "../../../firebase";

import Fileuploader from '../../Utils/fileUploader';

const defaultValues = {
    title:'',
    domain:'',
    lead:'',
    supervisor:'',
    date:'',
    funding:'',
    progress:'',
    p_status:''
}

const AddEditProjects = (props) => {
    const [loading,setLoading] = useState(false);
    const [formType,setFormType] = useState('');
    const [values, setValues] = useState(defaultValues);
   const [defaultImg,setDefaultImg] = useState('');

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema:Yup.object({
            title:Yup.string()
            .required('This input is required'),
            domain:Yup.string()
            .required('This input is required'),
            lead:Yup.string()
            .required('This input is required'),
            supervisor:Yup.string()
            .required('This input is required'),
            progress:Yup.number()
            .required('This input is required')
            .min(0,'The minimum is 0')
            .max(100,'The maximum is 100'),
            date:Yup.string()
            .required('This input is required'),
            funding:Yup.string()
            .required('This input is required'),
            p_status:Yup.string()
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
            projectsCollection.add(dataToSubmit)
            .then(()=>{
                showSuccessToast('Project added');
                formik.resetForm();
                props.history.push('/admin_projects');
            }).catch(error => {
                showErrorToast(error);
            });
        } else {
            projectsCollection.doc(props.match.params.projectid).update(dataToSubmit)
            .then(()=>{
                showSuccessToast('Project updated');
            }).catch(error=>{
                showErrorToast(error);
            }).finally(()=>{
                setLoading(false)
            })
        }
    }
//

    useEffect(()=>{
        const param = props.match.params.projectid;
        if(param){
            projectsCollection.doc(param).get().then( snapshot => {
                 if(snapshot.data()){
                //     //// 
                     firebase.storage().ref('projects') //students
                    .child(snapshot.data().image).getDownloadURL()
                    .then( url => {
                        updateImageName(snapshot.data().image)
                        setDefaultImg(url)
                    });

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

    },[props.match.params.projectid])


    const updateImageName = (filename) => {
        formik.setFieldValue('image',filename)
    }

    const resetImage = () => {
        formik.setFieldValue('image','');
        setDefaultImg('')
    }


    return(
        <AdminLayout title={formType === 'add'? 'Add Project':'Edit Project'} >
            <div className="editprojects_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        <FormControl  error={selectIsError(formik,'image')}>
                            <Fileuploader
                                dir="projects"
                                defaultImg={defaultImg} /// image url
                                defaultImgName={formik.values.image} /// name of file
                                filename={(filename)=> updateImageName(filename)}
                                resetImage={()=> resetImage()}
                            />
                             {selectErrorHelper(formik,'image')}
                        </FormControl>
                        
                        <h4>Project Info</h4>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="title"
                                    name="title"
                                    variant="outlined"
                                    placeholder="Add Project Title"
                                    {...formik.getFieldProps('title')}
                                    {...textErrorHelper(formik,'title')}
                                />
                            
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'domain')}>
                                <Select
                                    id="domain"
                                    name="domain"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('domain')}
                                >
                                    <MenuItem value="" disabled>Select Project Domain</MenuItem>
                                    <MenuItem value="Education">Education</MenuItem>
                                    <MenuItem value="Tech">Technology Integration</MenuItem>
                                    <MenuItem value="leaning">Learning</MenuItem>
                                    <MenuItem value="teaching">Teaching</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'domain')}
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="lead"
                                    name="lead"
                                    variant="outlined"
                                    placeholder="Add Lead"
                                    {...formik.getFieldProps('lead')}
                                    {...textErrorHelper(formik,'lead')}
                                />
                            
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField
                                    id="supervisor"
                                    name="supervisor"
                                    variant="outlined"
                                    placeholder="Add Supervisor"
                                    {...formik.getFieldProps('supervisor')}
                                    {...textErrorHelper(formik,'supervisor')}
                                />
                            
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'funding')}>
                                <Select
                                    id="funding"
                                    name="funding"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('funding')}
                                >
                                    <MenuItem value="" disabled>Select Funding Type</MenuItem>
                                    <MenuItem value="self">Self</MenuItem>
                                    <MenuItem value="university">University</MenuItem>
                                    <MenuItem value="external">External Agencies</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'funding')}
                            </FormControl>
                        </div>
                        <div className="mb-5">
                            <FormControl error={selectIsError(formik,'p_status')}>
                                <Select
                                    id="p_status"
                                    name="p_status"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('p_status')}
                                >
                                    <MenuItem value="" disabled>Project Status</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'p_status')}
                            </FormControl>
                        </div>
                        <div>
                            <h4>Add Start Date</h4>
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
                            <FormControl>
                                <TextField
                                    id="progress"
                                    name="progress"
                                    variant="outlined"
                                    placeholder="Progress"
                                    {...formik.getFieldProps('progress')}
                                    {...textErrorHelper(formik,'progress')}
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
                                'Add project'
                            :
                                'Edit project'
                            }
                        </Button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditProjects;