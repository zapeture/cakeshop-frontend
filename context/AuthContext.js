import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import { MAGIC_PUBLIC_KEY } from '../utils/urls';

const AuthContext = createContext();
let magic;
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const router = useRouter();

  /**
   * Retrieve Magic Issued Bearer Token
   * This allows User to make authenticated requests
   */
  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (err) {
      // console.log(err);
    }
  };

  /**
   * Log the user in
   * @param {string} email
   */

  const loginUser = async (email) => {
    setUserLoading(true);
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser({ email });
      setUserLoading(false);
      router.push('/');

      // just for testing
      const token = await getToken();
      console.log('User token is', token);
    } catch (error) {
      setUser(null);
      setUserLoading(false);
    }
  };

  /**
   * If user is logged in, get data and display it
   */
  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });
        //Add this just for test
        const token = await getToken();
        // console.log('checkUserLoggedIn token', token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Log the user out
   */
  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push('/');
    } catch (error) {}
  };

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY);
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logoutUser, getToken, userLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
