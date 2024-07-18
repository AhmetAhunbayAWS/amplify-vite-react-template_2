import defineBaseElement from "./elements/defineBaseElements";
import { ExtendElement } from "./extendElement";

export interface FederatedIdentityElements<T extends string = string> {
    Button: ButtonBaseElement<T>;
    List: typeof ListElement;
    ListItem: typeof ListItemElement;
    Icon: typeof IconElement;
}

type ButtonElementProps = 'onClick' | 'type';
export const ButtonElement = defineBaseElement<'button', ButtonElementProps>({
  type: 'button',
  displayName: 'Button',
});

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
