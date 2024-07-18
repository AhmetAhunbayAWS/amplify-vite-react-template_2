import { FacebookIcon, GoogleIcon, AmazonIcon, AppleIcon } from "./elements/SupportedIcons";
import { ProviderType, ProviderData } from "./FederatedIdentity";



export type socialProvidersUnion = 'amazon' | 'apple' | 'facebook' | 'google'

export const socialProviders = [
  'amazon',
  'facebook',
  'apple',
  'google'
]

export function supportedProviderName(provider : socialProvidersUnion) : string {
    if (provider === 'facebook') {
        return 'Facebook';
    } else if (provider === 'google') {
        return 'Google';
    } else if (provider === 'amazon') {
        return 'Amazon';
    } else if (provider === 'apple') {
        return 'Apple';
    }
    return ""
}

function getSupportedProviderData(providerName: socialProvidersUnion) : ProviderData {
    return {
        displayName: supportedProviderName(providerName),
        icon: supportedIcon(providerName),
        providerName: supportedProviderName(providerName)
    }
}

export function toProviderData(providers: ProviderType[]): ProviderData[] {
    return providers.map((provider) => {
        if (socialProviders.includes(provider as string) ) {
            return getSupportedProviderData(provider as socialProvidersUnion)
        } else {
            return provider as ProviderData;
        }
    });
}

function supportedIcon(provider: socialProvidersUnion) : React.ReactNode {
    let iconComponent;
          if (provider === 'facebook') {
              iconComponent = <FacebookIcon />;
          } else if (provider === 'google') {
              iconComponent = <GoogleIcon />;
          } else if (provider === 'amazon') {
              iconComponent = <AmazonIcon />;
          } else if (provider === 'apple') {
              iconComponent = <AppleIcon />;
          }
    return iconComponent;
}