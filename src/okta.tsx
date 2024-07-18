//import { signInWithRedirect } from "aws-amplify/auth"

import useHandleSigninWithRedirect from "./hooks/UseHandleSignInWithRedirect";
//import { useHandleSigninWithRedirectTest } from "./hooks/UseHandleSignInWithRedirect";


const OktaSignIn = () => {
    //const [testState, testHandler] = useHandleSigninWithRedirectTest();
    const [state, handler] = useHandleSigninWithRedirect();
    
    return state.message ? (
        <p>{state.message}</p>
    ) : (
        <button
        disabled={state.isLoading}
        onClick={() => {
            handler({ provider: 'OktaClient'});
        }}
        > Okta sign in</button>
    
    
  );
    // const signIn = () => {
    //     signInWithRedirect({provider: {
    //         custom: "OktaClient"
    //       }})
    // }

    // return <button onClick={signIn}>okta signIn</button>
}

export default OktaSignIn;
