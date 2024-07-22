import { ProviderData } from "../types";
import React from "react";

type ListItemContextProps = ProviderData | undefined

export const useProviderSubBlockContext = () => {
  const providerData = React.useContext(ProviderSubBlockContext);

  if (providerData === undefined) {
    throw new Error();
  }
  return providerData;
}

export const ProviderSubBlockContext =
  React.createContext<ListItemContextProps>(undefined);

export const ListItemProvider = ({
    children,
    providerData,
  }: {
    children?: React.ReactNode;
    providerData: ProviderData;
  }): JSX.Element => {
  
    return (
      <ProviderSubBlockContext.Provider value={providerData}>
        {children}
      </ProviderSubBlockContext.Provider>
    );
  };