import React, { useState, useContext, createContext, useEffect } from 'react';
import { refreshTokenUrl, loginUrl, logoutUrl, checkAuthUrl } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLogin: false,
    user: {},
    accessToken: '',
  });
  const router = useRouter();
  const init = (axios) => {
    // Instantiate the interceptor
    createAuthRefreshInterceptor(axios, refreshAuthLogic, {
      statusCodes: [401, 403],
    });
  };
  const refreshAuthLogic = (failedRequest) => {
    console.log('refreshAuthLogic work');
    return axios
      .get(refreshTokenUrl, { withCredentials: true, skipAuthRefresh: true })
      .then((tokenRefreshResponse) => {
        console.log('tokenRefreshResponse:', tokenRefreshResponse);
        failedRequest.response.config.headers[
          'Authorization'
        ] = `Bearer ${tokenRefreshResponse.data.accessToken}`;
        console.log(tokenRefreshResponse.data.user, 'L31');
        setAuth({
          isLogin: true,
          user: tokenRefreshResponse.data.user,
          accessToken: tokenRefreshResponse.data.accessToken,
        });
        return Promise.resolve();
      })
      .catch((e) => Promise.resolve());
  };

  const logout = async () => {
    setAuth({
      isLogin: false,
      user: {},
      accessToken: '',
    });
    try {
      const res = await axios.get(logoutUrl, {
        withCredentials: true,
      });
      toast.success('登出成功');
      return res.data.message;
    } catch (err) {
      return err.response.data.message;
    }
  };
  const login = async (values) => {
    try {
      const res = await axios.post(loginUrl, JSON.stringify(values), {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('登入成功');
      setAuth({
        isLogin: true,
        user: res.data.user,
        accessToken: res.data.accessToken,
      });
      return res.data.message;
    } catch (err) {
      console.log(err);
      return err.response.status;
    }
  };
  const googleLogin = async (providerData) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/auth/google-login`,
      { ...providerData }
    );
    console.log(res);

    if (res.data.message === '登入成功') {
      setAuth({
        isLogin: true,
        user: res.data.user,
        accessToken: res.data.accessToken,
      });
      toast.success('登入成功,即將跳轉至首頁');
    }
    if (res.data.message === '註冊成功') {
      toast.success('註冊成功,請登入');
    } else {
      return;
    }
  };

  const checkAuth = async () => {
    try {
      const data = await axios.get(checkAuthUrl, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      });
    } catch (err) {}
  };

  init(axios);

  useEffect(() => {
    if (auth?.accessToken)
      //TODO remove console
      console.log(`set  axios.defaults.headers.common['Authorization']`);
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${auth.accessToken}`;
  }, [auth]);
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logout, login, googleLogin, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
