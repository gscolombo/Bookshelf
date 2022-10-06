/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import LoginForm from './LoginForm.js';
import SubscriptionForm from './SubscriptionForm.js';
import LoadingModal from '../LoadingModal.js';
import ForgotPasswordForm from './ForgotPasswordForm.js';
import '../../styles/Home/Home.css';

export default function Home({ setUserName, userName }) {
  const [form, setForm] = useState('login');
  const [timeoutStatus, setTimeoutStatus] = useState(false);
  const { loading, setLoading, post, response, setErrors, errors } = useFetch();

  useEffect(() => {
    setLoading(false);
  }, [response, setLoading]);

  useEffect(() => {
    const isAuthUser = response.status === 200 || response.status === 201;
    if (isAuthUser) setUserName(response.userName);
  }, [response, setUserName]);

  useEffect(() => {
    setErrors({});
  }, [form, setErrors]);

  function switchForm(type) {
    switch (type) {
      case 'login':
      default:
        return (
          <LoginForm
            setLoading={setLoading}
            setForm={setForm}
            post={post}
            response={response}
            setErrors={setErrors}
            errors={errors}
            userName={userName}
          />
        );
      case 'subscription':
        return (
          <SubscriptionForm
            setLoading={setLoading}
            setForm={setForm}
            post={post}
            response={response}
            setErrors={setErrors}
            errors={errors}
            userName={userName}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            setForm={setForm}
            setLoading={setLoading}
            post={post}
            response={response}
            setErrors={setErrors}
            errors={errors}
          />
        );
    }
  }

  return (
    <div className={`container ${userName && 'out'}`}>
      {loading && <LoadingModal message="Por favor, aguarde..." />}
      <h1 className="title">Bookshelf</h1>
      <div className="form-container">{switchForm(form)}</div>
      {userName && setTimeout(() => setTimeoutStatus(true), 500)}
      {timeoutStatus && <Navigate to={`${userName}/shelf`} />}
    </div>
  );
}
