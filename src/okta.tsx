import { signInWithRedirect } from "aws-amplify/auth"

const OktaSignIn = () => {
    const signIn = () => {
        signInWithRedirect({provider: {
            custom: "OktaClient"
          }})
    }

    return <button onClick={signIn}>okta signIn</button>
}

export default OktaSignIn;
