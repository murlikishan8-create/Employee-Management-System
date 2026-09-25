import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react'


const baseURL = 'http://localhost:8000';


const ModalDetails = ({ setShowModal }) => {

  const [Loading, setLoading] = useState(false);
  
  const createEmployee = async (values) => {
    setLoading(true)
    try {
        const res = await fetch(`${baseURL}/employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
	    body: JSON.stringify(values)
        })
        console.log(res);
        setLoading(false);
        setShowModal(false)
    } catch (error) {
        console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        job: '',
        dateOfJoining: '',
        image: ''
    },
    onSubmit: values => {
        createEmployee(values)
    },
  })

  return (
    <div>
        <form action="" onSubmit={formik.handleSubmit}>
            <div>
                <div>New Employee Details</div>
            </div>

            <div>
                <div>
                    <label htmlFor="">First Name</label>
                    <input type="text" name='firstname'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.firstname}
                    />
                </div>

                <div>
                    <label htmlFor="">Last Name</label>
                    <input type="text" name='lastname'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                    />
                </div>

                <div>
                    <label htmlFor="">Image</label>
                    <input type="text" name='image'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.image}
                    />
                </div>

                <div>
                    <label htmlFor="">Email Address</label>
                    <input type="email" name='email'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>

                <div>
                    <label htmlFor="">Phone</label>
                    <input type="text" name='phone'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                </div>

                <div>
                    <label htmlFor="">Job Position</label>
                    <input type="text" name='job'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.job}
                    />
                </div>

                <div>
                    <label htmlFor="">Date Of Joining</label>
                    <input type="text" name='dateOfJoining'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.dateOfJoining}
                    />
                </div>

                <div>
                    <button type="submit">{Loading ? 'Saving...' : 'Save Details'}</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default ModalDetails
