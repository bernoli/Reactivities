import React from 'react';
import {ICar} from './carsTypes';

interface IProps {
    car: ICar
}

const CarItem: React.FC<IProps> = ({ car }) => {
    return (
      <div>
        <h4>
          {car.name} - {car.color}{" "}
        </h4>
      </div>
    );
  };
  
  export default CarItem;