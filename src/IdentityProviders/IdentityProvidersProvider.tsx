import React from "react"
import { toProviderData } from "./helpers";
import { ProviderData, FederatedIdentityProps } from "./FederatedIdentity";
import { signInWithRedirect } from "aws-amplify/auth";
//import { IdentityProvidersElements } from "./IdentityProviders";
import { ElementsProvider } from "./elements/ElementsContext";

export interface IdentityProvidersConfig {
    providers: ProviderData[]
    handleSignInWithRedirect: typeof signInWithRedirect
    //elements: IdentityProvidersElements
}

export const useProviderData = (): ProviderData[] => {
    const context = React.useContext(IdentityProvidersContext);
  
    if (!context) {
      throw new Error('');
    }

    const { providers } = context
  
    return providers;
};

export const useSignInWithRedirectHandler = (): typeof signInWithRedirect => {
    const context = React.useContext(IdentityProvidersContext);

    if (!context) {
        throw new Error('');
    }

    const { handleSignInWithRedirect } = context;

    return handleSignInWithRedirect;
};

//create new providerdata object for each supported provider
export function createProvider ( props: FederatedIdentityProps,){ 
      const {providers, handleSignInWithRedirect} = props

      const identityProvidersContextValue : IdentityProvidersConfig = {
          providers: toProviderData(providers),
          handleSignInWithRedirect: handleSignInWithRedirect ?? signInWithRedirect,
      }  
      return function Provider({
        children,
      }: {
        children?: React.ReactNode;
      }): React.JSX.Element {
        return <ElementsProvider elements= {props.elements}>
                    <IdentityProvidersContext.Provider value={identityProvidersContextValue}>
                        {children}
                    </IdentityProvidersContext.Provider>
                </ElementsProvider>
        };   
}

export const IdentityProvidersContext = React.createContext<IdentityProvidersConfig | undefined>(undefined)