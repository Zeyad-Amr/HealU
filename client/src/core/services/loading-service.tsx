import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface LoadingContextType {
  loading: boolean;
  setLoadingState: Dispatch<SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoadingState: () => {},
});

export const useLoading = (): LoadingContextType => useContext(LoadingContext);

export const LoadingProvider = ({ children } : any) => {
  const [loading, setLoading] = useState(false);

  const setLoadingState: LoadingContextType['setLoadingState'] = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};