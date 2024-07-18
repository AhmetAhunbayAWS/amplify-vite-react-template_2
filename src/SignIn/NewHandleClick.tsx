import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { signInWithRedirect } from "aws-amplify/auth"

const NewHandleClick = (provider: FederatedIdentityProviders | string) => {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        //checks whether provider is in FederatedIdentityProviders
        if (Object.values(FederatedIdentityProviders).includes(provider as FederatedIdentityProviders)){
            signInWithRedirect({provider: provider as FederatedIdentityProviders})
        } else {
            signInWithRedirect({provider: {
                custom: provider
            }})
        }  
    };

    return handleClick ;
}

export default NewHandleClick