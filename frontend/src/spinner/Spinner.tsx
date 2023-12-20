import React from 'react';
import { PacmanLoader } from 'react-spinners';

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <div className="spinner-container">
      <PacmanLoader color="#36D7B7" loading={loading} size={25} />
    </div>
  );
};

export default Spinner;
