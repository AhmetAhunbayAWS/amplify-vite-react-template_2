import { signInWithRedirect } from "aws-amplify/auth";
import useDataState from "./UseDataState";

//import { AuthProviders } from "aws-amplify/datastore";
type AuthProvider = 'Amazon' | 'Apple' | 'Facebook' | 'Google';
type SignInWithRedirectOutput = Awaited<ReturnType<typeof signInWithRedirect>>;

interface useHandleSigninWithRedirectInput{
    provider: string | AuthProvider
    customState?: string
}

interface handleSignInWithRedirectInput<T extends string = string>{
  provider: T
  customState?: string
  //TODO: flesh out solution for error handler
  errorHandler: (error: Error) => string
}

async function _signInWithRedirectAction(
  _: SignInWithRedirectOutput,
  input: useHandleSigninWithRedirectInput
): Promise<SignInWithRedirectOutput> {
    const provider = input.provider

  const result = await signInWithRedirect({
        provider: (typeof provider === 'string') ? {custom: provider} : provider, 
        customState: input.customState
    });
  return result;
}

export const useHandleSigninWithRedirect = () =>
    useDataState(_signInWithRedirectAction, undefined)

export default useHandleSigninWithRedirect