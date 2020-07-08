import React from 'react';
import { useSelector } from 'react-redux';
import LongLatTest from '../experimental/LongLatTest';
import NewerMapContainer from '../experimental/NewerMapContainer';
import Suspend from '../common/Suspend';
import MapPlaceholder from '../common/experimental/MapPlaceholder/MapPlaceholder';
// import DisplayUser from './DisplayUser';

const UserSection = () => {
  const map = useSelector((state) => state.map);
  const loading = map.isLoading;

  return (
    <div className="mapcontainer">
      <LongLatTest />
      <Suspend
        placeholder={MapPlaceholder}
        initialDelay={1000}
        condition={loading}
      >
        <NewerMapContainer />
      </Suspend>
    </div>
  );
};

export default UserSection;
