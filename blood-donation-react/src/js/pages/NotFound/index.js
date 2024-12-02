import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common';

const NotFound = () => (
  <main className="grid min-h-screen px-6 py-16 bg-white place-items-center sm:py-24 lg:px-8">
    <div className="text-center">
      <p className="font-semibold text-primary-500">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="flex items-center justify-center mt-10 gap-x-6">
        <Button
          to={localStorage.getItem('auth') ? '/admin/dashboard' : '/'}
        >
          Go back home
        </Button>
        <Link to="/contact-us" className="text-sm font-semibold text-gray-900">
          Contact support <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  </main>
);

export default NotFound;
