import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { useProviderData, useSignInWithRedirectHandler } from '../IdentityProvidersProvider';
import { Text } from '@aws-amplify/ui-react';

import React, { createContext } from 'react';
import { IdentityProvidersIcon } from './IdentityProvidersIcon';
import { ProviderData } from '../FederatedIdentity';
import { GetAuthenticatorText } from '../../helpers/GetSignInText';
import { signInWithRedirect } from 'aws-amplify/auth';
import { socialProviders, socialProvidersUnion } from '../helpers';
import { supportedProviderName } from '../helpers';

export const ButtonContext = createContext<ProviderData | undefined>(undefined)

export const useButtonContext = () => {
  const providerData = React.useContext(ButtonContext);

  if (providerData === undefined) {
    throw new Error();
  }
  return providerData;
}

const handleClick = (provider: FederatedIdentityProviders | string, handleSignInWithRedirect: typeof signInWithRedirect) => {

  const _handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {

    event.preventDefault();

    //checks whether provider is in FederatedIdentityProviders
    //TODO: sort out potentially tricky logic with having a custom provider that shares a name with existing provider?
    if (Object.values(FederatedIdentityProviders).includes(provider as FederatedIdentityProviders)){
      handleSignInWithRedirect({provider: provider as FederatedIdentityProviders})
    } else {
      handleSignInWithRedirect({provider: {
          custom: provider
      }})
    }  
  };
  
  return _handleClick
}

export function FederatedIdentityButton<T extends string = string>({
    children,
    provider
  } : {
    children?: React.ReactNode,
    provider: T
  }) : JSX.Element {

    if (socialProviders.indexOf(provider) > -1){
      provider = supportedProviderName(provider as socialProvidersUnion)
    }

    const providers = useProviderData();
    const value = providers.find(({ providerName }) => providerName === provider);

    if (!value) {
      throw new Error();
    }

    const handleSignInWithRedirect = useSignInWithRedirectHandler()

    return (
      <ButtonContext.Provider value = {value}>
          <button
            onClick={handleClick(provider, handleSignInWithRedirect)}
          >
            {children ?? <IdentityProvidersIcon/>}
            <Text as="span">{GetAuthenticatorText('signIn', value.displayName)}</Text>
          </button>
      </ButtonContext.Provider>
    );
}
