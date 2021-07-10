import styled from 'styled-components';
import { ImCross } from 'react-icons/im';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '../utils/urls';
import BarLoader from 'react-spinners/ClipLoader';

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const fetchOrders = async () => {
        if (user) {
          try {
            setLoading(true);
            const token = await getToken();
            const order_res = await fetch(`${API_URL}/orders`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await order_res.json();
            setOrders(data);
          } catch (err) {
            setOrders([]);
          }
          setLoading(false);
        }
      };

      fetchOrders();
      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [user]
  );

  return { orders, loading };
};

export default function Account() {
  const [isPaid, setIsPaid] = useState('none');
  const router = useRouter();
  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const { user, logoutUser, getToken, userLoading } = useContext(AuthContext);
  const { orders, loading } = useOrders(user, getToken);

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <AccountStyles isPaid={isPaid}>
        <div id='simpleModal' className='modal'>
          <div className='modal-content'>
            <span className='closeBtn' onClick={goBack}>
              <ImCross sise='1rem' />
            </span>
            <div className='container'>
              {userLoading ? (
                <BarLoader />
              ) : (
                <div className='user-details'>
                  {!user ? (
                    <>
                      <p>Please login or register</p>
                      <Link href='/'>
                        <a>
                          <button className='button'>Go back</button>
                        </a>
                      </Link>
                    </>
                  ) : (
                    <h2>
                      <span>Welcome</span> {user.email}
                    </h2>
                  )}
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Laborum veritatis voluptas quis amet sequi animi iusto
                    debitis praesentium nisi voluptates?
                  </p>
                  <button className='button' onClick={logoutUser}>
                    Logout
                  </button>
                </div>
              )}
              <div className='order-details'>
                {orders.length === 0 ? (
                  <h3>No Orders</h3>
                ) : loading ? (
                  <h3>Loading Orders</h3>
                ) : (
                  <h3>Your Orders</h3>
                )}

                <hr />
                <ul className='order-list'>
                  {loading ? (
                    <BarLoader />
                  ) : (
                    orders.map((order) => (
                      <li key={order.id} className='order-item'>
                        <span className='image-side'>
                          <Image
                            src={order.product.image.url}
                            alt={order.product.name}
                            width={80}
                            height={80}
                          />
                        </span>

                        <span className='details-side'>
                          <p>{order.product.name}</p>
                          <p>${order.total}</p>
                          <p className='status'>{order.status}</p>
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AccountStyles>
    </>
  );
}

const AccountStyles = styled.div`
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

  .modal::-webkit-scrollbar {
    display: none;
  }

  .modal-content {
    background-color: #f4f4f4;
    margin: 20% auto;
    padding: 20px;
    width: 90%;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    animation-name: modalopen;
    animation-duration: 0.2s;
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
    width: 100%;
    height: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }

  .container .user-details {
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    margin: auto;
    min-height: 300px;
    text-align: left;
  }

  .container .user-details p {
    font-size: 1rem;
    line-height: 1.5;
  }
  .container .user-details h2 {
    text-align: center;
    margin: 20px;
  }
  .container .user-details img:hover {
    transform: translateY(-5px);
  }
  .container .order-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    text-align: center;
    padding: 10px;
  }
  .container .order-details ul {
    list-style-type: none;
  }
  .container .order-details ul li {
    padding: 20px auto;
  }

  .container .order-details h3 {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    color: #a2a2a2;
    float: left;
  }
  .button {
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

  .order-list {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
  }

  .order-item {
    width: 50%;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #634f35;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    background: rgb(99, 79, 53, 0.3);
    border-radius: 5px;
    min-width: 300px;
  }

  .details-side {
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .details-side .status {
    background: ${({ isPaid }) =>
      isPaid === 'paid' ? 'green' : isPaid === 'unpaid' && 'red'};
    padding: 10px;
  }

  @media (max-width: 1080px) {
    .container {
      grid-template-columns: repeat(1, 2fr);
    }

    .container .user-details {
      padding: 40px;
      box-sizing: border-box;
      width: 100% !important;
      height: auto;
      text-align: center;
      overflow: hidden;
    }
    .container .user-details img {
      left: initial;
      max-width: 100%;
      transform: rotate(0deg);
    }
  }

  @media (max-width: 768px) {
    .modal-content {
      flex-wrap: wrap;
      padding: 20px;
      width: 90%;
    }

    .container {
      justify-content: center;
    }

    .container .user-details {
      padding: 0;
      width: 100% !important;
      margin: auto;
    }

    .container .user-details img {
      margin: auto;
      display: block;
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
