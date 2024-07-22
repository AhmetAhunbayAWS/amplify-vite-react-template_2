import { FederatedIdentityElements } from "../baseElements";
import { ProviderData } from "../FederatedIdentity";
import { ButtonElement } from "../baseElements";
import React from "react";
import { socialProviders, socialProvidersUnion } from "../helpers";
import { useProviderData } from "../IdentityProvidersProvider";
import {FederatedIdentityProviders} from '@aws-amplify/ui';
import { useSignInWithRedirectHandler } from "../IdentityProvidersProvider";
import { supportedProviderName } from "../helpers";
import { IdentityProvidersIcon } from "../elements/IdentityProvidersIcon";
import { signInWithRedirect } from "aws-amplify/auth";
import { Text } from "@aws-amplify/ui-react";
import { GetAuthenticatorText } from "../../helpers/GetSignInText";
import { ButtonContext } from "../elements/FederatedIdentityButton";
import { createContext } from "react";
import { ListItemControlElement } from "../elements/ListItemElement";
import { ButtonBaseElement } from "../baseElements";

interface renderListItem{(data: ProviderData) : React.JSX.Element}

export const renderListItemContext = createContext<renderListItem | undefined>(undefined)

interface ButtonsControlSubBlock<T extends Partial<FederatedIdentityElements> = FederatedIdentityElements>{
  (props: {
       renderListItem?: renderListItem;
   }): JSX.Element;
   ListItem: T['ListItem'];
   ButtonSubBlock: ButtonSubBlock<T>;
   ProviderIcon: T['Icon']
}

interface ButtonSubBlock<T extends Partial<FederatedIdentityElements>, K extends string = string> extends ButtonBaseElement<T> {
  (props: {
    provider: K;
  }): JSX.Element;
  ProviderIcon: T['Icon']
}

// { children || 
//     <Flex
//     direction="column"
//     padding={`0 0 1rem 0`}
//     className="federated-sign-in-container"
//     >
//     {providers.map((provider) => (
//         <FederatedIdentityButton key = {provider.providerName} provider={provider.providerName}/>
//     ))}
//     <Divider size="small" label={getOrText()} />
//     </Flex>
// }

//sub command block

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