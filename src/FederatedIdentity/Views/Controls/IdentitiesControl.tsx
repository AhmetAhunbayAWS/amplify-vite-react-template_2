import React from "react";
import { Text } from "@aws-amplify/ui-react";
import { FederatedIdentityElements,  } from "../../context/elements/definitions";
import { supportedProviderName, GetAuthenticatorText, handleClick } from "./helpers";
import { useProviderData } from "../../context/ProviderDataContext";
import {  useHandleSignInWithRedirectContext } from "../../context/HandleRedirectContext";
import { ProviderData, socialProviderList, socialProvidersUnion } from "../../types";
import { ProviderSubBlockContext, useProviderSubBlockContext } from "../../context/ListItemContext";
import {withBaseElementProps} from "./helpers";

const {Button, Icon, ListItem} = FederatedIdentityElements

interface renderListItem{(data: ProviderData) : React.JSX.Element}

export interface ProviderSubBlock<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
  K extends string = string
> {
  (props: {
    provider?: K;
    children?: React.ReactNode;
  }): JSX.Element;
  ListItem: T['ListItem'];
  Button: T['Button'];
  Icon: T['Icon'];
}

export const ProviderSubBlock : ProviderSubBlock = (props) => {
    let { provider} = props
    const {children} = props

    if (provider === undefined){
        throw new Error();
    }

    if (socialProviderList.indexOf(provider) > -1){
        provider = supportedProviderName(provider as socialProvidersUnion)
    }
    
    const providers = useProviderData();
    const value = providers.find(({ providerName }) => providerName === provider);

    if (!value) {
        throw new Error();
    }

    return (
        <ProviderSubBlockContext.Provider value={value}>
                {children ?? 
                    <ListItem>
                        <ButtonControlElement>
                            <IconControlElement/>
                        </ButtonControlElement>
                    </ListItem>
                }         
        </ProviderSubBlockContext.Provider>
    )
}

export const ListItemControlElement : typeof ListItem = React.forwardRef(
    function ListItemControlElement({
        children,
        ...props
    }, ref) {
        return (
            <ListItem ref={ref} {...props} >
                {children}
            </ListItem>
        )
    }
)

const IdentityIcon = withBaseElementProps(Icon, {
    className: `"amplify-icon federated-sign-in-icon"`,
});

export const IconControlElement : typeof Icon = React.forwardRef(

    function IdentityProvidersIcon(
        {...props},
        ref
    ) {
        const providerData = useProviderSubBlockContext()
        const Icon = providerData?.icon
        const hasProps = Object.keys(props).length > 0;

        if (!hasProps && React.isValidElement(Icon)){
                return <IdentityIcon {...Icon.props} ref={ref}/>;
        }

        return <IdentityIcon {...props} ref={ref}/>;
    }  
)

export const ButtonControlElement: typeof Button = React.forwardRef(
    function ButtonElement({ children, ...props }, ref) {
        // button handler logic here, e.g. onClick

        const providerData = useProviderSubBlockContext()
        const {providerName, displayName} = providerData

        const handleSignInWithRedirect = useHandleSignInWithRedirectContext()

        const onClick = handleClick(providerName, handleSignInWithRedirect)

        return (
            <Button onClick={onClick} {...props} ref={ref} >
                {children ?? <IconControlElement/>}
                <Text as="span">{GetAuthenticatorText('signIn', displayName)}</Text>
            </Button>
        );
    }
);

ProviderSubBlock.Button = ButtonControlElement
ProviderSubBlock.Icon = IconControlElement
ProviderSubBlock.ListItem = ListItemControlElement  

export interface IdentitiesControl<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
  // Button, Icon are ControlElemnts
> {
  (props: {
    renderListItem?: renderListItem;
  }): JSX.Element;
  ProviderSubBlock: ProviderSubBlock<T>
}

export const IdentitiesControl : IdentitiesControl = (props) => {
    const providers = useProviderData()
    //get provider data and pass into renderListItem
    //ref is being created and passed in here

    const {renderListItem} = props

  return (
    <>
        {providers.map((provider) => (
            renderListItem ? renderListItem(provider) : <ProviderSubBlock key = {provider.providerName} provider={provider.providerName}/>
        ))}
    </>
  );
}

IdentitiesControl.ProviderSubBlock = ProviderSubBlock

