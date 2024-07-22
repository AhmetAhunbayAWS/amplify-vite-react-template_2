import { ProviderData } from "../FederatedIdentity/types";
//import { ResourcesConfig } from "aws-amplify";
import { Amplify } from "aws-amplify";

export interface OAuthConfig {
    domain: string;
    scopes: OAuthScope[];
    redirectSignIn: string[];
    redirectSignOut: string[];
    responseType: 'code' | 'token';
    providers?: (OAuthProvider | CustomProvider)[];
}
type CustomScope = string & NonNullable<unknown>;
export type OAuthProvider = 'Google' | 'Facebook' | 'Amazon' | 'Apple';
interface CustomProvider {
    custom: string;
}
export type OAuthScope = 'email' | 'openid' | 'phone' | 'email' | 'profile' | 'aws.cognito.signin.user.admin' | CustomScope;

type AuthField = "Auth"

type loginField = "loginWith"

interface AuthConfig {
    Cognito?: Record<loginField, OAuthConfig | undefined>
}

const conf = Amplify.getConfig()

function getAuthConfig(
    config: Record<AuthField, AuthConfig | undefined>, 
    customProviders?: ProviderData
) : ProviderData[] {
    return []
}  

getAuthConfig(conf)