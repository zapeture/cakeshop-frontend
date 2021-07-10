import React from 'react';
import styled from 'styled-components';
import Image from 'next/dist/client/image';
import { SiTiktok } from 'react-icons/si';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import { MdCopyright } from 'react-icons/md';
const Footer = () => {
  return (
    <>
      <FooterStyles id='footer'>
        <div className='footer-header'>
          <div className='footer-section address-section'>
            <ul>
              <li>Marszalka Focha 80</li>
              <li> Poznan, Poland</li>
              <li>+4859979101</li>
              <li>contact@fortunezviregei.com</li>
            </ul>
          </div>
          <div className='footer-section slogan-section'>
            <div className='logo-container-footer'>
              <h1>Profound Cakes</h1>
            </div>
            <p>
              Profound cakes are as the name says greatly profound,
              ourcommitment to quality and excellence remains truly unparalled
            </p>
          </div>
          <div className='footer-section icon-section'>
            <SiTiktok className='icon' />
            <FaFacebookF className='icon' />
            <AiOutlineInstagram className='icon' />
            <FiTwitter className='icon' />
          </div>
        </div>
        <div className='footer-footer'>
          <p>
            <span>Copyright Zapeture Creations {new Date().getFullYear()}</span>{' '}
            <MdCopyright />
          </p>
        </div>
      </FooterStyles>
    </>
  );
};
const FooterStyles = styled.footer`
  /* global footer start */
  width: 100%;
  position: relative;
  background: #634f35;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: 'Quicksand', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .footer-header {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .footer-footer {
    width: 100%;
    border-top: 1px #e1c089 solid;
  }

  .footer-footer p {
    text-align: center;
    margin: 10px;
  }

  .footer-section {
    margin: 20px 10px;
  }

  .address-section {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .address-section ul {
    list-style: none;
    line-height: 1.7;
    font-size: 1rem;
  }

  .slogan-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-left: 1px solid #e1c089;
    border-right: 1px solid #e1c089;
    line-height: 1.7;
    font-size: 1rem;
  }

  .logo-container-footer h1 {
    font-size: 5rem;
    letter-spacing: 0.3rem;
    font-family: 'bella_scriptregular';
    text-align: center;
    font-weight: 400;
    color: #e1c089;
  }

  .icon-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-section .icon {
    width: 50px;
    height: 50px;
    margin: 10px;
    cursor: pointer;
    color: #e1c089;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
  @media screen and (max-width: 768px) {
    .footer-header {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }

    .logo-container-footer {
      margin-bottom: 20px;
    }

    .logo-container-footer h1 {
      border-bottom: 2px #e1c089 solid;
    }

    .slogan-section {
      grid-row: 1 / 2;
      border-left: none;
      border-right: none;
    }

    .icon-section {
      grid-row: 3 / 4;
    }
  }
`;
export default Footer;
