import defineBaseElement from "../../../IdentityProviders/elements/defineBaseElements";

export interface FederatedIdentityElements {
    Button: typeof ButtonElement;
    List: typeof ListElement;
    ListItem: typeof ListItemElement;
    Icon: typeof IconElement;
}

type ButtonElementProps = 'onClick' | 'type';
const ButtonElement = defineBaseElement<'button', ButtonElementProps>({
  type: 'button',
  displayName: 'Button',
});

const ListElement = defineBaseElement({
    type: 'ul',
    displayName: 'UnorderedList',
});

const ListItemElement = defineBaseElement({
    type: 'li',
    displayName: 'ListItem',
});  


const IconElement = defineBaseElement<'svg', never>({
    type: 'svg',
    displayName: 'Icon',
});


export const FederatedIdentityElements: FederatedIdentityElements = {
  Button: ButtonElement,
  List: ListElement,
  ListItem: ListItemElement,
  Icon: IconElement,
}