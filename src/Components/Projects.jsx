import React, { useEffect, useState, useRef } from 'react'
import { assets, projectsData } from '../assets/assets'
import { motion } from 'motion/react';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  // For drag/swipe tracking
  const sliderRef = useRef(null);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(Math.min(4, projectsData.length));
      } else {
        setCardsToShow(1);
      }
    };
    updateCardsToShow();

    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);


  // Set slider position based on currentIndex after snap
  useEffect(() => {
    prevTranslate.current = - (currentIndex * (100 / cardsToShow));
    currentTranslate.current = prevTranslate.current;
    setSliderPosition();
  }, [currentIndex, cardsToShow]);

  // Helper to set slider transform
  const setSliderPosition = () => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${currentTranslate.current}%)`;
    }
  };

  // Animation loop for smooth dragging
  const animation = () => {
    setSliderPosition();
    if (isDragging.current) {
      requestAnimationFrame(animation);
    }
  };

  // Start drag
  const touchStart = (index) => (event) => {
    isDragging.current = true;
    startX.current = getPositionX(event);
    animationRef.current = requestAnimationFrame(animation);
    sliderRef.current.style.transition = 'none';
  };

  // Drag move
  const touchMove = (event) => {
    if (!isDragging.current) return;
    const currentPosition = getPositionX(event);
    const diff = startX.current - currentPosition;
    // Calculate how much % to translate: convert pixel diff to %
    const slideWidthPx = sliderRef.current.offsetWidth / cardsToShow;
    const diffPercent = (diff / slideWidthPx) * (100 / cardsToShow);
    currentTranslate.current = prevTranslate.current - diffPercent;
  };

  // End drag
  const touchEnd = () => {
    isDragging.current = false;
    cancelAnimationFrame(animationRef.current);
    sliderRef.current.style.transition = 'transform 0.3s ease';

    // Calculate closest slide index after drag release
    let movedSlides = Math.round(-currentTranslate.current / (100 / cardsToShow));
    // Clamp between 0 and max index
    movedSlides = Math.min(Math.max(movedSlides, 0), projectsData.length - cardsToShow);
    setCurrentIndex(movedSlides);
  };

  // Utility to get X position from mouse or touch
  const getPositionX = (event) => {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
  };

  // Arrow button handlers
  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= projectsData.length - cardsToShow ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? projectsData.length - cardsToShow : prevIndex - 1
    );
  };

  return (
    <motion.div

      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}


      className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden'
      id='Projects'
    >
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
        Projects{' '}
        <span className='underline underline-offset-4 decoration-1 under font-light'>
          Completed
        </span>
      </h1>
      <p className='text-gray-500 max-w-80 text-center mb-8 mx-auto'>
        From blueprints to breathtaking homes — view our completed works.
      </p>

      {/* Slider buttons */}
      <div className='flex justify-end items-center mb-8'>
        <button
          onClick={prevProject}
          className='p-3 bg-gray-200 rounded mr-2 cursor-pointer'
          aria-label='Previous Project'
        >
          <img src={assets.left_arrow} alt='Previous' />
        </button>
        <button
          onClick={nextProject}
          className='p-3 bg-gray-200 rounded mr-2 cursor-pointer'
          aria-label='Next Project'
        >
          <img src={assets.right_arrow} alt='Next' />
        </button>
      </div>

      {/* Project slider container */}
      <div className='overflow-hidden'>
        <div
          ref={sliderRef}
          className='flex gap-8 cursor-grab select-none'
          style={{ transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)` }}
          onMouseDown={touchStart(currentIndex)}
          onMouseMove={touchMove}
          onMouseUp={touchEnd}
          onMouseLeave={() => isDragging.current && touchEnd()}
          onTouchStart={touchStart(currentIndex)}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
          onTouchCancel={touchEnd}
          onDragStart={(e) => e.preventDefault()}
        >
          {projectsData.map((project, index) => (
            <div
              key={index}
              className='relative flex-shrink-0 w-full sm:w-1/4'
              style={{ userSelect: 'none' }}
            >
              <img
                src={project.image}
                alt={project.title || 'Estate du Oud project'}
                className='w-full h-auto mb-14 rounded-lg transition-transform duration-300 hover:scale-105 pointer-events-none'
                draggable={false}
              />
              <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                <div className='inline-block bg-sky-50/80 w-4/5 px-4 py-2 shadow-md rounded-lg text-center'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    {project.title}
                  </h2>
                  <p className='text-gray-500 text-sm'>
                    {project.price}
                    <span> | </span>
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;

