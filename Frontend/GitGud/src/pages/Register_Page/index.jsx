// Registration_Page.jsx cu link „Back to Login” jos
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../styles/RegistrationPage.scss';
//import logo from '../../../public/assets/logo.png';

function Registration_Page() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    nickname: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        surname: formData.surname,
        nickname: formData.nickname,
        password: formData.password
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Registration failed');

    console.log('User registered:', data);
    // redirect or show success
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <MDBContainer fluid className='registration-page'>
      <MDBRow className='d-flex justify-content-center align-items-center min-vh-100'>
        <MDBCol lg='8'>
          <MDBCard className='shadow rounded-4 overflow-hidden'>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='bg-orange d-none d-md-block'>
                <MDBCardImage
                  src="/assets/logo.png" 
                  alt='Registration Visual'
                  className='w-100 h-100 object-fit-cover'
                />
              </MDBCol>

              <MDBCol md='6'>
                <MDBCardBody className='p-5'>
                  <h3 className='mb-4 text-center'>Registration Info</h3>

                  {error && <div className='alert alert-danger'>{error}</div>}

                  <MDBInput
                    wrapperClass='mb-4'
                    label='Name'
                    id='name'
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <MDBInput
                    wrapperClass='mb-4'
                    label='Surname'
                    id='surname'
                    type='text'
                    name='surname'
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />

                  <MDBInput
                    wrapperClass='mb-4'
                    label='NickName'
                    id='nickname'
                    type='text'
                    name='nickname'
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                  />

                  <div className='mb-4 position-relative'>
                    <MDBInput
                      label='Password'
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <span className='password-toggle-icon' onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <div className='mb-4 position-relative'>
                    <MDBInput
                      label='Confirm Password'
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      name='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <span className='password-toggle-icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <MDBBtn
                    className='w-100'
                    style={{ backgroundColor: '#f97316' }}
                    size='lg'
                    onClick={handleSubmit}
                  >
                    Submit
                  </MDBBtn>

                  <div className='text-center mt-4'>
                    <Link to="/login" className='text-muted'>Back to Login</Link>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Registration_Page;
