
//import { Authenticator } from '@aws-amplify/ui-react'

//import { FederatedSignIn } from './SignIn/FederatedSignIn'
import useIsSignedIn from './hooks/UseIsSignedIn'
import Todo from './Todo'
import '@aws-amplify/ui-react/styles.css'

//import { IdentityProviders } from './IdentityProviders/IdentityProviders'
import myIconSrc from './assets/oktaClient.svg';
// import { IdentityProvidersButtonGroup } from './IdentityProviders/elements/IdentityProvidersButtonGroup'
// import { IdentityProvidersButton } from './IdentityProviders/elements/IdentityProvidersButton'
//import { FederatedSignIn } from './SignIn/FederatedSignIn'
import { createFederatedIdentity } from './IdentityProviders/FederatedIdentity';
import ComposableAuthenticator from './SignIn/ComposableAuthenticator';

/*providers: ['google', 
{providerName: "OktaClient", displayName: "Okta", icon: <img src={myIconSrc} alt="My Icon" className="amplify-icon federated-sign-in-icon"/>
*/

// function App() {

//   console.log("calling useIsSignedIn")
//   const signed = useIsSignedIn();
//   const {FederatedIdentity} = createFederatedIdentity(
//     {providers: ['google', 
//       {providerName: "OktaClient", displayName: "Okta", icon: <img src={myIconSrc} alt="My Icon" className="amplify-icon federated-sign-in-icon"/>}
//     ]});

//   return signed ? <Todo/> : 
//   <div>
//     <FederatedIdentity.Provider>
//       <FederatedIdentity.List>
//         <FederatedIdentity.Buttons.Button provider='Google'/>
//       </FederatedIdentity.List>
//     </FederatedIdentity.Provider>
//   </div>

// }

function App() {
  return(
    <ComposableAuthenticator/>
  )



}
export default App;
