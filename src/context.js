import {createContext} from 'react';

const contextObj = {
  name: 'contextObj',
  arr: [1, 2],
  child: {
    name: 'child',
  },
};
export const MyContext = createContext(contextObj);
