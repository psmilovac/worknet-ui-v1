import { useState, useEffect, createContext } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [showSingleLineContext, setShowSingleLineContext] = useState(true);
  const [showFrontViewContext, setShowFrontViewContext] = useState(true);
  const [showPriceContext, setShowPriceContext] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        showSingleLineContext,
        showFrontViewContext,
        showPriceContext,
        setShowSingleLineContext,
        setShowFrontViewContext,
        setShowPriceContext,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext