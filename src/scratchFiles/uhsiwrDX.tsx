import { createFederatedIdentity } from "./compositionScratch";

const {} = createFederatedIdentity({providers})


const OktaButton = () => {
    const [state, handler] = useHandleSigninWithRedirect();
  
    return state.message ? (
      <p>{state.message}</p>
    ) : (
      <button
        disabled={state.isLoading}
        onClick={() => {
          handler({ provider: 'Facebook' });
        }}
      />
    );
  };