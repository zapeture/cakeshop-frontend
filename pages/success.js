import { useRouter } from 'next/router';
import Head from 'next/dist/next-server/lib/head';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { API_URL } from '../utils/urls';
import Link from 'next/dist/client/link';
import styled from 'styled-components';
import BarLoader from 'react-spinners/ClipLoader';
import { ImCross } from 'react-icons/im';
const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(null);

  const { getToken, user } = useContext(AuthContext);

  // console.log(session_id);

  useEffect(() => {
    if (user && session_id && session_id !== undefined) {
      const fetchOrder = async () => {
        setLoading(true);
        try {
          const token = await getToken();

          const res = await fetch(`${API_URL}/orders/confirm`, {
            method: 'POST',
            body: JSON.stringify({ checkout_session: session_id }),
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          setOrder(data);
        } catch (err) {
          setOrder(null);
        }
        setLoading(false);
      };
      fetchOrder();
    }
  }, [user, getToken, session_id]);

  return { order, loading };
};

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const { order, loading } = useOrder(session_id);

  const goBack = (e) => {
    e.preventDefault();
    router.push('/');
  };
  return (
    <SuccessStyles>
      <Head>Payment Succes: Thank you</Head>
      <div id='simpleModal' className='modal'>
        <div className='modal-content'>
          <span className='closeBtn' onClick={goBack}>
            <ImCross sise='1rem' />
          </span>
          <div className='container'>
            <div>
              {loading && (
                <>
                  <BarLoader />
                  <h2>Hold on!</h2>
                  <p>We are confirming your purchase!</p>
                </>
              )}
              {!loading && order && (
                <>
                  <h2>Successful !!!</h2>
                  <p>
                    Your order was processed successfully!{' '}
                    <Link href='/account'>
                      <a className='button'>View Orders</a>
                    </Link>
                    <Link href='/'>
                      <a className='button'>Go Home</a>
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </SuccessStyles>
  );
}

const SuccessStyles = styled.div`
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

  .container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 20px;
  }

  .container .imgBx {
    position: relative;
    display: flex;
    justify-content: center;
    width: 50%;
    align-items: center;
    height: 100%;
    margin: auto;
  }

  .container .imgBx img {
    position: relative;
    width: 100%;
    display: block;
    margin: auto;
    transition: all 0.5s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .container .imgBx img:hover {
    transform: translateY(-5px);
  }
  .container .details {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px;
  }

  .container .details h2 {
    margin: 0;
    padding: 0;
    font-size: 2.5em;
    line-height: 0.8em;
  }
  .container .details h2 span {
    font-size: 0.4em;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #000;
  }
  .container .details p {
    max-width: 85%;
    line-height: 1.5rem;
    margin-top: 30px;
    margin-bottom: 30px;
    color: #333;
    font-size: 15px;
  }

  .container .details h3 {
    margin: 0;
    padding: 0;
    font-size: 2.5em;
    color: #a2a2a2;
    float: left;
  }
  .container .details button {
    padding: 5px 20px;
    background: #e1c089;
    border: none;
    font-size: 1.2rem;
    font-family: 'Quicksand', sans-serif;
    margin: 10px 0;
    float: right;
  }
  .container .details button:hover {
    background: #f4f0e1;
    color: #27221b;
  }

  .button {
    text-decoration: none;
    padding: 5px 20px;
    background: #e1c089;
    border: none;
    font-size: 1.2rem;
    font-family: 'Quicksand', sans-serif;
    margin: 20px;
    padding: 5px 40px;
    border-radius: 5px;
  }
  .button:hover {
    background: #27221b;
    color: #f4f0e1;
  }

  @media (max-width: 1080px) {
    .container {
      height: auto;
    }
    .container .imgBx {
      padding: 40px;
      box-sizing: border-box;
      width: 100% !important;
      height: auto;
      text-align: center;
      overflow: hidden;
    }
    .container .imgBx img {
      left: initial;
      max-width: 100%;
      transform: rotate(0deg);
    }
    .details {
      width: 100% !important;
      height: auto;
      padding: 20px;
    }
    .container .details p {
      max-width: 100%;
      margin-left: 0;
      color: #333;
      font-size: 15px;
    }
  }

  @media (max-width: 600px) {
    .modal-content {
      padding: 20px;
      width: 90%;
    }

    .container .imgBx {
      padding: 0;
      width: 100% !important;
      margin: auto;
    }

    .container .imgBx img {
      margin: auto;
      display: block;
    }

    .container .details h2 {
      font-size: 2em;
      line-height: 0.8em;
    }
    .container .details h2 span {
      font-size: 0.4em;
    }
    .container .details p {
      max-width: 95%;
      margin-top: 30px;
    }

    .container .details h3 {
      margin: 0;
      padding: 0;
      font-size: 2em;
      color: #a2a2a2;
      float: left;
    }
    .container .details button {
      padding: 5px 15px;
      background: #e1c089;
      border: none;
      font-size: 1rem;
      font-family: 'Quicksand', sans-serif;
      margin: 10px 0;
      float: right;
    }
  }

  @keyframes modalopen {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
