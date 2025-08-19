import React from 'react';
import Navigation from './Navigation';
import RoomSelection from './RoomSelection';

const RoomsPage: React.FC = () => {
  return (
    <div className="pb-20">
      <Navigation currentPage="rooms" />
      <RoomSelection />
    </div>
  );
};

export default RoomsPage;