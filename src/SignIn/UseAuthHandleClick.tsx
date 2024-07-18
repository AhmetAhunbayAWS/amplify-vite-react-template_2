import { useAuthenticator } from "@aws-amplify/ui-react";
import { FederatedIdentityProviders } from '@aws-amplify/ui';


const UseAuthHandleClick = (provider: FederatedIdentityProviders) => {
    const { toFederatedSignIn } = useAuthenticator();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        toFederatedSignIn({ provider });
    };

    return { handleClick };
}

export default UseAuthHandleClick