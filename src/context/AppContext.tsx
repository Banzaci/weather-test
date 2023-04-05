"use client"

import React, { createContext, ReactNode, useState } from 'react';

export const AppContext = createContext<{ isFahrenheit: boolean, onSetIsFahrenheit?: () => void }>({
  isFahrenheit: true,
});

export const useAppContext = () => React.useContext(AppContext);

export const AuthContextProvider = ({ children }: { children: ReactNode}) => {
  const [ isFahrenheit, setIsFahrenheit ] = useState<boolean>(true);
  const onSetIsFahrenheit = () => {
    setIsFahrenheit(!isFahrenheit);
  }
  return (
    <AppContext.Provider value={{ isFahrenheit, onSetIsFahrenheit }}>
      {children}
    </AppContext.Provider>
  );
};

