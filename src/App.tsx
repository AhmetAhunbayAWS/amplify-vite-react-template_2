
import { Authenticator } from '@aws-amplify/ui-react'
import useIsSignedIn from './CustomHook'
import Todo from './Todo'
import '@aws-amplify/ui-react/styles.css'
import OktaSignIn from './okta'

function App() {

  console.log("calling useIsSignedIn")
  const signed = useIsSignedIn();
  console.log(signed)
  const auth = <Authenticator/>
  console.log(auth)

  return signed ? <Todo/> : 
  <div>
    {auth}
    <OktaSignIn/>
  </div>

}
export default App;
