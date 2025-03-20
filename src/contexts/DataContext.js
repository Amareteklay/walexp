import React, { createContext, useReducer, useContext } from 'react';

// Create the Data Context
const DataContext = createContext();

// Define a reducer function to manage state actions
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, [action.key]: action.value };
    case 'RESET_DATA':
      return {};
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create the Provider Component to wrap your entire app
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {});

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook for easy access to the Data Context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
