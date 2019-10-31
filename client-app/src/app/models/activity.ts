// why not using class? 
// 1 - interface does not transpile into javascript, while class does.
// 2 - In this case, we only want to use it for type checking.
export interface IActivity { 
    title:string,
    city:string,
    date:Date,
    description:string,
    venue:string,
    category:string,
    id:string,
  };
