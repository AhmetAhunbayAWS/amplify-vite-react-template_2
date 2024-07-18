//import { SupportedProviders } from "../CustomProviderFiles/CustomProvider";
import { signInWithRedirect } from "aws-amplify/auth";
//import { IdentityProvidersProvider } from "./IdentityProvidersProvider";
import { IdentityProvidersIcon as FederatedIdentityIcon } from "./elements/IdentityProvidersIcon";
import { Amplify } from "aws-amplify";
import { FederatedIdentityElements } from "./baseElements";
import { ListControlElement } from "./elements/ListElement";
import { ButtonsControlSubBlock } from "./controls/ButtonsControl";

import React from "react";
import { socialProvidersUnion } from "./helpers";
import { createProvider } from "./IdentityProvidersProvider";

Amplify.getConfig().Auth

export interface ProviderData<T extends string = string> {
    displayName: string;
    icon: React.ReactNode;
    providerName: T;
}

export interface createFederatedIdentityProps<K extends string = string>{
  providers: ProviderType<K>[];
  handleSignInWithRedirect?: typeof signInWithRedirect;
  elements?: FederatedIdentityElements
  //children?: React.ReactNode
}

//SocialProvider is a union type for already supported providers 
export type ProviderType<K extends string = string> = ProviderData<K> | socialProvidersUnion;

// interface AdditionalButtonProps {
//   provider: string;
// }
// type Component<T = {}> = React.ComponentType<T>;
// type CustomButtonElementProps = ButtonElementProps & AdditionalButtonProps;
// type CustomButton = Component<CustomButtonElementProps>

// export interface IdentityProvidersElements 
//   extends Pick<ElementsBase, 'ButtonGroup' | 'Icon'>{
//     Button: CustomButton
//   }


interface FederatedIdentity<T extends Partial<FederatedIdentityElements> = FederatedIdentityElements> {
     (): React.JSX.Element;
     Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
     Buttons: typeof ButtonsControlSubBlock;
     List: T['List'];
}

// export const IdentityProviders = (
//   props: IdentityProvidersProps,
// ) => {
//   const { children } = props;
//   const ButtonGroup = IdentityProvidersButtonGroup;
//   return (
//     <IdentityProvidersProvider {...props}>
//       {children ?? <ButtonGroup/>}
//     </IdentityProvidersProvider>
//   );
// };

export function createFederatedIdentity<
  T extends FederatedIdentityElements = FederatedIdentityElements, K extends string = string
>( input: {
    elements?: T;
    providers: ProviderType<K>[];
    handleSignInWithRedirect?: typeof signInWithRedirect;
  }) : {
    FederatedIdentity: FederatedIdentity
  } {

    const FederatedIdentityProps : createFederatedIdentityProps<K> = {
      ...input,
    };

    const Provider = createProvider({...FederatedIdentityProps})

    function FederatedIdentity(): React.JSX.Element {
      return (
        <Provider>
          <ListControlElement>
            <ButtonsControlSubBlock/>
          </ListControlElement>
        </Provider>
      );
    }

    FederatedIdentity.Provider = Provider;
    FederatedIdentity.Buttons = ButtonsControlSubBlock;
    FederatedIdentity.List = ListControlElement;

    // const useHandleSignInWithRedirect = () => {
    //   // Implement the custom hook logic here
    // };

  return { FederatedIdentity };
}

const { FederatedIdentity } = createFederatedIdentity({providers: []});


export const IdpsApp = () => (
  <div>
    <FederatedIdentity.Provider>
      <FederatedIdentity.List>
        <FederatedIdentity.Buttons.ListItem>

        </FederatedIdentity.Buttons.ListItem>
        <FederatedIdentity.Buttons.Button provider = {"amazon"}>
          <FederatedIdentityIcon/>
        </FederatedIdentity.Buttons.Button>
      </FederatedIdentity.List>
    </FederatedIdentity.Provider>
  </div>
)
