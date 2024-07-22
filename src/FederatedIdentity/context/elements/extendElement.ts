import { BaseElement } from "../../../IdentityProviders/elements/types";
import { ElementRefType } from "../../../IdentityProviders/elements/types";


export type ExtendElement<
  T extends React.ComponentType,
  K = never,
  U extends React.ComponentProps<T> = React.ComponentProps<T>,
> = BaseElement<U & K, ElementRefType<T>>;