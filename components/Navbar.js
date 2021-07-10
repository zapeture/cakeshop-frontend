import { useContext } from 'react';
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import AuthContext from '../context/AuthContext';
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleNav = () => {
    setOpen(!open);
  };

  const { user } = useContext(AuthContext);

  return (
    <Navigation open={open}>
      <header className='header'>
        <div className='header-top'>
          <div className='logo-container'>
            <h1>Profound Cakes</h1>
          </div>
          <div className='hamburger' onClick={toggleNav}>
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
          </div>
        </div>
        <nav className='navbar'>
          <ul className='nav-list'>
            <li className='nav-item'>
              <Link href='/'>
                <a className='nav-link' onClick={toggleNav}>
                  Home
                </a>
              </Link>
            </li>

            <li className='nav-item'>
              <Link href='/products'>
                <a className='nav-link' onClick={toggleNav}>
                  Products
                </a>
              </Link>
            </li>
            <li className='nav-item'>
              <a href='#footer' className='nav-link' onClick={toggleNav}>
                Contact
              </a>
            </li>
            {user ? (
              <li className='nav-item'>
                <Link href='/account'>
                  <a>Account</a>
                </Link>
              </li>
            ) : (
              <li className='nav-item'>
                <Link href='/login'>
                  <a>Login</a>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </Navigation>
  );
};
const Navigation = styled.div`
  width: 100%;
  position: relative;
  background: url(/images/henry-co-tqu0IOMaiU8-unsplash.jpg) no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: 'Quicksand', sans-serif;
  display: flex;
  flex-direction: column;

  .header-top {
    width: 100%;
    display: flex;
    align-items: center;
    overflow-x: hidden;
  }

  .hamburger {
    margin-right: 1.2rem;
    display: none;
    cursor: pointer;
  }
  .logo-container {
    margin: auto;
  }
  .logo-container h1 {
    font-size: 5rem;
    letter-spacing: 0.3rem;
    font-family: 'bella_scriptregular';
    text-align: center;
    font-weight: 400;
    color: #634f35;
  }

  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: #e1c089;
  }

  .auth {
    margin: auto 20px;
  }

  .navbar {
    width: 60%;
    margin: auto;
    z-index: 5;
  }

  .nav-list {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
  }
  .nav-item {
    width: 100%;
    margin: 0 10px;
    display: inline-block;
  }

  .nav-list li a {
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    width: 100%;
    padding: 4px;
    color: #634f35;
    display: block;
    text-align: center;
    transition: all 0.3s ease-in-out;
  }

  .nav-list li a:hover {
    color: #e1c089;
    background: rgb(99, 79, 53, 0.2);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    border-radius: 5px;
  }

  @media screen and (max-width: 768px) {
    .logo-container h1 {
      color: #e1c089;
    }

    .hamburger {
      display: block;
    }

    .logo-container img {
      width: 180px;
    }
    .header-top {
      background: #27221b;
    }
    .navbar {
      width: 100%;
      position: relative;
    }
    .nav-list {
      background: #27221b;
      position: absolute;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      transform: ${({ open }) =>
        open ? 'translateX(0px)' : 'translateX(-1000px)'};
      transition: 0.3s ease-in-out;
    }

    .nav-item {
      padding: 25px 0;
    }

    .hamburger.active .bar:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
`;
export default Navbar;
