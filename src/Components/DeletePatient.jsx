import axios from 'axios'
import React from 'react'
import BaseURL from '../common/Api';

const DeletePatient = ({currentItem}) => {
  const deleteUrl = `${BaseURL}/patient/`+currentItem

  const handleDelete = async () => {
    try {
      const response = await axios.delete(deleteUrl);
      console.log("Patient deleted successfully", response);
      // Add any additional logic or state updates here as needed
    } catch (error) {
      console.error("Error deleting patient", error);
      // Handle the error appropriately (e.g., show a user-friendly message)
    }
  };

  return (
    <>
        <button type='submit' onClick={handleDelete} className='btn-patient-delete'>Delete Patient</button>
    </>
  )
}

export default DeletePatient