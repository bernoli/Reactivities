import React from "react";
import { ICar } from "./carsTypes";
import CarItem from "./carItem";

export interface IShop {
  name: string;
  cars: ICar[];
}

const Shop: React.FC<IShop> = ({ cars, name }) => {
  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {cars.map(car => (
          <CarItem car={car} key={car.name}></CarItem>
        ))}
      </ul>
      
    </div>
  );
};

export default Shop;
