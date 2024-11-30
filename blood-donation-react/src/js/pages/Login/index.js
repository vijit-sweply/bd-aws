import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, InputField, Notification } from '../../components/common';
import { loginAction } from '../../actions/auth';

const Login = () => {
  const isAuthenticated = !!localStorage.getItem('auth');
  const navigate = useNavigate();
  const [state, setState] = useReducer((data, newData) => ({ ...data, ...newData }), {
    email: '',
    password: '',
  });

  const [notification, setNotification] = useState({ type: '', message: '' });

  const [error, setError] = useReducer((data, newData) => ({ ...data, ...newData }), {
    email: null,
    password: null,
  });

  const onChangeValue = e => {
    setError({
      email: null,
      password: null,
    });
    setState({ [e.target.id]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();

    if (!state.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)) {
      setError({
        email: state.email ? 'Enter a valid email address.' : 'You must enter your email address.',
      });
      return;
    }

    const jsonData = {
      username: state.email,
      password: state.password,
    };

    try {
      const response = await loginAction(jsonData);
      localStorage.setItem('auth', response.token);
      navigate('/admin/dashboard');
    } catch (err) {
      // Check if the error has a response property and a status code
      if (err.status === 401) {
        setNotification({
          type: 'warning',
          message: 'Email address or password incorrect.',
        });
      }
      if (err.status === 500) {
        setNotification({
          type: 'warning',
          message: 'Something went wrong! Please try agian later.',
        });
      }
    }
  };

  const removeNotification = () => {
    setNotification({ type: '', message: '' });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  if (isAuthenticated) {
    return null;
  }
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-6 bg-ivory-300">
      <Helmet title="Login | Gold Coin Seva Trust" />
      {notification.message ? (
        <Notification {...notification} removeNotification={removeNotification} />
      ) : null}
      <div className="w-full my-8 rounded-lg shadow-lg bg-gray-50 md:mt-0 sm:max-w-lg xl:p-0">
        <div className="h-full p-6 space-y-4 md:space-y-6 sm:p-8">
          <h3 className="text-center">Log In</h3>
          <form onSubmit={handleLogin} className="flex flex-col h-full">
            <InputField
              label="Your Email"
              type="text"
              name="email"
              value={state.email}
              placeholder="name@company.com"
              onChange={onChangeValue}
              id="email"
              errorMessage={error.email}
            />
            <InputField
              label="Password"
              type="password"
              value={state.password}
              placeholder="Enter your password"
              onChange={onChangeValue}
              id="password"
              errorMessage={error.password}
            />
            <Button
              fullWidth
              type="submit"
              variant="filled"
              color="secondary"
              classes="py-5 mb-5 !rounded-t-none"
            >
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
