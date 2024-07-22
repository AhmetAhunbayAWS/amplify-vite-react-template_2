import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { View, Heading, Button } from "@aws-amplify/ui-react";
import { FederatedSignIn } from "./FederatedSignIn";
import { SupportedProviders } from "../CustomProviderFiles/CustomProvider";
import Todo from "../Todo";
//import { Scope } from "aws-cdk-lib/aws-ecs";
import React from "react";
import { MySignIn } from "./mySignIn";
import { Amplify } from "aws-amplify";
import {
  ThemeProvider,
  Theme,
  useTheme,
} from '@aws-amplify/ui-react';

const components = {
    SignIn: {
        Header() {
          const { tokens } = useTheme();
    
          return (
              <div >
                  <Heading
                  padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                  paddingBottom={10}
                  level={3}
                  >
                  Sign in to your account
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

  const { tokens } = useTheme();
  const theme: Theme = {
    name: 'Auth Example Theme',
    tokens: {
      components: {
        authenticator: {
          router: {
            boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
            borderWidth: '0',
          },
          form: {
            padding: `0 ${tokens.space.xl} ${tokens.space.medium}`,            
          },
        },
      },
    },
  };
  console.log(Amplify.getConfig().Auth?.Cognito.loginWith?.oauth?.providers)
// .Auth?.Cognito.loginWith?.oauth?.providers
  return (
    <ThemeProvider theme={theme}>
      <View padding="xxl">
        <Authenticator components={components} socialProviders={[]}>
          <Todo/>
        </Authenticator>
      </View>
    </ThemeProvider>
  );
}


