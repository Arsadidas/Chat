import React, {useState,useEffect} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom";

import logo from '../assets/logo.svg'
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {registerRoute} from "../utils/APIRoutes";

const Register = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (handleValidation()) {
            const {password, userName, email} = values
            const {data} = await axios.post(registerRoute, {
                userName,
                email,
                password
            })
            if (data.status === false) {
                alert(data.msg)
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            }
            navigate('/')
        }
    }

    const handleValidation = () => {
        const {confirmPassword, password, userName, email} = values
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same!", toastOptions)
            alert('Password and confirm password should be same!')
            return false
        } else if (userName.length < 3) {
            alert('Username should be greater than 3 symbols')
            return false
        } else if (password.length < 8) {
            alert('Password should be equal or greater then 8 symbols')
            return false
        } else if (email === '') {
            alert('Email is requared')
        }
        return true
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='brand'>
                        <img src={logo} alt="logo"/>
                        <h1>Snappy</h1>
                    </div>
                    <input
                        type="text"
                        placeholder={'Username*'}
                        name={'userName'}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        placeholder={'Email*'}
                        name={'email'}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder={'Password'}
                        name={'password'}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder={'Confirm password'}
                        name={'confirmPassword'}
                        onChange={(e) => handleChange(e)}
                    />
                    <button type={'submit'}>Create User</button>
                    <span>Already have an account? <Link to={'/login'}>Login</Link></span>
                </form>
            </FormContainer>
            {/*<ToastContainer />*/}

        </>
    );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: .3s ease-in-out;

      &:hover {
        background-color: #4e0eff;

      }
    }

    span {
      color: white;
      text-transform: uppercase;

      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }

`;

export default Register;