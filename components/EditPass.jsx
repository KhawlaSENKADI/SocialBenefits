'use client'
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const EditPass = () => {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordVisibility = (type) => {
    if (type === 'old') setShowOldPassword(!showOldPassword);
    else if (type === 'new') setShowNewPassword(!showNewPassword);
    else if (type === 'confirm') setShowConfirmPassword(!showConfirmPassword);
  };


  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Please enter your old password.'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters.')
      .required('Please enter a new password.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.')
      .required('Please confirm your new password.'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
        try {
            const response = await axios.post('http://localhost:3006/changePassword', {
              email: localStorage.getItem('id'),
              old_password: values.oldPassword,
              new_password: values.newPassword
            });
        
            console.log(response.data); // Output the response data to the console
          } catch (error) {
            console.error(error);
          }
     },
  });

  const closeModal = () => {
    setError('');
  };

  return (
    <>                  
    
    <div className="text-[17px] text-[#2C435A] relative  mx-[8%] my-[5%]">
    <h1> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Veuillez entrer votre ancien mot de passe pour confirmer votre identité. Ensuite, choisissez et confirmez votre nouveau mot de passe dans les champs prévus. Cliquez sur "Enregistrer" pour finaliser le changement. </h1>
    </div>


    <div className="flex items-center justify-center ">

      
      <div className="w-full">
        <form onSubmit={formik.handleSubmit}>
          <div className="mx-[10%] mb-4">
            <label htmlFor="oldPassword" className="block font-medium text-gray-700">
              Old Password
            </label>
            <div className="absolute mt-[1.5%] ml-[44%]"
            onClick={() => handlePasswordVisibility('old')}>
            <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
            </div>
            <input
              type={showOldPassword ? 'text' : 'password'}
              id="oldPassword"
              name="oldPassword"
              className={` peer block w-[70%]  rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <div className="text-red-500 mt-1 mx-[20%]">{formik.errors.oldPassword}</div>
            )}
          </div>
          <div className="mx-[10%]  mb-4 ">
            <label htmlFor="newPassword" className="block font-medium text-gray-700">
              New Password
            </label>
            <div className="absolute mt-[1.5%] ml-[44%]"
            onClick={() => handlePasswordVisibility('new')}>
            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
            </div>
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              className={` peer block w-[70%]  rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-500 mt-1 mx-[20%]">{formik.errors.newPassword}</div>
            )}
          </div>
          <div className="mx-[10%] mb-4">
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="absolute mt-[1.5%] ml-[44%]"
            onClick={() => handlePasswordVisibility('confirm')}>
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className={` peer block w-[70%]  rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 mt-1 mx-[20%]">{formik.errors.confirmPassword}</div>
            )}
          </div>
          {error && <div className="text-red-500 mx-[20%] mb-4">{error}</div>}
          {success && (
            <Modal isOpen={true} onRequestClose={closeModal}>
              <h2 className="text-xl font-bold mb-4">Success!</h2>
              <p>{success}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={closeModal}>
                Close
              </button>
            </Modal>
          )}
          <button
            type="submit"
            className="bg-red-500 ml-[60%] text-white px-4 py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditPass;
