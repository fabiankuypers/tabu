import React from 'react';
import Navigation from './Navigation';
import LadySelection from './LadySelection';

const LadiesPage: React.FC = () => {
  return (
    <>
      <Navigation currentPage="ladies" />
      <LadySelection />
    </>
  );
};

export default LadiesPage;