import React, { Component } from "react";
 import Image from "next/image";
 import {RiImageAddFill} from 'react-icons/ri'
 import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });


  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    for (let i = 0; i < values.images.length; i++) {
      formData.append("pic", values.images[i]);
    }



    setSubmitting(false);
  };
    

export default class ImageUploadPreview extends Component {
     
  
    fileObj = [];
    fileArray = [];


 
     
    constructor(props) {
        super(props);
         
        this.state = {
            file: [null]
        };
         
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
    }
  
    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }
  
 
     
    async onSubmit(e){
        e.preventDefault() 
        this.uploadFile(this.state.file);
        console.log(this.state.file);
        console.log('asb')
    }
 
    async uploadFile(file){ 
        const formData = new FormData();
        console.log(formData);
    } ; 

   

   

  
    render() {
        return (

            <div className="row">
             

                 
            <form id='my-formm' onSubmit={ this.onSubmit } className="mt-16 w-fit  grid grid-cols-2 sm:grid-cols-4  ">
                {(this.fileArray || []).map((url ,index) => (
                    <div key={index} className="relative w-40 aspect-square mx-2 ">
                        <Image fill src={url} alt="..." key={url} className="p-2 rounded"/>
                    </div>
                ))}
                    <div className="form-group mx-2  rounded border-[3px]  border-zinc-400   w-min aspect-square  relative">
                         <RiImageAddFill className="h-16 text-zinc-400 w-16 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                        <input type="file" className="form-control opacity-0 cursor-pointer  w-40 h-40 bg-red-900" onChange={this.uploadMultipleFiles} multiple />
                    </div>
                </form >



                <div>
                <button form="my-formm" className="btn bg-red-500 px-4 py-2 rounded text-sm text-white font-bold btn-success" type='submit'  >Upload File</button>
                </div>
            </div>
        )
    }
}