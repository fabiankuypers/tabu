import React from 'react';
import Navigation from './Navigation';
import LadySelection from './LadySelection';

const LadiesPage: React.FC = () => {
  return (
    <div className="pb-20">
      <Navigation currentPage="ladies" />
      <LadySelection />
    </div>
  );
};

export default LadiesPage;