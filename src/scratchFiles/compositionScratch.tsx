import React from 'react';
import { SocialProvider } from '@aws-amplify/ui';
// import {
//   defineBaseElement,
//   ElementsProvider,
//   BaseElement,
//   ElementRefType,
// } from '@aws-amplify/ui-react-core/elements';
import { BaseElement } from './IdentityProviders/elements/types';
import { ElementsProvider } from './IdentityProviders/elements/ElementsContext';
import defineBaseElement from './IdentityProviders/elements/defineBaseElements';
import { ElementRefType } from './IdentityProviders/elements/types';

type ButtonElementProps = 'onClick' | 'type';
export const ButtonElement = defineBaseElement<'button', ButtonElementProps>({
  type: 'button',
  displayName: 'Button',
});

export const ListElement = defineBaseElement({
  type: 'ul',
  displayName: 'UnorderedList',
});

export const ListItemElement = defineBaseElement({
  type: 'li',
  displayName: 'ListItem',
});

export const IconElement = defineBaseElement<'svg'>({
  type: 'svg',
  displayName: 'Icon',
});

export interface FederatedIdentityElements<T extends string = string> {
  Button: ButtonControlElement<T>;
  List: typeof ListElement;
  ListItem: typeof ListItemElement;
  Icon: typeof IconElement;
}

interface ProviderData<T extends string = string> {
  /**
   * Display name for provider button
   */
  displayName: string;
  /**
   * Icon to display for provider button
   */
  icon?: React.ReactNode;
  /**
   * lookup key to map to configuration provider
   */
  providerName: T;
}

interface ButtonsControl<
  T extends FederatedIdentityElements = FederatedIdentityElements,
  // Button, Icon are ControlElemnts
> extends Pick<T, 'ListItem' | 'Button' | 'Icon'> {
  (props: {
    renderListItem?: (data: ProviderData) => React.JSX.Element;
  }): JSX.Element;
}

type ExtendElement<
  T extends React.ComponentType,
  K = never,
  U extends React.ComponentProps<T> = React.ComponentProps<T>,
> = BaseElement<U & K, ElementRefType<T>>;

type ButtonControlElement<T extends string = string> = ExtendElement<
  typeof ButtonElement,
  { provider?: T }
>;

const ButtonControlElement: ButtonControlElement = React.forwardRef(
  function ButtonControlElement({ ...props }, ref) {
    // button handler logic here, e.g. onClick
    return (
      <ListItemElement>
        <ButtonElement {...props} ref={ref} />;
      </ListItemElement>
    );
  }
);

const FederatedIdentityElements: FederatedIdentityElements = {
  Button: ButtonControlElement,
  List: ListElement,
  ListItem: ListItemElement,
  Icon: IconElement,
};

const ButtonsControl: ButtonsControl = (_props) => <>HI</>;
ButtonsControl.Icon = IconElement;
ButtonsControl.Button = ButtonControlElement;
ButtonsControl.ListItem = ListItemElement;

interface FederatedIdentity<
  T extends FederatedIdentityElements = FederatedIdentityElements,
> extends Pick<T, 'List'> {
  (): JSX.Element;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
  // ControlBlock
  Buttons: ButtonsControl<T>;
}

const FederatedIdentity = null as unknown as FederatedIdentity;

//SocialProvider is a union type for already supported providers
type ProviderType<K extends string = string> = ProviderData<K> | SocialProvider;

function createProvider<T extends FederatedIdentityElements>({
  elements,
}: {
  elements?: T;
}) {
  function Provider({ children }: { children?: React.ReactNode }) {
    return <ElementsProvider elements={elements}>{children}</ElementsProvider>;
  }

  return Provider;
}

export function createFederatedIdentity<
  T extends FederatedIdentityElements = FederatedIdentityElements,
  K extends string = string,
>({
  elements,
}: {
  elements?: T;
  providers?: ProviderType<K>[];
  // handleSignInWithRedirect?: typeof signInWithRedirect;
}): {
  FederatedIdentity: FederatedIdentity;
  // useHandleSignInWithRedirect: UseActionState<[not sure yet]>
} {
  const Provider = createProvider({ elements });
  const FederatedIdentity: FederatedIdentity = (): React.JSX.Element => {
    return (
      <Provider>
        <ListElement>{/* <Buttons /> */}</ListElement>
      </Provider>
    );
  };

  FederatedIdentity.Provider = ElementsProvider;
  FederatedIdentity.Buttons = ButtonsControl;
  FederatedIdentity.List = ListElement;

  return { FederatedIdentity };
}