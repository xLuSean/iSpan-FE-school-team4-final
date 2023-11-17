import { useState, useEffect } from 'react';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const useCurrentLocation = () => {
  const [location, setLocation] = useState();

  const onSuccess = (posi) => {
    console.log(posi);
    setLocation(posi);
  };

  const onError = (error) => {
    setLocation('Taipei');
  };

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  return [location, setLocation];
};

export default useCurrentLocation;
