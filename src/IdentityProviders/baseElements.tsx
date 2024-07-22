import defineBaseElement from "./elements/defineBaseElements";
import { BaseElement } from "./elements/types";
import { ElementRefType } from "./elements/types";
import React from "react";
 
 interface FederatedIdentityElements<T extends string = string> {
    Button: ButtonBaseElement<T>;
    List: typeof ListElement;
    ListItem: typeof ListItemElement;
    Icon: typeof IconElement;
}

type ButtonElementProps = 'onClick' | 'type';
 const ButtonElement = defineBaseElement<'button', ButtonElementProps>({
  type: 'button',
  displayName: 'Button',
});

type ExtendElement<
  T extends React.ComponentType,
  K = never,
  U extends React.ComponentProps<T> = React.ComponentProps<T>,
> = BaseElement<U & K, ElementRefType<T>>;

 type ButtonBaseElement<T extends string = string> = ExtendElement<
  typeof ButtonElement,
  { provider?: T }
>;

export const ListElement = defineBaseElement({
    type: 'ul',
    displayName: 'UnorderedList',
});

export const ListItemElement = defineBaseElement({
    type: 'li',
    displayName: 'ListItem',
});  

export const IconElement = defineBaseElement<'svg', never>({
    type: 'svg',
    displayName: 'Icon',
});
