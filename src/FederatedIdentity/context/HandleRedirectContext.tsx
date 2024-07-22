import React from "react";
import { socialProviderList } from "../types";
import { signInWithRedirect } from "aws-amplify/auth";
import { AuthProvider } from "../../scratchFiles/scratch";

export const HandleSignInWithRedirectContext =
  React.createContext<typeof handleSignInWithRedirect | undefined>(undefined);

//TODO: move handleSignInWithRedirect elsewhere
interface handleSignInWithRedirectInput<T extends string = string>{
    provider: T
    customState?: string
}

export function handleSignInWithRedirect(input: handleSignInWithRedirectInput): Promise<void>{
  const {provider} = input

  if (socialProviderList.indexOf(provider) > -1){
    return signInWithRedirect({provider: provider as AuthProvider})
  } else {
    return signInWithRedirect({provider: {
        custom: provider
    }})
  }  
}

export const HandleSignInWithRedirectProvider = ({
    children,
    customRedirect,
  }: {
    children?: React.ReactNode;
    customRedirect?: typeof handleSignInWithRedirect;
  }): JSX.Element => {
  
    return (
      <HandleSignInWithRedirectContext.Provider value={customRedirect}>
        {children}
      </HandleSignInWithRedirectContext.Provider>
    );
  };

export const useHandleSignInWithRedirectContext = (): typeof handleSignInWithRedirect => {
    const context = React.useContext(HandleSignInWithRedirectContext);

    if (!context) {
      return handleSignInWithRedirect;
    }

    const hsiwr = context;

    return hsiwr;
};