export interface ICar{
    color: string;
    name: string;
};

const Car1:ICar = {
    color:"Red",
    name:"BMW"
};

const Car2:ICar = {
    color:"Silver",
    name:"Honda"
}

export const cars = [Car1, Car2];