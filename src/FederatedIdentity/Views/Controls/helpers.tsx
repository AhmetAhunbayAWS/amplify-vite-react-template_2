import { handleSignInWithRedirect } from "../../context/HandleRedirectContext";
import { socialProvidersUnion } from "../../types";
import { BaseElement, ElementRefType }  from "../../../IdentityProviders/elements/types";
import React from "react";



export const handleClick = <T extends string = string>(provider: T, hsiwr: typeof handleSignInWithRedirect ) => {

    const _handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
  
      event.preventDefault();
  
      //checks whether provider is in FederatedIdentityProviders
      //TODO: sort out potentially tricky logic with having a custom provider that shares a name with existing provider?
      hsiwr({provider}) 
    };
    
    return _handleClick
  }

export function withBaseElementProps<
  T,
  K extends T | ((input: T) => T),
>(
  Target: React.ForwardRefExoticComponent<T>,
  defaultProps: K
): BaseElement<T, ElementRefType<T>> {
  const Component = React.forwardRef<ElementRefType<T>, T>((props, ref) => (
    <Target
      {...{
        ...(typeof defaultProps === 'function'
          ? defaultProps(props)
          : defaultProps),
        ...props,
      }}
      ref={ref}
    />
  ));
  Component.displayName = Target.displayName;
  return Component;
}

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

type AuthenticatorRoute = 'signIn' | 'signUp'

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const GetAuthenticatorText = (route: AuthenticatorRoute, provider: string) => {
    switch (route) {
        case "signIn":
            return `Sign in with ${capitalizeFirstLetter(provider)}`
        case "signUp":
            return `Sign up with ${capitalizeFirstLetter(provider)}`
    }
}
