import React from "react";
import { ICar } from "./carsTypes";
import CarItem from "./carItem";
import {List} from "semantic-ui-react";

export interface IShop {
  name: string;
  cars: ICar[];
}

const Shop: React.FC<IShop> = ({ cars, name }) => {
  return (
    <div>
      <h1>{name}</h1>
      <List>
        {cars.map(car => (
           <List.Item>
               <CarItem car={car} key={car.name}></CarItem>
               </List.Item>
        ))}
    </List>      
    </div>
  );
};

export default Shop;
