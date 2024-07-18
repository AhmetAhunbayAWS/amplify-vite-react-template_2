import { View } from "@aws-amplify/ui-react";
import { FederatedSignIn } from "./FederatedSignIn";
import { SupportedProviders } from "../CustomProviderFiles/CustomProvider";

const mySocialProviders : SupportedProviders[] = ['amazon', 'google']

export function BadIdentityProviders(): JSX.Element {
  
    return (
      <View>
        <form
            data-amplify-form=""
            data-amplify-authenticator-signin=""
            method="post"
        >
            <FederatedSignIn socialProviders={mySocialProviders}/>
        </form>
      </View>
    );
  }