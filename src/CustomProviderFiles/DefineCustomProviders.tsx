import CustomProviderList from "./CustomProvider"
import myIconSrc from '../assets/oktaClient.svg';

export const CustomProvidersDefinition : CustomProviderList = [
    {  
        providerName: "OktaClient",
        displayName: "Okta",
        icon: <img src={myIconSrc} alt="My Icon" className="amplify-icon federated-sign-in-icon"/>
    },
]
