import { FederatedIdentityElements } from "./context/elements/definitions";
import { FederatedIdentityInput, createProviderProps } from "./types";
import { ActionState } from "../hooks/UseDataState";
import { Controls } from "./types";
import createProvider from "./createProvider";
import IdentityView from "./Views/IdentitiesView";
import { IdentitiesControl } from "./Views/Controls/IdentitiesControl"; 
import { ListControl } from "./Views/Controls/ListControl";

interface useHandleSigninWithRedirectInput<K extends string = string>{
    provider: K
    customState?: string
}

interface FederatedIdentity<T extends Partial<FederatedIdentityElements>> {
    (): JSX.Element;
    Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
    IdentityView: () => JSX.Element;
    Controls: Controls<T>
}

interface useHandleSignInWithRedirect<K extends string = string>{
(): [state: ActionState<void | undefined>, handleAction: (...input: useHandleSigninWithRedirectInput<K>[]) => void]
} 
export function createFederatedIdentity<T extends Partial<FederatedIdentityElements>, K extends string = string>(
    input: FederatedIdentityInput<T, K>
): {
    FederatedIdentity: FederatedIdentity<T>,
    useHandleSignInWithRedirect?: useHandleSignInWithRedirect<K>
} {
    const {elements} = input
    const _elements = {...elements, ...FederatedIdentityElements}
    const providerProps : createProviderProps = {
        elements: _elements,
        ...input,
    };
  
    const Provider = createProvider(providerProps)

    function FederatedIdentity(): JSX.Element {
        return (
            <Provider>
                <IdentityView/>
            </Provider>
        )
    }

    const Controls: Controls<T> = {
        Identities: IdentitiesControl,
        List: ListControl
    }

    FederatedIdentity.Provider = Provider
    FederatedIdentity.IdentityView = IdentityView
    FederatedIdentity.Controls = Controls

    const useHandleSignInWithRedirect = () => {
      // Implement the custom hook logic here
    };

    return {FederatedIdentity}
}

