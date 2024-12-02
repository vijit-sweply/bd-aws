import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-no-repeat bg-cover bg-hero-image lg:h-[41rem]">
      <div className="flex items-center h-full bg-white md:justify-end bg-opacity-60 lg:bg-opacity-10">
        <div className="relative p-6 isolate lg:px-8">
          <div className="max-w-3xl ml-auto">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative px-3 py-1 text-sm leading-6 text-gray-600 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Join Us in Making a Difference.{' '}
                <a href="#?">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1>
                Save Lives, Donate Blood Today
              </h1>
              <p className="font-semibold lg:font-light">
                Join our community of donors and volunteers as we work together
                to ensure that no one faces a blood shortage in their time of need.
                Together, we can make the world a healthier and safer place for all.
              </p>
              <div className="flex flex-col-reverse items-center justify-center gap-4 mt-4 md:mt-10 md:flex-row">
                <Button onClick={() => navigate('/donor-registration')} endIcon={<ArrowUpIcon className="w-5 h-5" />}>
                  Register as Donor
                </Button>
                <Button onClick={() => navigate('/request-blood')} startIcon={<ArrowDownIcon className="w-5 h-5" />}>
                  Request Blood
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
