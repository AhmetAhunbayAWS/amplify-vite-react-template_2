import React from "react";
import {FederatedIdentityProviders} from '@aws-amplify/ui';
import { signInWithRedirect } from "aws-amplify/auth";
import { Text } from "@aws-amplify/ui-react";
import { createContext } from "react";
import { FederatedIdentityElements, ListItemElement, ButtonElement, IconElement } from "../../context/elements/definitions";

interface renderListItem{(data: ProviderData) : React.JSX.Element}

export const renderListItemContext = createContext<renderListItem | undefined>(undefined)

const ListItemControlElement : typeof ListItemElement = React.forwardRef(
    function ListItemControlElement({
        children,
        ...props
    }, ref) {
        return (
            <ListItemElement ref={ref} {...props} >
                {children}
            </ListItemElement>
        )
    }
)

export const IdentityProvidersIcon : typeof IconElement = React.forwardRef(

    function IdentityProvidersIcon(
        {...props},
        ref
    ) {
        const providerData = useButtonContext()
        const Icon = providerData?.icon
        const hasProps = Object.keys(props).length > 0;

        if (!hasProps && React.isValidElement(Icon)){
                return <IconElement {...Icon.props} ref={ref}/>;
        }

        return <IconElement {...props} ref={ref}/>;
    }  
)

interface ButtonsControlSubBlock<
  T extends FederatedIdentityElements = FederatedIdentityElements,
  // Button, Icon are ControlElemnts
> extends Pick<T, 'ListItem' | 'Button' | 'Icon'> {
  (props: {
    renderListItem?: renderListItem;
  }): JSX.Element;
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

export const ButtonsControlSubBlock : ButtonsControlSubBlock = (props) => {
    const providers = useProviderData()
    //get provider data and pass into renderListItem
    //ref is being created and passed in here

    const {renderListItem} = props

  return (
    <renderListItemContext.Provider value = {renderListItem}>
        {providers.map((provider) => (
            <ButtonControlElement key = {provider.providerName} provider={provider.providerName}/>
        ))}
    </renderListItemContext.Provider>
  );
}

export const ButtonControlElement: ButtonBaseElement = React.forwardRef(
    function ButtonControlElement({ ...props }, ref) {
        // button handler logic here, e.g. onClick

        let {provider} = props
        const {children} = props

        if (provider === undefined){
            throw new Error();
        }

        const handleSignInWithRedirect = useSignInWithRedirectHandler()

        const onClick = handleClick(provider, handleSignInWithRedirect)

        if (socialProviders.indexOf(provider) > -1){
            provider = supportedProviderName(provider as socialProvidersUnion)
        }
        
        const providers = useProviderData();
        const value = providers.find(({ providerName }) => providerName === provider);

        if (!value) {
            throw new Error();
        }

        return (
            <ListItemControlElement>
                <ButtonContext.Provider value = {value}>
                    <ButtonElement onClick={onClick} {...props} ref={ref} >
                        {children ?? <IdentityProvidersIcon/>}
                        <Text as="span">{GetAuthenticatorText('signIn', value.displayName)}</Text>
                    </ButtonElement>
                </ButtonContext.Provider>
            </ListItemControlElement>
        );
    }
  );


ButtonsControlSubBlock.ListItem = ListItemControlElement
ButtonsControlSubBlock.Button = ButtonControlElement
ButtonsControlSubBlock.Icon = IdentityProvidersIcon