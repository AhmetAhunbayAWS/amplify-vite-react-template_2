import { Authenticator } from '@aws-amplify/ui-react'
import useIsSignedIn from './CustomHook'
import Todo from './Todo'
import '@aws-amplify/ui-react/styles.css'
function App() {

  console.log("calling useIsSignedIn")
  const signed = useIsSignedIn();
  console.log(signed)
  return signed ? <Todo/> : <Authenticator/>

}
export default App;