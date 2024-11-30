/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goToSlide = index => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setTransitioning(false);
      }, 500);
    }
  };

  const nextSlide = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex =>
          (prevIndex === images.length - 1 ? 0 : prevIndex + 1),
        );
        setTransitioning(false);
      }, 500);
    }
  };

  const prevSlide = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex =>
          (prevIndex === 0 ? images.length - 1 : prevIndex - 1),
        );
        setTransitioning(false);
      }, 500); // Delay to simulate transition time
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden md:h-full">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="object-cover w-full h-full"
        style={{
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
      <button
        className="absolute left-0 z-10 flex items-center justify-center w-12 h-12 text-white transform -translate-y-1/2 bg-opacity-50 inset-y-1/2 hover:scale-110"
        onClick={prevSlide}
      >
        <ChevronLeftIcon />
      </button>
      <button
        className="absolute right-0 z-10 flex items-center justify-center w-12 h-12 text-white transform -translate-y-1/2 bg-opacity-50 inset-y-1/2 hover:scale-110"
        onClick={nextSlide}
      >
        <ChevronRightIcon />
      </button>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
        {images.map((_, index) => (
          <button
            key={`Slide ${index + 1}`}
            className={`h-2 w-2 mx-2 rounded-full bg-white ${index === currentIndex ? 'opacity-75' : 'opacity-25'} focus:outline-none`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

Carousel.defaultProps = {
  images: [],
};
export default Carousel;
