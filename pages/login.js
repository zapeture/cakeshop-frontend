import React from 'react';
import styled from 'styled-components';
import { ImCross } from 'react-icons/im';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const { loginUser } = useContext(AuthContext);

  const router = useRouter();
  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginStyles>
        <div id='simpleModal' className='modal'>
          <div className='modal-content'>
            <span className='closeBtn' onClick={goBack}>
              <ImCross sise='1rem' />
            </span>
            <div className='container'>
              <h1 className='order-heading'>Login</h1>
              <div className='form-container'>
                <h1 className='order-heading'>Login</h1>
                <form onSubmit={handleSubmit}>
                  <ul className='form-style-1'>
                    <div className='form-side'>
                      <li>
                        <label>Email</label>
                        <input
                          required
                          type='email'
                          name='field3'
                          className='field-long'
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Email'
                        />
                      </li>
                    </div>
                  </ul>
                  <button type='submit' className='button'>
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LoginStyles>
    </>
  );
}

const LoginStyles = styled.div`
  width: 100%;
  position: relative;
  min-height: 100vh;
  background: url(/images/henry-co-tqu0IOMaiU8-unsplash.jpg) no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: 'Quicksand', sans-serif;
  display: flex;
  flex-direction: column;
  .button {
    background: coral;
    padding: 1em 2em;
    color: white;
    border: 0;
  }

  .button:hover {
    background: #333;
  }

  .modal {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background-color: #f4f4f4;
    margin: 20% auto;
    padding: 20px;
    width: 70%;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    animation-name: modalopen;
    animation-duration: 0.2s;
    border-radius: 20px;
  }

  .closeBtn {
    color: #ccc;
    float: right;
    font-size: 30px;
  }
  .closeBtn:hover,
  .closeBtn:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .form-container {
    width: 80%;
    background: #f4f0e1;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    animation-name: modalopen;
    border-radius: 10px;
  }

  .form-side {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }

  form {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    color: #634f35;
  }

  .form-style-1 {
    margin: 10px auto;
    width: 100%;
    padding: 20px 12px 10px 20px;
    font: 13px 'Quicksand', sans-serif;
  }
  .form-style-1 li {
    padding: 0;
    display: block;
    list-style: none;
    margin: 10px 0 0 0;
  }
  .form-style-1 label {
    margin: 0 0 3px 0;
    padding: 0px;
    display: block;
    font-weight: bold;
  }
  .form-style-1 input[type='text'],
  .form-style-1 input[type='date'],
  .form-style-1 input[type='datetime'],
  .form-style-1 input[type='number'],
  .form-style-1 input[type='search'],
  .form-style-1 input[type='time'],
  .form-style-1 input[type='url'],
  .form-style-1 input[type='email'],
  textarea,
  select {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border: 1px solid #bebebe;
    padding: 7px;
    margin: 0px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    outline: none;
  }
  .form-style-1 input[type='text']:focus,
  .form-style-1 input[type='date']:focus,
  .form-style-1 input[type='datetime']:focus,
  .form-style-1 input[type='number']:focus,
  .form-style-1 input[type='search']:focus,
  .form-style-1 input[type='time']:focus,
  .form-style-1 input[type='url']:focus,
  .form-style-1 input[type='email']:focus,
  .form-style-1 textarea:focus,
  .form-style-1 select:focus {
    -moz-box-shadow: 0 0 8px #88d5e9;
    -webkit-box-shadow: 0 0 8px #88d5e9;
    box-shadow: 0 0 8px #88d5e9;
    border: 1px solid #88d5e9;
  }
  .form-style-1 .field-divided {
    width: 49%;
  }

  .form-style-1 .field-long {
    width: 100%;
  }
  .form-style-1 .field-select {
    width: 100%;
  }
  .form-style-1 .field-textarea {
    height: 100px;
  }
  .form-style-1 input[type='submit'],
  .form-style-1 input[type='button'] {
    background: #4b99ad;
    padding: 8px 15px 8px 15px;
    border: none;
    color: #fff;
  }
  .form-style-1 input[type='submit']:hover,
  .form-style-1 input[type='button']:hover {
    background: #4691a4;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }

  .button {
    padding: 5px 20px;
    background: #e1c089;
    border: none;
    font-size: 1.2rem;
    font-family: 'Quicksand', sans-serif;
    margin: 10px 20px;
    border-radius: 5px;
  }
  .button:hover {
    background: #634f35;

    color: #e1c089;
  }
`;
