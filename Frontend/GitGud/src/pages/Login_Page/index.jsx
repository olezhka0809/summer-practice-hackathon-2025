// LoginPage.jsx folosind mdb-react-ui-kit
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import '../../styles/LoginPage.scss'; // Import your custom styles
import logo from '../../../public/assets/logo_complet.webp';

function LoginPage() {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>
          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#f97316' }} />
            <span className="h1 fw-bold mb-0">GuruPanel</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formEmail' type='email' size="lg" />
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formPassword' type='password' size="lg" />

            <MDBBtn className="mb-4 px-5 mx-5 w-100" style={{ backgroundColor: '#f97316' }} size='lg'>Login</MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5">
              <a className="text-muted" href="#!">Forgot password?</a>
            </p>
            
            <p>
                Don't have an account?{' '}
                <Link to="/register" className="link-orange">Register here</Link>
            </p>
          </div>
        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img
            src={logo}
            alt="Login visual"
            className="w-100"
            style={{ objectFit: 'cover', objectPosition: 'left' }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginPage;
