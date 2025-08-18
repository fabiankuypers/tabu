import React from 'react';
import Navigation from './Navigation';
import RoomSelection from './RoomSelection';

const RoomsPage: React.FC = () => {
  return (
    <>
      <Navigation currentPage="rooms" />
      <RoomSelection />
    </>
  );
};

export default RoomsPage;