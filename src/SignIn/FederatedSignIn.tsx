import {
  authenticatorTextUtil,
  FederatedIdentityProviders,
} from '@aws-amplify/ui';

import { Divider, Flex } from '@aws-amplify/ui-react';
import { FederatedSignInButton } from './FederatedSignInButton';
import NewHandleClick from './NewHandleClick';
import { useContext } from 'react';
import { CustomProviderContext } from '../CustomProviderFiles/CustomProviderContext'
import { GetAuthenticatorText } from '../helpers/GetSignInText';
import { SupportedProviders } from '../CustomProviderFiles/CustomProvider';
import { ProviderData } from '../IdentityProviders/FederatedIdentity';

const { getOrText } = authenticatorTextUtil;

type FederatedSignInProps = {
  socialProviders: SupportedProviders[];
};

export function FederatedSignIn(props: FederatedSignInProps): JSX.Element {
  const route = 'signIn'

  const socialProviders = props.socialProviders

  const customProviders = useContext(CustomProviderContext);
  console.log(customProviders)

  if (socialProviders.length === 0) {
    // @ts-ignore
    return null;
  }


  return (
    <Flex
      direction="column"
      padding={`0 0 1rem 0`}
      className="federated-sign-in-container"
      paddingLeft={30}
      paddingRight={30}
    >
      {socialProviders.map((provider) => {
        switch (provider) {
          case 'amazon':
            return (
              <FederatedSignInButton
                icon="amazon"
                key={provider}
                provider={FederatedIdentityProviders.Amazon}
                text={GetAuthenticatorText(route, provider)}
                clickHandler={NewHandleClick}
              />
            );
          case 'apple':
            return (
              <FederatedSignInButton
                icon="apple"
                key={provider}
                provider={FederatedIdentityProviders.Apple}
                text={GetAuthenticatorText(route, provider)}
                clickHandler={NewHandleClick}
              />
            );
          case 'facebook':
            return (
              <FederatedSignInButton
                icon="facebook"
                key={provider}
                provider={FederatedIdentityProviders.Facebook}
                text={GetAuthenticatorText(route, provider)}
                clickHandler={NewHandleClick}
              />
            );
          case 'google':
            return (
              <FederatedSignInButton
                icon="google"
                key={provider}
                provider={FederatedIdentityProviders.Google}
                text={GetAuthenticatorText(route, provider)}
                clickHandler={NewHandleClick}
              />
            );
          default:
            // eslint-disable-next-line no-console
            console.error(
              `Authenticator does not support ${provider}. Please open an issue: https://github.com/aws-amplify/amplify-ui/issues/choose`
            );
        }
      }).concat(
        customProviders.map((provider) => {
          const providerData = provider as ProviderData
          return (
            <FederatedSignInButton
              icon={providerData.icon}
              key={providerData.providerName}
              provider={providerData.providerName}
              text={GetAuthenticatorText(route, providerData.displayName ?? providerData.providerName)}
              clickHandler={NewHandleClick}
            />
          );
        })
      )}

      <Divider size="small" label={getOrText()} />
    </Flex>
  );
}
