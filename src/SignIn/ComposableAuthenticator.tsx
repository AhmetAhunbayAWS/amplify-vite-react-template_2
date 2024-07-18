import { useTheme, Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { View, Heading, Button } from "@aws-amplify/ui-react";
import { FederatedSignIn } from "./FederatedSignIn";
import { SupportedProviders } from "../CustomProviderFiles/CustomProvider";
//import { Scope } from "aws-cdk-lib/aws-ecs";
import React from "react";
import { MySignIn } from "./mySignIn";


const components = {
    SignIn: {
        Header() {
          const { tokens } = useTheme();
    
          return (
              <div>
                  <Heading
                  padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                  paddingBottom={10}
                  level={3}
                  >
                  Sign In
                  </Heading>
                  <FederatedSignIn socialProviders={[SupportedProviders.Amazon, SupportedProviders.Apple, SupportedProviders.Google, SupportedProviders.Facebook]}/>
              </div>
          );
        },
        Footer() {
          const { toSignIn } = useAuthenticator();
    
          return (
            <View textAlign="center">
              <Button
                fontWeight="normal"
                onClick={toSignIn}
                size="small"
                variation="link"
              >
                Back to Sign In
              </Button>
            </View>
          );
        },
      },
  };
  
  export default function ComposableAuthenticator() {

    return (
      <Authenticator components={components} >
        {({ signOut }) => <button onClick={signOut}>Sign out</button>}
      </Authenticator>
    );
  }
