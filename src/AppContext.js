import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [residentId, setResidentId] = useState(null);

  return (
    <AppContext.Provider value={{ residentId, setResidentId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
