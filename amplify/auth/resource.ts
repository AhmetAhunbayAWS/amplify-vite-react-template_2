import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: "OktaClient",
          clientId: secret('OKTA_CLIENT_ID'),
          clientSecret: secret('OKTA_CLIENT_SECRET'),
          issuerUrl: 'https://dev-z0pet31ai0jjaayy.us.auth0.com',
          scopes: ['openid','email']
        }
      ],
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'), 
        scopes: ['email'],
      },
      callbackUrls: ['http://localhost:5173/profile', 'https://main.d21e0xd5en76i9.amplifyapp.com/profile'],
      logoutUrls:['http://localhost:5173/', 'https://main.d21e0xd5en76i9.amplifyapp.com']
    }
  },
});
